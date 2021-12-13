import fs from "fs";
import path from "path";

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

console.log("Part 1:");

const pointsMap = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
};

const pairs = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">",
};

let points = 0;
textByLine.forEach(line => {
    const stack = [];
    for (const char of line.split("")) {
        if (Object.keys(pairs).includes(char)) {
            stack.push(char);
        } else if (pairs[stack.pop()] != char) {
            points += pointsMap[char];
            break;
        }
    }
});

console.log(points);

// Part 2

console.log("Part 2:");

const scores = [];
textByLine.forEach(line => {
    const stack = [];
    let corruptedLine = false;
    for (const char of line.split("")) {
        if (Object.keys(pairs).includes(char)) {
            stack.push(char);
        } else if (pairs[stack.pop()] != char) {
            corruptedLine = true;
            break;
        }
    }
    if (!corruptedLine) {
        const linePoints = stack.reverse().reduce((total, char) => {
            total *= 5;
            total += Object.keys(pairs).indexOf(char) + 1;
            return total;
        }, 0);
        scores.push(linePoints);
    }
});

console.log(scores.sort((a, b) => b - a)[Math.floor(scores.length / 2)]);