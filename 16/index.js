import fs from "fs";
import path from "path";

// parse input

const text = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: "utf-8" });

// Part 1

console.log("Part 1:");

const binary = text.split("").map(hex => parseInt(hex, 16).toString(2).padStart(4, "0")).join("");

function parsePacket(binary, startIndex) {
    let index = startIndex;
    const subPackets = [];
    const version = parseInt(binary.substring(index, index + 3), 2);
    index += 3;
    const type = parseInt(binary.substring(index, index + 3), 2);
    index += 3;

    if (type !== 4) {
        const lengthType = binary[index];
        index++;
        if (lengthType === "0") {
            const length = parseInt(binary.substring(index, index + 15), 2);
            index += 15;
            const expectEndIndex = index + length;
            while (index != expectEndIndex) {
                const packet = parsePacket(binary, index);
                subPackets.push(packet);
                index = packet.endIndex;
            }
        } else {
            const subPacketCount = parseInt(binary.substring(index, index + 11), 2);
            index += 11;
            while (subPackets.length < subPacketCount) {
                const packet = parsePacket(binary, index);
                subPackets.push(packet);
                index = packet.endIndex;
            }
        }
    }

    switch (type) {
        case 0:
            return { version, type, endIndex: index, subPackets, value: subPackets.reduce((total, { value }) => total + value, 0) };
        case 1:
            return { version, type, endIndex: index, subPackets, value: subPackets.reduce((total, { value }) => total * value, 1) };
        case 2:
            return { version, type, endIndex: index, subPackets, value: Math.min(...subPackets.map(p => p.value)) };
        case 3:
            return { version, type, endIndex: index, subPackets, value: Math.max(...subPackets.map(p => p.value)) };
        case 4:
            let valueStr = "";
            while (true) {
                const isLastSegment = binary[index] === "0";
                index++;
                valueStr += binary.substring(index, index + 4);
                index += 4;
                if (isLastSegment) {
                    break;
                }
            }
            return { version, type, endIndex: index, subPackets, value: parseInt(valueStr, 2) };
        case 5:
            return { version, type, endIndex: index, subPackets, value: subPackets[0].value > subPackets[1].value ? 1 : 0 };
        case 6:
            return { version, type, endIndex: index, subPackets, value: subPackets[0].value < subPackets[1].value ? 1 : 0 };
        case 7:
            return { version, type, endIndex: index, subPackets, value: subPackets[0].value === subPackets[1].value ? 1 : 0 };
    }
}

const packet = parsePacket(binary, 0);

let versionSum = 0;
const packetsQueue = [packet];
while (packetsQueue.length > 0) {
    const packet = packetsQueue.pop();
    versionSum += packet.version;
    packetsQueue.push(...packet.subPackets);
}

console.log(versionSum);

// Part 2

console.log("Part 2:");

console.log(packet.value);