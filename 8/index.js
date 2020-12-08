import fs from "fs";

// parse input

const text = fs.readFileSync("./8/input.txt", { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

console.log("Part 1:");

const instructions = textByLine.map(text => {
    const [instruction, num] = text.split(" ");
    return { instruction, num };
})

const runProgram = (instructions) => {
    const visitedInstructions = new Set();
    let currentInstructionIndex = 0;
    let accTotal = 0;
    while (true) {
        visitedInstructions.add(currentInstructionIndex);
        const { instruction, num } = instructions[currentInstructionIndex];
        if (instruction === "acc") {
            accTotal += parseInt(num);
        }
        if (instruction === "jmp") {
            currentInstructionIndex += parseInt(num);
        } else {
            currentInstructionIndex += 1;
        }
        // stop before an instruction is run the second time
        if (visitedInstructions.has(currentInstructionIndex)) {
            return [true, accTotal];
        }
        // stop when the currentInstructionIndex exceeds the amount of instructions
        if (currentInstructionIndex >= instructions.length) {
            return [false, accTotal];
        }
    }
}

console.log(runProgram(instructions)[1]);


// Part 2

console.log("Part 2:");

for (let i = 0; i < textByLine.length; i++) {
    const newInstructions = [...instructions];
    const { instruction, num } = instructions[i];
    if (instruction === "jmp") {
        newInstructions[i] = { instruction: "nop", num };
    } else if (instruction === "nop") {
        newInstructions[i] = { instruction: "jmp", num };
    }
    const [loops, accTotal] = runProgram(newInstructions);
    if (!loops) {
        console.log(accTotal);
        break;
    }
}