import fs from "fs";
import path from "path";

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

console.log("Part 1:");

function addToLeftNum(fishArrStr, index, num) {
    let tempIndex = index;
    let numStr = ""
    while (tempIndex > 0) {
        while (fishArrStr[tempIndex] !== "," && fishArrStr[tempIndex] !== "]" && fishArrStr[tempIndex] !== "[") {
            numStr = fishArrStr[tempIndex] + numStr;
            tempIndex--;
        }
        if (numStr !== "") {
            const numInt = parseInt(numStr);
            return fishArrStr.slice(0, index) + (num + numInt) + fishArrStr.slice(tempIndex);
        }
    }
}

function sum(snailfishNum) {
    let fishArrStr = snailfishNum
    let currentDepth = 0;
    let index = 0;
    let numStr = ""
    let numStrStartIndex;
    while (index < fishArrStr.length) {
        console.log(index, currentDepth)
        if (fishArrStr[index] === "]") {
            currentDepth--;
        }
        if (fishArrStr[index] === "[") {
            currentDepth++;
        }
        if (numStr === "" && fishArrStr[index] !== "," && fishArrStr[index] !== "]" && fishArrStr[index] !== "[") {
            while (fishArrStr[index] !== "," && fishArrStr[index] !== "]" && fishArrStr[index] !== "[") {
                numStrStartIndex = index;
                numStr += fishArrStr[index];
                index++;
            }
        }
        if (numStr !== "") {
            const numInt = parseInt(numStr);
            numStr = "";
            if (numInt >= 10) {
                fishArrStr = fishArrStr.slice(0, numStrStartIndex - 1) + `[${Math.floor(numInt / 2)},${Math.ceil(numInt / 2)}]` + fishArrStr.slice(index);
                index = 0;
                currentDepth = 0;
                continue;
            }
            // if (currentDepth > 4) {
            //     console.log("here", currentDepth)
            //     fishArrStr = addToLeftNum(fishArrStr, numStrStartIndex, numInt);
            //     index = 0;
            //     currentDepth = 0;
            //     break;
            // }
        }
        index++;
    }
    return fishArrStr;
}

console.log(sum(textByLine[0]))

// Part 2

console.log("Part 2:");

