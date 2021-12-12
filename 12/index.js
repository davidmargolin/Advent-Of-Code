import fs from "fs";

// parse input

const text = fs.readFileSync("./12/input.txt", { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

console.log("Part 1:");

const edges = textByLine.reduce((allEdges, line) => {
    const [a, b] = line.split("-");
    if (!(a in allEdges)) {
        allEdges[a] = [];
    }
    if (!(b in allEdges)) {
        allEdges[b] = [];
    }
    allEdges[a].push(b);
    allEdges[b].push(a);
    return allEdges;
}, {})

function pathsToEnd(current, visited) {
    if (current === "end") return 1;
    visited.push(current);

    const visitedSet = new Set(visited);

    const paths = edges[current].filter(next => {
        return !visitedSet.has(next) || !(next === next.toLowerCase());
    }).reduce((pathsCount, next) => {
        return pathsCount + pathsToEnd(next, [...visited]);
    }, 0);
    return paths;
}

console.log(pathsToEnd("start", []));

// Part 2

console.log("Part 2:");

function p2PathsToEnd(current, visited) {
    if (current === "end") return 1;

    visited.push(current);

    let hasMultiSmallCaveVisits = false;
    const uniqueVisits = new Set();
    visited.forEach(v => {
        if (uniqueVisits.has(v) && v === v.toLowerCase()) {
            hasMultiSmallCaveVisits = true;
        }
        uniqueVisits.add(v);
    });

    const paths = edges[current].filter(next => {
        return next !== "start" && (!uniqueVisits.has(next) || !(next === next.toLowerCase()) || !hasMultiSmallCaveVisits);
    }).reduce((pathsCount, next) => {
        return pathsCount + p2PathsToEnd(next, [...visited]);
    }, 0);

    return paths;
}

console.log(p2PathsToEnd("start", []));