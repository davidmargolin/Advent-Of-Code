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
    }

    addFile(file) {
        this.files.push(file);
    }

    addChild(child) {
        this.children.push(child);
    }

    visitChild(name) {
        return this.children.find(child => child.name === name);
    }

    visitParent() {
        return this.parent;
    }

    getSize() {
        if (this.size) return this.size;

        const filesSize = this.files.reduce((total, file) => {
            return total + file.size;
        }, 0);

        const childSizes = this.children.reduce((total, dir) => {
            return total + dir.getSize();
        }, 0);

        this.size = filesSize + childSizes;
        return this.size;
    }
}

const root = new Directory("/", null);
let currentDir;

textByLine.forEach((line) => {
    if (line.startsWith("$ cd ")) {
        const newDir = line.slice(5);
        switch (newDir) {
            case "/":
                currentDir = root;
                return;
            case "..":
                currentDir = currentDir.visitParent();
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
})

function dirsSmallerThan(node, size) {
    const childSmallDirs = node.children.reduce((total, dir) => {
        return total + dirsSmallerThan(dir, size);
    }, 0);
    if (node.getSize() <= size) {
        return childSmallDirs + node.getSize();
    }
    return childSmallDirs;
}

console.log(dirsSmallerThan(root, 100000));

// Part 2

console.log("Part 2:");

function minDeletableDir(node, deleteSize) {
    if (node.size < deleteSize) {
        return Infinity;
    } else if (node.children.length === 0) {
        return node.getSize();
    }
    const childMins = node.children.map(child => minDeletableDir(child, deleteSize))
        .sort();
    return Math.min(node.getSize(), childMins[0]);
}

console.log(minDeletableDir(root, 30000000 - (70000000 - root.size)));