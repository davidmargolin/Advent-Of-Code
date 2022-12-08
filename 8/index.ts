import fs from 'fs'
import path from 'path'

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: 'utf-8' })
const textByLine = text.split('\n')

// Part 1

console.log('Part 1:')

interface Direction { x: number, y: number }
const directions: Direction[] = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }]

const treesGrid = textByLine.map(treeRow => treeRow.split('').map(Number))

function treeIsVisibleFromDirection (treesGrid: number[][], treeX: number, treeY: number, dir: Direction): boolean {
  const treeSize = treesGrid[treeY][treeX]
  let [currentX, currentY] = [treeX + dir.x, treeY + dir.y]
  while ((currentY <= treesGrid.length - 1) && (currentX <= treesGrid[0].length - 1) && (currentX >= 0) && (currentY >= 0)) {
    if (treeSize <= treesGrid[currentY][currentX]) return false
    currentX += dir.x
    currentY += dir.y
  }
  return true
}

let total = 0
for (let y = 0; y < treesGrid.length; y++) {
  for (let x = 0; x < treesGrid[0].length; x++) {
    if (directions.some(direction => treeIsVisibleFromDirection(treesGrid, x, y, direction))) {
      total += 1
    }
  }
}

console.log(total)

// Part 2

console.log('Part 2:')

function treeScore (treesGrid: number[][], treeX: number, treeY: number, dir: Direction): number {
  const treeSize = treesGrid[treeY][treeX]
  let [currentX, currentY] = [treeX + dir.x, treeY + dir.y]
  let count = 0
  while ((currentY <= treesGrid.length - 1) && (currentX <= treesGrid[0].length - 1) && (currentX >= 0) && (currentY >= 0)) {
    if (treeSize <= treesGrid[currentY][currentX]) return count + 1
    currentX += dir.x
    currentY += dir.y
    count++
  }
  return count
}

const scenicScores = JSON.parse(JSON.stringify(treesGrid))
for (let y = 0; y < treesGrid.length; y++) {
  for (let x = 0; x < treesGrid[0].length; x++) {
    scenicScores[y][x] = directions.reduce((total, dir) => total * treeScore(treesGrid, x, y, dir), 1)
  }
}

console.log(Math.max(...scenicScores.flat()))
