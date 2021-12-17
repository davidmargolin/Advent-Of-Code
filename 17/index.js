import fs from "fs";
import path from "path";

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: "utf-8" });

// Part 1

console.log("Part 1:");

const xRange = text.substring(text.indexOf("x=") + 2, text.indexOf(",")).split("..").map(x => parseInt(x));
const yRange = text.substring(text.indexOf("y=") + 2).split("..").map(y => parseInt(y));

function highestPoint(xStartVelocity, yStartVelocity, xRange, yRange) {
    let inRange = false;
    let maxY = 0;
    let xV = xStartVelocity;
    let yV = yStartVelocity;
    let x = 0;
    let y = 0;

    while (x <= xRange[1] && y >= yRange[0]) {
        maxY = Math.max(maxY, y);
        if (x >= xRange[0] && x <= xRange[1] && y >= yRange[0] && y <= yRange[1]) {
            inRange = true;
        }
        x += xV;
        y += yV;
        if (xV < 0) xV++;
        if (xV > 0) xV--;
        yV--;
    }

    if (inRange) {
        return maxY;
    }
    return 0;
}

let maxY = 0;
// These range bounds were pretty arbitrarily chosen on a really exhausting day. 
// They worked for the test input but I'm not sure if they would work for all inputs.
for (let xVelocity = 0; xVelocity <= xRange[1]; xVelocity++) {
    for (let yVelocity = yRange[0]; yVelocity < xRange[0]; yVelocity++) {
        maxY = Math.max(maxY, highestPoint(xVelocity, yVelocity, xRange, yRange));
    }
}

console.log(maxY);

// Part 2

console.log("Part 2:");

function inRange(xStartVelocity, yStartVelocity, xRange, yRange) {
    let xV = xStartVelocity;
    let yV = yStartVelocity;
    let x = 0;
    let y = 0;

    while (x <= xRange[1] && y >= yRange[0]) {
        if (x >= xRange[0] && x <= xRange[1] && y >= yRange[0] && y <= yRange[1]) {
            return true;
        }
        x += xV;
        y += yV;
        if (xV < 0) xV++;
        if (xV > 0) xV--;
        yV--;
    }
    return false;
}

let validVelocity = 0;
for (let xVelocity = 0; xVelocity <= xRange[1]; xVelocity++) {
    for (let yVelocity = yRange[0]; yVelocity < xRange[0]; yVelocity++) {
        if (inRange(xVelocity, yVelocity, xRange, yRange)) {
            validVelocity++;
        }
    }
}

console.log(validVelocity);