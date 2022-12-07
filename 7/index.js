import fs from "fs";
import path from "path";

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

console.log("Part 1:");

class File {
    constructor(name, size) {
        this.name = name;
        this.size = size;
    }
}

class Directory {
    children = [];
    files = [];
    size = undefined;

    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
        this.size = 0;
    }

    addFile(file) {
        this.files.push(file);
        this.addSize(file.size);
    }

    addChild(child) {
        this.children.push(child);
    }

    visitChild(name) {
        return this.children.find(child => child.name === name);
    }

    addSize(size) {
        this.size += size;
        if (this.parent) this.parent.addSize(size);
    }
}

function generateDirectory(instructions) {
    const root = new Directory("/", null);
    let currentDir;
    instructions.forEach((line) => {
        if (line.startsWith("$ cd ")) {
            const newDir = line.slice(5);
            switch (newDir) {
                case "/":
                    currentDir = root;
                    return;
                case "..":
                    currentDir = currentDir.parent;
                    return;
                default:
                    currentDir = currentDir.visitChild(newDir);
                    return;
            }
        }
        if (line === "$ ls") {
            return;
        }
        if (line.startsWith("dir ")) {
            const name = line.slice(4);
            const newDir = new Directory(name, currentDir);
            currentDir.addChild(newDir);
            return;
        }
        const [size, name] = line.split(" ");
        const newFile = new File(name, Number(size));
        currentDir.addFile(newFile);
    });
    return root;
}

function sumDirsSmallerThanSize(node, size) {
    const sumSmallChildDirs = node.children.reduce((total, dir) => {
        return total + sumDirsSmallerThanSize(dir, size);
    }, 0);
    if (node.size <= size) {
        return sumSmallChildDirs + node.size;
    }
    return sumSmallChildDirs;
}

const root = generateDirectory(textByLine);

console.log(sumDirsSmallerThanSize(root, 100000));

// Part 2

console.log("Part 2:");

function minDeletableDir(node, deleteSize) {
    if (node.size < deleteSize) {
        return Infinity;
    }
    const childMins = node.children.map(child => minDeletableDir(child, deleteSize));
    return Math.min(node.size, ...childMins);
}

console.log(minDeletableDir(root, 30000000 - (70000000 - root.size)));