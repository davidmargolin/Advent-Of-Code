import fs from "fs";

// parse input

const text = fs.readFileSync("./1/input.txt", { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

const entries = textByLine.map(entry => parseInt(entry));

console.log("Part 1:");

const savedEntries = new Set();
for (const entry of entries){
    savedEntries.add(entry);
}

function findEntriesSumTotal(total){
    for (const entry of savedEntries){
        if (savedEntries.has(total - entry)){
            return [entry, total - entry];
        }
    }
    return [];
}

function product(...numbers){
    return numbers.reduce((total, curr)=> total * curr, 1);
}

console.log(product(...findEntriesSumTotal(2020)));

// Part 2

console.log("Part 2:");

for (const entry of savedEntries){
    const matches = findEntriesSumTotal(2020 - entry);
    if (matches.length){
        console.log(product(...matches, entry));
        break;
    }
}