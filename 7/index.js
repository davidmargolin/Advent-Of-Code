import fs from "fs";

// parse input

const text = fs.readFileSync("./7/input.txt", { encoding: "utf-8" });

// Part 1

console.log("Part 1:");

const positions = text.split(",").map(t => parseInt(t));

const min = Math.min(...positions);
const max = Math.max(...positions);

let minCost = Infinity;
for (let i = min; i <= max; i++) {
    const fuel = positions.reduce((acc, curr) => acc + Math.abs(curr - i), 0);
    minCost = Math.min(minCost, fuel);
}

console.log(minCost);

// Part 2

console.log("Part 2:");

const costCache = {};

function cost(steps) {
    if (steps === 0) return 0;
    if (steps in costCache) return costCache[steps];
    const res = cost(steps - 1) + steps;
    costCache[steps] = res;
    return res;
}

minCost = Infinity;
for (let i = min; i <= max; i++) {
    const fuel = positions.reduce((acc, curr) => acc + cost(Math.abs(curr - i)), 0);
    minCost = Math.min(minCost, fuel);
}

console.log(minCost);