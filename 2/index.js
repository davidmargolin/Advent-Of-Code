import fs from 'fs'
import path from 'path'

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: 'utf-8' })
const textByLine = text.split('\n')

// Part 1

console.log('Part 1:')

const playMap = {
  X: 'A',
  Y: 'B',
  Z: 'C'
}

const plays = textByLine.map(text => {
  const [opponent, me] = text.split(' ')
  return { opponent, me: playMap[me] }
})

const winMap = {
  A: 'B',
  B: 'C',
  C: 'A'
}

const pointsMap = {
  A: 1,
  B: 2,
  C: 3
}

function calcScore (plays) {
  return plays.reduce((prev, { opponent, me }) => {
    if (opponent === me) {
      return prev + pointsMap[me] + 3
    }
    if (winMap[opponent] === me) {
      return prev + pointsMap[me] + 6
    }
    return prev + pointsMap[me]
  }, 0)
}

console.log(calcScore(plays))

// Part 2

console.log('Part 2:')

const loseMap = {
  B: 'A',
  C: 'B',
  A: 'C'
}

const playsWithExpectation = textByLine.map(text => {
  const [opponent, expectation] = text.split(' ')
  switch (expectation) {
    case 'X':
      return { opponent, me: loseMap[opponent] }
    case 'Y':
      return { opponent, me: opponent }
    case 'Z':
    default:
      return { opponent, me: winMap[opponent] }
  }
})

console.log(calcScore(playsWithExpectation))
