import fs from "fs";

// parse input

const text = fs.readFileSync("./9/input.txt", { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

console.log("Part 1:");

const grid = textByLine.map(line => line.split("").map(n => parseInt(n)));

const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

function isLowPoint(x, y) {
    const current = grid[y][x];
    const neighbors = directions.map(([xDelta, yDelta]) => {
        const newY = y + yDelta;
        const newX = x + xDelta;
        if (newY >= 0 && newY < grid.length && newX >= 0 && newX < grid[0].length) {
            return grid[newY][newX];
        }
        return Infinity;
    });
    return current < Math.min(...neighbors);
}

let count = 0;
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
        if (isLowPoint(x, y)) count += grid[y][x] + 1;
    }
}

console.log(count);

// Part 2

console.log("Part 2:");

function closeNearestBasins(x, y) {
    if (grid[y][x] == 9) return 0;
    grid[y][x] = 9;
    const nearbyBasinSizes = directions.map(([xDelta, yDelta]) => {
        const newY = y + yDelta;
        const newX = x + xDelta;
        if (newY >= 0 && newY < grid.length && newX >= 0 && newX < grid[0].length) {
            return closeNearestBasins(newX, newY);
        }
        return 0;
    }).reduce((a, b) => a + b);
    return 1 + nearbyBasinSizes;
}

let sizes = [];
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
        const size = closeNearestBasins(x, y);
        if (sizes.length < 3 || size > sizes[2]) {
            sizes.push(size);
            sizes = sizes.sort((a, b) => b - a).slice(0, 3);
        }
    }
}

console.log(sizes.reduce((a, b) => a * b));