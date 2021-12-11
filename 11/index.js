import fs from "fs";

// parse input

const text = fs.readFileSync("./11/input.txt", { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

console.log("Part 1:");

const grid = textByLine.map(line => line.split("").map(c => parseInt(c)));

const directions = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];

function flash(x, y) {
    grid[y][x] = 0;
    directions.forEach(([xDelta, yDelta]) => {
        const newY = y + yDelta;
        const newX = x + xDelta;
        if (newY >= 0 && newY < grid.length && newX >= 0 && newX < grid[0].length) {
            if (grid[newY][newX] !== 0) {
                grid[newY][newX]++;
            }
        }
    });
}

function step() {
    let stepFlashes = 0;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            grid[y][x]++;
        }
    }

    while (true) {
        let newFlashes = 0;
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[0].length; x++) {
                if (grid[y][x] > 9) {
                    stepFlashes++;
                    newFlashes++;
                    flash(x, y);
                }
            }
        }
        if (newFlashes === 0) {
            break;
        }
    }

    return stepFlashes;
}

let total = 0;
for (let i = 0; i < 100; i++) {
    total += step();
}

console.log(total);

// Part 2

console.log("Part 2:");

let stepCount = 101;
while (step() !== grid.length * grid[0].length) {
    stepCount++;
}

console.log(stepCount);
