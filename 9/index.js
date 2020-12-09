import fs from "fs";

// parse input

const text = fs.readFileSync("./9/input.txt", { encoding: "utf-8" });
const textByLine = text.split("\n").map(line => parseInt(line));

// Part 1

console.log("Part 1:");

const notSumOfPrevious = textByLine.slice(25).find((line, index) => {
    const subList = new Set(textByLine.slice(index, index + 25));
    return ![...subList].some(number => subList.has(line - number) && line - number != number);
})

console.log(notSumOfPrevious);

// Part 2

console.log("Part 2:");

let total = 0;
let leftIndex = 0;
let rightIndex = 0;
while (total != notSumOfPrevious) {
    if (total > notSumOfPrevious) {
        total -= textByLine[leftIndex];
        leftIndex++;
    } else {
        total += textByLine[rightIndex];
        rightIndex++;
    }
}

const winningSlice = textByLine.slice(leftIndex, rightIndex);
console.log(Math.max(...winningSlice) + Math.min(...winningSlice));