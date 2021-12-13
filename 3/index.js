import fs from "fs";
import path from "path";

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

console.log("Part 1:");

const oneCounts = textByLine.reduce((counts, line) => {
    line.split("").forEach((bit, index) => {
        counts[index] += parseInt(bit);
    })
    return counts;
}, new Array(textByLine[0].length).fill(0));

function flipBits(bits) {
    return bits.split("").map(bit => 1 - bit).join("");
}

const gamma = oneCounts.map(count => count > textByLine.length / 2 ? "1" : "0").join("");
const epsilon = flipBits(gamma);

console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));

// Part 2

console.log("Part 2:");

function findRating(lines, isOxygen = true) {
    let options = lines;
    for (let i = 0; i < lines[0].length && options.length > 1; i++) {
        const oneCounts = options.reduce((total, curr) => {
            return total += parseInt(curr[i]);
        }, 0);
        let bitToKeep = oneCounts >= options.length / 2 ? 1 : 0;
        if (!isOxygen) {
            bitToKeep = 1 - bitToKeep;
        }
        options = options.filter(option => option[i] == bitToKeep);
    }
    return options[0];
}

const oxygen = findRating(textByLine);
const co2 = findRating(textByLine, false);

console.log(parseInt(oxygen, 2) * parseInt(co2, 2));
