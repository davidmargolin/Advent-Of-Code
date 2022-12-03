import fs from "fs";
import path from "path";

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

console.log("Part 1:");

const rucksacks = textByLine.map(line => {
    return {
        firstCompartment: line.slice(0, line.length / 2).split(""),
        secondCompartment: line.slice(line.length / 2, line.length).split(""),
    };
});

const sharedItems = rucksacks.map(({ firstCompartment, secondCompartment }) => {
    return firstCompartment.find(item => secondCompartment.includes(item));
});

function prioritySum(items) {
    return items.reduce((prev, curr) => {
        if (curr.toUpperCase() === curr) {
            return prev + curr.charCodeAt(0) - "A".charCodeAt(0) + 27;
        }
        return prev + curr.charCodeAt(0) - "a".charCodeAt(0) + 1;
    }, 0);
}

console.log(prioritySum(sharedItems))

// Part 2

console.log("Part 2:");

function getRucksacks(lines, groupSize) {
    const rucksacks = new Array(lines.length / groupSize).fill([]);
    return rucksacks.map((_, index) =>
        lines.slice(groupSize * index, groupSize * (index + 1)).map(items => new Set(items.split("")))
    );
}

function intersectionOfSets(A, B) {
    return new Set([...A].filter(item => B.has(item)));
}

function getSharedItem(compartments) {
    const sharedItems = compartments.reduce(intersectionOfSets, compartments[0]);
    return sharedItems.keys().next().value;
}

console.log(prioritySum(getRucksacks(textByLine, 3).map(getSharedItem)));
