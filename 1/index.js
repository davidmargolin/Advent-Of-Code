import fs from "fs";
import path from "path";

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: "utf-8" });
const textByEmptyLine = text.split("\n\n");

// Part 1

console.log("Part 1:");

function sum(nums) {
    return nums.reduce((prev, curr) => prev + curr, 0);
}

const caloriesListByElf = textByEmptyLine.map(caloriesText => caloriesText.split("\n").map(Number));

const maxCalories = caloriesListByElf.reduce((max, curr) => {
    const sumForElf = sum(curr);
    return Math.max(sumForElf, max);
}, 0);

console.log(maxCalories);

// Part 2

console.log("Part 2:");

function top3Nums(nums) {
    return nums.sort().reverse().slice(0, 3);
}

const top3MaxCalories = caloriesListByElf.reduce((top3, curr) => {
    const sumForElf = sum(curr);
    return top3Nums([...top3, sumForElf]);
}, []);

console.log(sum(top3MaxCalories));