import fs from "fs";

// parse input

const text = fs.readFileSync("./7/input.txt", { encoding: "utf-8" });

// Part 1

console.log("Part 1:");

const positions = text.split(",").map(t => parseInt(t));

const min = Math.min(...positions);
const max = Math.max(...positions);

const options = [];
for (let i = min; i <= max; i++) {
    options.push(positions.reduce((acc, curr) => acc + Math.abs(curr-i), 0));
}

console.log(Math.min(...options));

// Part 2

console.log("Part 2:");

function cost(steps) {
    if (steps === 0) return 0;
    return cost(steps - 1) + steps;
}

const p2Options = [];
for (let i = min; i <= max; i++) {
    p2Options.push(positions.reduce((acc, curr) => acc + cost(Math.abs(curr-i)), 0));
}

console.log(Math.min(...p2Options));