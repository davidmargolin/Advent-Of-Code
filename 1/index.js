import fs from "fs";
import path from "path";

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

const entries = textByLine.map(entry => parseInt(entry));

console.log("Part 1:");

function countIncrease(nums) {
    let count = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i + 1] > nums[i]) {
            count++;
        }
    }
    return count;
}

console.log(countIncrease(entries));

// Part 2

console.log("Part 2:");

const trioSums = [];
for (let i = 0; i < entries.length - 2; i++) {
    trioSums.push(entries[i] + entries[i + 1] + entries[i + 2]);
}

console.log(countIncrease(trioSums));