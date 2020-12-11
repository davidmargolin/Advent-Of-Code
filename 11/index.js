import fs from "fs";

// parse input

const text = fs.readFileSync("./11/input.txt", { encoding: "utf-8" });
const textByLine = text.split("\n").map(row => row.split(""));

// Part 1

console.log("Part 1:");

const DIRECTION_DELTAS = [[-1, -1], [-1, 0], [0, -1], [1, -1], [-1, 1], [1, 0], [0, 1], [1, 1]];

const isTaken = (grid, row, col) => {
    if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
        return grid[row][col] === "#";
    }
    return false;
}

const getSeatStatus = (grid, row, col) => {
    if (grid[row][col] === ".") return ".";
    const count = DIRECTION_DELTAS.reduce((total, curr) => {
        if (isTaken(grid, row + curr[0], col + curr[1])) {
            total += 1;
        }
        return total;
    }, 0)
    if (grid[row][col] === "L" && count > 0) {
        return "L";
    }
    if (grid[row][col] === "#" && count > 3) {
        return "L";
    }
    return "#";
}

let changeDetected = true;
let currGrid = textByLine;
while (changeDetected) {
    changeDetected = false;
    const copy = [];
    for (let rowIndex = 0; rowIndex < textByLine.length; rowIndex++) {
        copy.push([]);
        for (let columnIndex = 0; columnIndex < textByLine[0].length; columnIndex++) {
            const newSeatStatus = getSeatStatus(currGrid, rowIndex, columnIndex);
            copy[rowIndex].push(newSeatStatus);
            if (currGrid[rowIndex][columnIndex] != newSeatStatus) {
                changeDetected = true;
            }
        }
    }
    currGrid = copy;
}

console.log(currGrid.reduce((total, curr) => {
    return total + curr.filter(item => item == "#").length;
}, 0))

// Part 2

console.log("Part 2:");

const isTakenPart2 = (grid, row, col, rowDelta, colDelta) => {
    const newRow = row + rowDelta;
    const newCol = col + colDelta;
    if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
        if (grid[newRow][newCol] === ".") {
            return isTakenPart2(grid, newRow, newCol, rowDelta, colDelta);
        }
        return grid[newRow][newCol] === "#";
    }
    return false;
}

const getSeatStatusPart2 = (grid, row, col) => {
    if (grid[row][col] === ".") return ".";
    const count = DIRECTION_DELTAS.reduce((total, curr) => {
        if (isTakenPart2(grid, row, col, curr[0], curr[1])) {
            total += 1;
        }
        return total;
    }, 0)
    if (grid[row][col] === "L" && count > 0) {
        return "L";
    }
    if (grid[row][col] === "#" && count > 4) {
        return "L";
    }
    return "#";
}


changeDetected = true;
currGrid = textByLine;
while (changeDetected) {
    changeDetected = false;
    const copy = [];
    for (let rowIndex = 0; rowIndex < textByLine.length; rowIndex++) {
        copy.push([]);
        for (let columnIndex = 0; columnIndex < textByLine[0].length; columnIndex++) {
            const newSeatStatus = getSeatStatusPart2(currGrid, rowIndex, columnIndex);
            copy[rowIndex].push(newSeatStatus);
            if (currGrid[rowIndex][columnIndex] != newSeatStatus) {
                changeDetected = true;
            }
        }
    }
    currGrid = copy;
}



console.log(currGrid.reduce((total, curr) => {
    return total + curr.filter(item => item == "#").length;
}, 0))