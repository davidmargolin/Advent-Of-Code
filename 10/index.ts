import fs from 'fs'
import path from 'path'

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: 'utf-8' })
const textByLine = text.split('\n')

// Part 1

console.log('Part 1:')

interface Instruction {
  instructionType: 'addx' | 'noop'
  amount?: number
}

const instructions = textByLine.map<Instruction>(line => {
  const [instructionType, amount] = line.split(' ') as [Instruction['instructionType'], string?]
  if (instructionType === 'addx') {
    return { instructionType, amount: Number(amount) }
  }
  return { instructionType }
})

class Computer {
  cycle: number = 0
  registerValue: number = 1
  total: number = 0
  pixels: Array<Array<'█' | '.'>> = []

  incrementCycle (): void {
    this.cycle++
    if ((this.cycle + 20) % 40 === 0) {
      this.total += this.registerValue * this.cycle
    }
    this.drawPixel()
  }

  addValue (val: number): void {
    this.registerValue += val
  }

  getTotal (): number {
    return this.total
  }

  drawPixel (): void {
    const row = Math.floor(this.cycle / 40)
    if (this.pixels.length <= row) {
      this.pixels.push([])
    }
    const currentPixelIndex = this.pixels[row].length - 1
    if (currentPixelIndex <= this.registerValue + 1 && currentPixelIndex >= this.registerValue - 1) {
      this.pixels[row].push('█')
      return
    }
    this.pixels[row].push('.')
  }

  getPixels (): Array<Array<'█' | '.'>> {
    return this.pixels
  }
}

const computer = new Computer()
instructions.forEach(({ instructionType, amount }) => {
  switch (instructionType) {
    case 'addx':
      computer.incrementCycle()
      computer.incrementCycle()
      computer.addValue(amount as number)
      break
    case 'noop':
      computer.incrementCycle()
      break
  }
})

console.log(computer.getTotal())

// Part 2

console.log('Part 2:')

console.log(computer.getPixels().map(pixelRow => pixelRow.join('')).join('\n'))
