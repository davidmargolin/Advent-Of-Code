import fs from 'fs'
import path from 'path'

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: 'utf-8' })

// Part 1

console.log('Part 1:')

const markerIndex = text.split('').findIndex((_, index, letters) => {
  if (index < 3) {
    return false
  }
  return new Set(letters.slice(index - 3, index + 1)).size === 4
})

console.log(markerIndex + 1)

// Part 2

console.log('Part 2:')

const messageIndex = text.split('').findIndex((_, index, letters) => {
  if (index < 13) {
    return false
  }
  return new Set(letters.slice(index - 13, index + 1)).size === 14
})

console.log(messageIndex + 1)
