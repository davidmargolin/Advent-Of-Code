import fs from "fs";

// parse input

const text = fs.readFileSync("./12/input.txt", { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

console.log("Part 1:");

const instructions = textByLine.map(inst => {
    const direction = inst[0];
    const amount = parseInt(inst.substr(1));
    return { direction, amount };
})

const ORDERED_DIRS = ["E", "S", "W", "N"];

const directions = {
    "E": 0,
    "S": 0,
    "W": 0,
    "N": 0,
}

const getNewDirection = (currDir, turns) => {
    const newIndex = (ORDERED_DIRS.findIndex(direction => direction === currDir) + turns + 4) % 4;
    return ORDERED_DIRS[newIndex];
}

let currentDirection = "E"
instructions.forEach((instruction) => {
    const { direction, amount } = instruction;
    if (direction === "L") {
        const turns = -amount / 90;
        currentDirection = getNewDirection(currentDirection, turns);
    } else if (direction === "R") {
        const turns = amount / 90;
        currentDirection = getNewDirection(currentDirection, turns);
    } else if (direction === "F") {
        directions[currentDirection] += amount;
    } else {
        directions[direction] += amount;
    }
})

console.log(Math.abs(directions["E"] - directions["W"]) + Math.abs(directions["N"] - directions["S"]));

// Part 2

console.log("Part 2:");

const directionsP2 = {
    "E": 0,
    "S": 0,
    "W": 0,
    "N": 0,
}

let waypoint = {
    "E": 10,
    "S": 0,
    "W": 0,
    "N": 1,
}

const rotateWayPoint = (turns) => {
    const newWayPoint = {}
    ORDERED_DIRS.forEach((dir, index) => {
        const newIndex = (index - turns + 4) % 4;
        newWayPoint[dir] = waypoint[ORDERED_DIRS[newIndex]];
    });
    return newWayPoint;
}

instructions.forEach((instruction) => {
    const { direction, amount } = instruction;
    if (direction === "L") {
        const turns = -amount / 90;
        waypoint = rotateWayPoint(turns);
    } else if (direction === "R") {
        const turns = amount / 90;
        waypoint = rotateWayPoint(turns);
    } else if (direction === "F") {
        ORDERED_DIRS.forEach((dir) => {
            directionsP2[dir] += waypoint[dir] * amount;
        });
    } else {
        waypoint[direction] += amount;
    }
})

console.log(Math.abs(directionsP2["E"] - directionsP2["W"]) + Math.abs(directionsP2["N"] - directionsP2["S"]));