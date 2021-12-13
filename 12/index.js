import fs from "fs";
import path from "path";

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

console.log("Part 1:");

const edges = textByLine.reduce((allEdges, line) => {
    const nodes = line.split("-");
    nodes.filter(node => !(node in allEdges)).forEach(node => {
        allEdges[node] = [];
    });
    const [a, b] = nodes;
    allEdges[a].push(b);
    allEdges[b].push(a);
    return allEdges;
}, {})

function pathsToEnd(current, visited, allowSecondSmallCaveVisit = false) {
    if (current === "end") return 1;

    visited.push(current);

    const uniqueVisits = new Set(visited);

    const paths = edges[current].filter(next => {
        if (next === "start") return false;
        return !uniqueVisits.has(next) || next !== next.toLowerCase() || allowSecondSmallCaveVisit;
    }).reduce((pathsCount, next) => {
        const canRevisitSmallCave = allowSecondSmallCaveVisit && (!uniqueVisits.has(next) || next != next.toLowerCase());
        return pathsCount + pathsToEnd(next, [...visited], canRevisitSmallCave);
    }, 0);

    return paths;
}

console.log(pathsToEnd("start", []));

// Part 2

console.log("Part 2:");

console.log(pathsToEnd("start", [], true));