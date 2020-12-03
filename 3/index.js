import fs from "fs";

// parse input

const text = fs.readFileSync("./3/input.txt", { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

console.log("Part 1:");

function countTrees(right, down) {
    let horizontalLocation = 0;
    let trees = 0;
    textByLine.forEach((line, index) => {
        if (index % down === 0) {
            if (line[horizontalLocation] === "#") {
                trees++;
            }
            horizontalLocation += right;
            if (horizontalLocation > textByLine[0].length - 1) {
                horizontalLocation -= textByLine[0].length;
            }
        }
    });
    return trees;
}

console.log(countTrees(3, 1));

// Part 2

console.log("Part 2:");

const options = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];

function product(...numbers) {
    return numbers.reduce((total, curr) => total * curr, 1);
}

const results = options.map(option => countTrees(...option))

console.log(product(...results));


