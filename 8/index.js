import fs from "fs";
import path from "path";

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: "utf-8" });
const textByLine = text.split("\n");

// Part 1

console.log("Part 1:");

const simpleSegmentCountToDigits = {
    2: 1,
    4: 4,
    3: 7,
    7: 8,
}

const parsedSignal = textByLine.map(line => {
    const [pattern, output] = line.split(" | ");
    return { patternNums: pattern.split(" "), outNums: output.split(" ") };
});

console.log(parsedSignal.reduce((acc, { outNums }) => {
    const count = outNums.filter(num => num.length in simpleSegmentCountToDigits).length;
    return acc + count;
}, 0));

// Part 2

console.log("Part 2:");

const nums = parsedSignal.map(({ patternNums, outNums }) => {
    const options = new Set(patternNums);
    const knownNums = new Array(10);
    for (const [segmentCount, digit] of Object.entries(simpleSegmentCountToDigits)) {
        const pattern = patternNums.find(num => num.length === parseInt(segmentCount));
        knownNums[digit] = pattern.split("").sort().join("");
        options.delete(pattern);
    }

    // 6 overlaps with only a single segment from 1
    const sixSegments = [...options].find(pattern =>
        pattern.length == 6 &&
        pattern.split("").filter(patternSeg => knownNums[1].split("").includes(patternSeg)).length === 1
    );
    knownNums[6] = sixSegments.split("").sort().join("");
    options.delete(sixSegments);

    // all segments in 5 overlap with segments in 6
    const fiveSegments = [...options].find(pattern =>
        pattern.length === 5 &&
        pattern.split("").every(patternSeg => knownNums[6].split("").includes(patternSeg))
    );
    knownNums[5] = fiveSegments.split("").sort().join("");
    options.delete(fiveSegments);

    // all segments in 5 overlap with segments in 9
    const nineSegments = [...options].find(pattern =>
        pattern.length === 6 &&
        knownNums[5].split("").every(seg => pattern.split("").includes(seg))
    );
    knownNums[9] = nineSegments.split("").sort().join("");
    options.delete(nineSegments);

    // all segments in 3 overlap with segments in 9
    const threeSegments = [...options].find(pattern =>
        pattern.length === 5 &&
        pattern.split("").every(seg => knownNums[9].split("").includes(seg))
    );
    knownNums[3] = threeSegments.split("").sort().join("");
    options.delete(threeSegments);

    // 0 is the remaining six segment number
    const zeroSegments = [...options].find(pattern => pattern.length === 6);
    knownNums[0] = zeroSegments.split("").sort().join("");
    options.delete(zeroSegments);

    // 2 is the last remaining option
    const twoSegments = [...options].pop();
    knownNums[2] = twoSegments.split("").sort().join("");

    const segments = knownNums.reduce((segs, currPattern, i) => {
        segs[currPattern] = i;
        return segs;
    }, {})

    return parseInt(outNums.map(seg => segments[seg.split("").sort().join("")]).join(""));
})

console.log(nums.reduce((acc, num) => acc + num, 0));