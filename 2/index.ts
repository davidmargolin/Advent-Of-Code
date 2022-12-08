import fs from 'fs'
import path from 'path'

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: 'utf-8' })
const textByLine = text.split('\n')

// Part 1

console.log('Part 1:')

type Hand = 'Rock' | 'Paper' | 'Scissors'

const handMap: { [key: string]: Hand } = {
  X: 'Rock',
  Y: 'Paper',
  Z: 'Scissors',
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors'
}

interface Play {
  opponent: Hand
  me: Hand
}

const plays: Play[] = textByLine.map(text => {
  const [opponent, me] = text.split(' ')
  return { opponent: handMap[opponent], me: handMap[me] }
})

const gameMap: { [key in Hand]: { beatBy: Hand, beats: Hand, points: number } } = {
  Rock: { beatBy: 'Paper', beats: 'Scissors', points: 1 },
  Paper: { beatBy: 'Scissors', beats: 'Rock', points: 2 },
  Scissors: { beatBy: 'Rock', beats: 'Paper', points: 3 }
}

function calcScore (plays: Play[]): number {
  return plays.reduce((prev, { opponent, me }) => {
    // Tie
    if (opponent === me) {
      return prev + gameMap[me].points + 3
    }
    // Win
    if (gameMap[opponent].beatBy === me) {
      return prev + gameMap[me].points + 6
    }
    // Lose
    return prev + gameMap[me].points
  }, 0)
}

console.log(calcScore(plays))

// Part 2

console.log('Part 2:')

const playsWithExpectation = textByLine.map(text => {
  const [opponent, expectation] = text.split(' ') as [Hand, string]
  const opponentHand = handMap[opponent]
  switch (expectation) {
    case 'X':
      // Win
      return { opponent: opponentHand, me: gameMap[opponentHand].beats }
    case 'Y':
      // Tie
      return { opponent: opponentHand, me: opponentHand }
    case 'Z':
    default:
      // Lose
      return { opponent: opponentHand, me: gameMap[opponentHand].beatBy }
  }
})

console.log(calcScore(playsWithExpectation))
