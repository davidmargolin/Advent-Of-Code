import fs from "fs";

// parse input

const text = fs.readFileSync("./7/input.txt", { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

console.log("Part 1:");

const parsedRules = textByLine.map(rule => {
    const [bagColor, contains] = rule.split(" bags contain ");
    if (contains === "no other bags.") {
        return { bagColor, bagsContained: {} };
    }
    return {
        bagColor,
        bagsContained: contains.replace(".", "").split(", ").reduce((total, curr) => {
            const colors = curr.replace(" bags", "").replace(" bag", "");
            total[colors.substr(2)] = parseInt(colors.substr(0, 1));
            return total;
        }, {})
    };
})

const containers = parsedRules.reduce((total, curr) => {
    const { bagColor, bagsContained } = curr;
    total[bagColor] = bagsContained;
    return total;
}, {})

const containsShinyGold = (color) => {
    const containedColors = Object.keys(containers[color])
    if (containedColors.length === 0) return false;
    if (containedColors.includes("shiny gold")) return true;
    return containedColors.some(containsShinyGold);
}

const countShinyGold = [...new Set(Object.keys(containers))].reduce((total, curr) => {
    if (containsShinyGold(curr)) {
        total += 1;
    }
    return total;
}, 0)

console.log(countShinyGold);

// Part 2

console.log("Part 2:");

const howManyBags = (color) => Object.keys(containers[color]).reduce((total, curr) => {
    return total += containers[color][curr] + containers[color][curr] * howManyBags(curr);
}, 0);

console.log(howManyBags("shiny gold"));