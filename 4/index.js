import fs from "fs";
import path from "path";

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: "utf-8" });
const textByLine = text.split("\n\n");

// Part 1

console.log("Part 1:");

const calls = textByLine.shift().split(",").map(call => parseInt(call));

const boards = textByLine.map(board =>
    board.split("\n").map(row =>
        row.trim().split(/\s+/).map(cell => {
            return { number: parseInt(cell), used: false };
        })
    )
);

function markBoard(board, call) {
    board.flat().forEach(cell => {
        if (cell.number === call) cell.used = true;
    });
}

function checkBoard(board) {
    const hasHorizontalMatch = board.some(row =>
        row.every(cell => cell.used)
    )

    if (hasHorizontalMatch) return true;

    for (let i = 0; i < board[0].length; i++) {
        const column = board.map(row => row[i]);
        if (column.every(cell => cell.used)) return true;
    }

    return false;
}

function unmarkedSum(board) {
    return board.flat().reduce((sum, cell) => {
        if (!cell.used) sum += cell.number;
        return sum;
    }, 0)
}

let winningBoard, lastCall;
for (let i = 0; i < calls.length && !winningBoard; i++) {
    lastCall = calls[i];
    winningBoard = boards.find(board => {
        markBoard(board, lastCall);
        return checkBoard(board);
    });
}

console.log(unmarkedSum(winningBoard) * lastCall);

// Part 2

console.log("Part 2:");

const newBoards = textByLine.map(board =>
    board.split("\n").map(row =>
        row.trim().split(/\s+/).map(cell => {
            return { number: parseInt(cell), used: false };
        })
    )
);

const callsToWin = newBoards.map((board, index) => {
    const firstCallToWin = calls.findIndex((call) => {
        markBoard(board, call);
        return checkBoard(board);
    });
    return { boardIndex: index, callIndex: firstCallToWin };
})

const { boardIndex, callIndex } = callsToWin.sort((a, b) => a.callIndex - b.callIndex).pop();

console.log(unmarkedSum(newBoards[boardIndex]) * calls[callIndex]);