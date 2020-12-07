import fs from "fs";

// parse input

const text = fs.readFileSync("./6/input.txt", { encoding: "utf-8" });
const textByGroup = text.split("\n\n");

// Part 1

console.log("Part 1:");

const totalAnswers = textByGroup.reduce((total, curr) => {
    const letters = new Set(curr.split("\n").join(""));
    return total + letters.size;
}, 0)

console.log(totalAnswers);

// Part 2

console.log("Part 2:");

const totalOverlappingAnswers = textByGroup.reduce((total, curr) => {
    const [overlapping, ...otherAnswers] = curr.split("\n").map(line => new Set(line));
    otherAnswers.forEach(answers => {
        overlapping.forEach(overlap => {
            if (!answers.has(overlap)) {
                overlapping.delete(overlap);
            }
        })
    })
    return total + overlapping.size;
}, 0)

console.log(totalOverlappingAnswers);