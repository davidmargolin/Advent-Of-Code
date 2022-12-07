import fs from 'fs'
import path from 'path'

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: 'utf-8' })
const textByLine = text.split('\n')

// Part 1

console.log('Part 1:')

class File {
  name: string
  size: number
  constructor (name: string, size: number) {
    this.name = name
    this.size = size
  }
}

class Directory {
  name: string
  parent: Directory | undefined
  children: Directory[] = []
  files: File[] = []
  size: number = 0

  constructor (name: string, parent?: Directory) {
    this.name = name
    this.parent = parent
  }

  addFile (file: File): void {
    this.files.push(file)
    this.addSize(file.size)
  }

  addChild (child: Directory): void {
    this.children.push(child)
  }

  visitChild (name: string): Directory | undefined {
    return this.children.find(child => child.name === name)
  }

  addSize (size: number): void {
    this.size += size
    if (this.parent != null) this.parent.addSize(size)
  }
}

function generateDirectory (instructions: string[]): Directory {
  const root = new Directory('/')
  let currentDir: Directory
  instructions.forEach((line) => {
    if (line.startsWith('$ cd ')) {
      const newDir = line.slice(5)
      switch (newDir) {
        case '/':
          currentDir = root
          return
        case '..':
          currentDir = currentDir.parent!
          return
        default:
          currentDir = currentDir.visitChild(newDir)!
          return
      }
    }
    if (line === '$ ls') {
      return
    }
    if (line.startsWith('dir ')) {
      const name = line.slice(4)
      const newDir = new Directory(name, currentDir)
      currentDir.addChild(newDir)
      return
    }
    const [size, name] = line.split(' ')
    const newFile = new File(name, Number(size))
    currentDir.addFile(newFile)
  })
  return root
}

function sumDirsSmallerThanSize (node: Directory, size: number): number {
  const sumSmallChildDirs = node.children.reduce((total, dir) => {
    return total + sumDirsSmallerThanSize(dir, size)
  }, 0)
  if (node.size <= size) {
    return sumSmallChildDirs + node.size
  }
  return sumSmallChildDirs
}

const root = generateDirectory(textByLine)

console.log(sumDirsSmallerThanSize(root, 100000))

// Part 2

console.log('Part 2:')

function minDeletableDir (node: Directory, deleteSize: number): number {
  if (node.size < deleteSize) {
    return Infinity
  }
  const childMins = node.children.map(child => minDeletableDir(child, deleteSize))
  return Math.min(node.size, ...childMins)
}

console.log(minDeletableDir(root, 30000000 - (70000000 - root.size)))
