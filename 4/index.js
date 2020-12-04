import fs from "fs";

// parse input

const text = fs.readFileSync("./4/input.txt", { encoding: "utf-8" });
const textByLine = text.split("\n\n");

// Part 1

console.log("Part 1:");

const passportList = textByLine.map(line =>
    line.split("\n").join(" ").split(" ").reduce((total, curr) => {
        const [key, value] = curr.split(":");
        total[key] = value;
        return total;
    }, {})
);

const reqFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const validPassports = passportList.filter((passport) => !reqFields.some(field => !(field in passport)));

console.log(validPassports.length);


// Part 2

console.log("Part 2:");

const EYE_COLORS = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
const DIGITS = "0123456789".split("");
const A_TO_F = "abcdef".split("");

const fieldValidation = {
    "byr": value => value >= 1920 && value <= 2002,
    "iyr": value => value >= 2010 && value <= 2020,
    "eyr": value => value >= 2020 && value <= 2030 && value.length === 4,
    "hgt": value => (value.slice(-2) === "cm" && value.slice(0, -2) >= 150 && value.slice(0, -2) <= 193) || (value.slice(-2) === "in" && value.slice(0, -2) >= 59 && value.slice(0, -2) <= 76),
    "hcl": value => value[0] === "#" && value.length === 7 && !value.slice(1).split("").some(value => ![...DIGITS, ...A_TO_F].includes(value)),
    "ecl": value => EYE_COLORS.includes(value),
    "pid": value => value.length === 9 && !value.split("").some(value => !DIGITS.includes(value)),
}

const approvedPassports = validPassports.filter(passport => !Object.keys(passport).some(field => field in fieldValidation && !fieldValidation[field](passport[field])));

console.log(approvedPassports.length);
