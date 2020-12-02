import fs from "fs";

// parse input

const text = fs.readFileSync("./2/input.txt", { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1
const entries = textByLine.map(entry => {
    const splitted = entry.split(": ");
    const char = splitted[0].slice(-1);
    const password = splitted[1];
    const [min, max] = splitted[0].slice(0, -2).split("-");
    return {
        password,
        char,
        min,
        max
    };
});

console.log("Part 1:");

const totalValid = entries.reduce((total, curr) => {
    const {password, min, max , char} = curr;
    const charCount = password.split(char).length-1;
    if (charCount >= min && charCount <= max){
        return total + 1;
    }
    return total;
}, 0);

console.log(totalValid)

// Part 2

console.log("Part 2:");

const totalValid2 = entries.reduce((total, curr) => {
    const {password, min, max , char} = curr;
    if (((password[min-1] === char) && (password[max-1] != char)) || ((password[max-1] === char) && (password[min-1] != char))){
        return total + 1;
    }
    return total;
}, 0);

console.log(totalValid2);

