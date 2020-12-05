import fs from "fs";

// parse input

const text = fs.readFileSync("./5/input.txt", { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

console.log("Part 1:");

const getRow = (input, min, max) => {
    if (min === max) return min;
    // lower half
    const letter = input.shift();
    if (letter === "F") {
        return getRow(input, min, min + Math.floor((max - min) / 2));
    }
    // upper half
    if (letter === "B") {
        return getRow(input, min + Math.ceil((max - min) / 2), max);
    }
}

const getColumn = (input, min, max) => {
    if (min === max) return min;
    // lower half
    const letter = input.shift();
    if (letter === "L") {
        return getColumn(input, min, min + Math.floor((max - min) / 2));
    }
    // upper half
    if (letter === "R") {
        return getColumn(input, min + Math.ceil((max - min) / 2), max);
    }
}

const allIds = textByLine.map(line => {
    const row = getRow(line.split("").slice(0, 7), 0, 127);
    const column = getColumn(line.split("").slice(-3), 0, 7);
    return row * 8 + column;
})

console.log(Math.max(...allIds));


// Part 2

console.log("Part 2:");

console.log(allIds.find(id => !allIds.includes(id - 1) && allIds.includes(id - 2)) - 1);
