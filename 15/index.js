import fs from "fs";
import path from "path";

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

console.log("Part 1:");

const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const grid = textByLine.map(line => line.split("").map(i => parseInt(i)));

const memo = { "0,0": 0 };

function calcRisk() {
    let unknownQueue = [[0, 0]]

    while (unknownQueue.length > 0) {
        unknownQueue = unknownQueue.sort(([aX, aY], [bX, bY]) => {
            return memo[`${bX},${bY}`] - memo[`${aX},${aY}`];
        })
        const [x, y] = unknownQueue.pop();
        directions.map(([xDelta, yDelta]) => {
            const newY = x + yDelta;
            const newX = y + xDelta;
            return [newX, newY]
        }).filter(([newX, newY]) => {
            return (newY >= 0 && newY < grid.length && newX >= 0 && newX < grid[0].length)
        }).sort(([aX, aY], [bX, bY]) => {
            return grid[aY][aX] - grid[bY][bX]
        }).forEach(([newX, newY]) => {
            if (x<=2 && y<=2) console.log(`${x},${y}`, memo[`${x},${y}`] ,`${newX},${newY}`, grid[newY][newX])
            if (!(`${newX},${newY}` in memo)) {
                memo[`${newX},${newY}`] = memo[`${x},${y}`] + grid[newY][newX];
                unknownQueue.push([newX, newY]);
            }
            if (memo[`${newX},${newY}`] > memo[`${x},${y}`] + grid[newY][newX]) {
                memo[`${newX},${newY}`] = memo[`${x},${y}`] + grid[newY][newX];
            }
            if (x<=2 && y<=2) console.log(memo)
        })
    }

    return memo[`${grid.length - 1},${grid[0].length - 1}`];
}

console.log(calcRisk());


// Part 2

console.log("Part 2:");

