import fs from "fs";

// parse input

const text = fs.readFileSync("./5/input.txt", { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

console.log("Part 1:");

const lines = textByLine.map(line => {
    return line.split(" -> ").map(point => {
        return point.split(",").map(n => parseInt(n));
    });
});

const maxX = Math.max(...lines.map(([start, end]) => {
    return Math.max(start[0], end[0]);
}));

const maxY = Math.max(...lines.map(([start, end]) => {
    return Math.max(start[1], end[1]);
}));

const graph = Array.from(Array(maxX + 1), () => new Array(maxY + 1).fill(0));

const verticalLines = lines.filter(([start, end]) => {
    return start[0] === end[0];
});

const horizontalLines = lines.filter(([start, end]) => {
    return start[1] === end[1];
});

verticalLines.forEach((line) => {
    const [start, end] = line.sort((a, b) => a[1] - b[1]);
    for (let i = start[1]; i <= end[1]; i++) {
        graph[start[0]][i] += 1;
    }
});

horizontalLines.forEach((line) => {
    const [start, end] = line.sort((a, b) => a[0] - b[0]);
    for (let i = start[0]; i <= end[0]; i++) {
        graph[i][start[1]] += 1;
    }
});

console.log(graph.flat().filter(x => x > 1).length);

// Part 2

console.log("Part 2:");

const upDiagLines = lines.filter(([start, end]) => {
    return start[0] - start[1] === end[0] - end[1];
});

const downDiagLines = lines.filter(([start, end]) => {
    return start[0] + start[1] === end[0] + end[1];
});

upDiagLines.forEach((line) => {
    const [start, end] = line.sort((a, b) => a[0] - b[0]);
    for (let x = start[0], y = start[1]; x <= end[0]; x++, y++) {
        graph[x][y] += 1;
    }
});

downDiagLines.forEach((line) => {
    const [start, end] = line.sort((a, b) => a[1] - b[1]);
    for (let x = start[0], y = start[1]; x >= end[0]; x--, y++) {
        graph[x][y] += 1;
    }
});

console.log(graph.flat().filter(x => x > 1).length);