import fs from "fs";

// parse input

const text = fs.readFileSync("./1/input.txt", { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

const entries = textByLine.map(entry => parseInt(entry));

console.log("Part 1:");

const savedEntries = {};
for (const entry of entries){
    savedEntries[entry] = true;
    if (savedEntries[2020 - entry]){
        console.log(entry * (2020-entry));
        break;
    }
}

// Part 2

console.log("Part 2:");

let completed = false;
for (const entry of entries){
    for (const entry1 of entries){
        for (const entry2 of entries){
            if (entry + entry1 + entry2 === 2020){
                console.log(entry * entry1 * entry2);
                completed = true;
            }
            if (completed) break;
        }
        if (completed) break;
    }
    if (completed) break;
}