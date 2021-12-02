import fs from "fs";

// parse input

const text = fs.readFileSync("./2/input.txt", { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

console.log("Part 1:");

const position = textByLine.reduce((pos, line) => {
    const [direction, distanceStr] = line.split(" ");
    const distance = parseInt(distanceStr);

    switch (direction) {
        case "forward":
            pos.horizontal += distance;
            break;
        case "down":
            pos.depth += distance;
            break;
        case "up":
            pos.depth -= distance;
            break;
    }

    return pos;
}, { horizontal: 0, depth: 0 });

console.log(position.horizontal * position.depth);

// Part 2

console.log("Part 2:");

const positionWithAim = textByLine.reduce((pos, line) => {
    const [direction, distanceStr] = line.split(" ");
    const distance = parseInt(distanceStr);

    switch (direction) {
        case "forward":
            pos.horizontal += distance;
            pos.depth += pos.aim * distance;
            break;
        case "down":
            pos.aim += distance;
            break;
        case "up":
            pos.aim -= distance;
            break;
    }

    return pos;
}, { horizontal: 0, depth: 0, aim: 0 });

console.log(positionWithAim.horizontal * positionWithAim.depth);