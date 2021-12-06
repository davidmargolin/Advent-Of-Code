import fs from "fs";

// parse input

const text = fs.readFileSync("./6/input.txt", { encoding: "utf-8" });

// Part 1

console.log("Part 1:");

const fish = text.split(",").map(t => parseInt(t));

const fishTimers = {};
for (let i = 0; i <= 8; i++) {
    fishTimers[i] = 0;
}

fish.forEach((timer) => fishTimers[timer]++);

function ageFish(days) {
    for (let i = 0; i < days; i++) {
        const newFish = fishTimers[0];
        for (let i = 0; i <= 8; i++) {
            fishTimers[i] = fishTimers[i + 1];
        }
        fishTimers[6] += newFish;
        fishTimers[8] = newFish;
    }
}

ageFish(80);

console.log(Object.values(fishTimers).reduce((a, b) => a + b));

// Part 2

console.log("Part 2:");

ageFish(176);

console.log(Object.values(fishTimers).reduce((a, b) => a + b));