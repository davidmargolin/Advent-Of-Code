import fs from "fs";
import path from "path";

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: "utf-8" });
const textByMultiLine = text.split("\n\n");

// Part 1

console.log("Part 1:");

const points = textByMultiLine[0].split("\n").map(line => {
    const [x, y] = line.split(",").map((p) => parseInt(p));
    return { x, y };
});

const instructions = textByMultiLine[1].split("\n").map(line => {
    const [axis, numStr] = line.split(" ").reverse()[0].split("=");
    return { axis, num: parseInt(numStr) };
});

function foldByInstruction(instruction, points) {
    const { axis, num } = instruction;
    const aboveFold = points.filter(point => point[axis] < num);
    const belowFold = points.filter(point => point[axis] > num);
    aboveFold.push(...belowFold.map(point => {
        point[axis] = Math.abs(point[axis] - 2 * instruction.num);
        return point;
    }));
    const uniquePoints = new Set(aboveFold.map(point => `${point.x},${point.y}`));
    return [...uniquePoints].map(pointStr => {
        const [x, y] = pointStr.split(",").map((p) => parseInt(p));
        return { x, y };
    });
}

console.log(foldByInstruction(instructions[0], points).length);

// Part 2

console.log("Part 2:");

const folded = instructions.reduce((acc, instruction) => foldByInstruction(instruction, acc), points);

const maxX = folded.reduce((max, point) => Math.max(max, point.x), 0);
const maxY = folded.reduce((max, point) => Math.max(max, point.y), 0);

const grid = new Array(maxY + 1).fill(0).map(() => new Array(maxX + 1).fill(" "));
folded.forEach(point => grid[point.y][point.x] = "█");

console.log(grid.map(line => line.join("")).join("\n"));