import fs from 'fs'
import path from 'path'

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: 'utf-8' })
const textByLine = text.split('\n')

// Part 1

console.log('Part 1:')

const sections = textByLine.map(line => {
  const [a, b] = line.split(',').map(section => {
    const [start, end] = section.split('-').map(Number)
    return { start, end }
  })
  return { a, b }
})

function sectionsAreOverlapping (A, B) {
  if (A.start <= B.start && A.end >= B.end) {
    return true
  }
  if (B.start <= A.start && B.end >= A.end) {
    return true
  }
  return false
}

const overlapCount = sections.reduce((prev, curr) => {
  if (sectionsAreOverlapping(curr.a, curr.b)) {
    prev++
  }
  return prev
}, 0)

console.log(overlapCount)

// Part 2

console.log('Part 2:')

function sectionsAreIntersecting (A, B) {
  if (A.start >= B.start && A.start <= B.end) {
    return true
  }
  if (B.start >= A.start && B.start <= A.end) {
    return true
  }
  return false
}

const intersectCount = sections.reduce((prev, curr) => {
  if (sectionsAreIntersecting(curr.a, curr.b)) {
    prev++
  }
  return prev
}, 0)

console.log(intersectCount)
