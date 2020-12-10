import fs from "fs";

// parse input

const text = fs.readFileSync("./10/input.txt", { encoding: "utf-8" });
const textByLine = text.split("\n").map(line => parseInt(line));

// Part 1

console.log("Part 1:");

let singleJolts = 0;
let tripleJolts = 0;
const sorted = textByLine.sort((a, b) => a - b);
for (let i = 1; i < sorted.length; i++) {
    const diffFromNext = sorted[i] - sorted[i - 1];
    if (diffFromNext === 1) {
        singleJolts++;
    } else if (diffFromNext === 3) {
        tripleJolts++;
    }
}

console.log((singleJolts + 1) * (tripleJolts + 1));

// Part 2

console.log("Part 2:");

const cache = {
    [sorted[sorted.length - 1]]: 1,
}
const howManyWaysToArrange = (currNum, list) => {
    if (currNum in cache) {
        return cache[currNum];
    }
    const options = list.filter(item => (item > currNum) && (item <= currNum + 3));
    const count = options.reduce((total, curr) => total + howManyWaysToArrange(curr, list), 0);
    cache[currNum] = count;
    return count;
}

console.log(howManyWaysToArrange(0, [0, ...sorted]))