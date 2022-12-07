import fs from 'fs'
import path from 'path'

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: 'utf-8' })

// Part 1

console.log('Part 1:')

const [stackText, instructionsText] = text.split('\n\n')

interface Instruction {
  move: number
  from: string
  to: string
}

const instructions: Instruction[] = instructionsText.split('\n').map(line => {
  const segments = line.split(' ')
  return {
    move: Number(segments[1]),
    from: segments[3],
    to: segments[5]
  }
})

// Cue parsing of the crate stack. Be warned: This is a mess.

// Rotate the text 90 degrees.
const stackRows = stackText.split('\n').reverse()
const rotatedStackRows = [...new Array(stackRows[0].length)].map((_, rowIndex) => {
  return [...new Array(stackRows.length)].map((_, colIndex) => stackRows[colIndex][rowIndex])
})

// Filter out rows that don't start with an integer. Trim empty fields.
const stackRowsCleaned = rotatedStackRows.filter(row => Number(row[0]) !== 0).map(row => row.join('').trim().split(''))

interface StackIndex { [key: string]: string[] }

// Generate a crate stack index.
const stack = stackRowsCleaned.reduce<StackIndex>((index, curr) => {
  const [key, ...value] = curr
  index[key] = value
  return index
}, {})

function textTopOfStack (stack: StackIndex): string {
  return Object.values(stack).reduce((out, curr) => out + curr[curr.length - 1], '')
}

function executeCrateMover (stack: StackIndex, instructions: Instruction[]): string {
  const stackCopy = JSON.parse(JSON.stringify(stack))
  instructions.forEach(({ move, from, to }) => {
    let moveCount = move
    while (moveCount > 0) {
      stackCopy[to].push(stackCopy[from].pop())
      moveCount--
    }
  })
  return textTopOfStack(stackCopy)
}

console.log(executeCrateMover(stack, instructions))

// Part 2

console.log('Part 2:')

function executeCrateMover9001 (stack: StackIndex, instructions: Instruction[]): string {
  const stackCopy = JSON.parse(JSON.stringify(stack))
  instructions.forEach(({ move, from, to }) => {
    stackCopy[to].push(...stackCopy[from].splice(stackCopy[from].length - move, move))
  })
  return textTopOfStack(stackCopy)
}

console.log(executeCrateMover9001(stack, instructions))
