import fs from "fs";
import path from "path";

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: "utf-8" });
const textByMultiLine = text.split("\n\n");

// Part 1

console.log("Part 1:");

const [template, insertions] = textByMultiLine;

const letterPairs = {}
for (let i = 0; i < template.length - 1; i++) {
    const pair = template[i] + template[i + 1];
    if (!(pair in letterPairs)) letterPairs[pair] = 0;
    letterPairs[pair] += 1;
}

const letterCounts = template.split("").reduce((counts, letter) => {
    if (!(letter in counts)) counts[letter] = 0;
    counts[letter] += 1;
    return counts;
}, {});

const parsedInsertions = insertions.split("\n").map(insertion => insertion.split(" -> "));

function step(pairs, counts) {
    return parsedInsertions.reduce((res, [pair, letter]) => {
        const { newPairs, newCounts } = res;
        if (pair in pairs) {
            if (!((pair[0] + letter) in newPairs)) {
                newPairs[pair[0] + letter] = 0;
            }
            if (!((letter + pair[1]) in newPairs)) {
                newPairs[letter + pair[1]] = 0;
            }
            if (!(letter in newCounts)) {
                newCounts[letter] = 0;
            }
            newPairs[pair] -= pairs[pair];
            newPairs[pair[0] + letter] += pairs[pair];
            newPairs[letter + pair[1]] += pairs[pair];
            newCounts[letter] += pairs[pair];
        }
        return res;
    }, { newPairs: { ...pairs }, newCounts: { ...counts } });
};

let currentPairs = letterPairs;
let currentCounts = letterCounts;
for (let i = 0; i < 10; i++) {
    const { newPairs, newCounts } = step(currentPairs, currentCounts);
    currentPairs = newPairs;
    currentCounts = newCounts;
}

console.log(Math.max(...Object.values(currentCounts)) - Math.min(...Object.values(currentCounts)));

// Part 2

console.log("Part 2:");

for (let i = 0; i < 30; i++) {
    const { newPairs, newCounts } = step(currentPairs, currentCounts);
    currentPairs = newPairs;
    currentCounts = newCounts;
}

console.log(Math.max(...Object.values(currentCounts)) - Math.min(...Object.values(currentCounts)));