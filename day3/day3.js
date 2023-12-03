const fs = require('fs');

const file = 'data.txt';
const lines = fs.readFileSync(file, 'utf-8').split('\n');

const nonSymbols = '0123456789.';
const maxLine = lines.length - 1;
const maxWidth = lines[0].length - 1;

const values = [];

lines.forEach((line, lineIndex) => {
    let start = 0;
    let end = 0;
    let value = '';
    let foundDigit = false;

    for (let i = 0; i <= line.length; i++) {
        // @ts-ignore
        if (!isNaN(line[i])) {
            if (!foundDigit) {
                foundDigit = true;
                start = i;
            }
            value += line[i];
        }
        // @ts-ignore
        if (isNaN(line[i]) && foundDigit) {
            foundDigit = false;
            end = i - 1;

            const partData = {
                lineIndex,
                value,
                start,
                end,
                gear: false,
                gearXY: {
                    x: 0,
                    y: 0,
                }
            };

            value = '';
            values.push(partData);
        }
    }

});

let sumOfParts = 0;
let sumOfGears = 0;

values.forEach(part => {
    if (searchSymbol(part, lines)) {
        sumOfParts += Number(part.value);
    }
});

const geared = values.filter(part => part.gear);
geared.forEach((part, index) => {
    for (let i = (index + 1); i < geared.length; i++) {
        let comparedPart = geared[i];

        if (part.gearXY.x === comparedPart.gearXY.x && part.gearXY.y === comparedPart.gearXY.y) {
            sumOfGears += Number(part.value) * Number(comparedPart.value);
        }
    }
});

console.log(`Part1: ${sumOfParts}`);
console.log(`Part2: ${sumOfGears}`);

function searchSymbol(partData, lines) {
    let startIndex = partData.start;
    let endIndex = partData.end;

    if (startIndex > 0) {
        startIndex -= 1;
    }
    if (endIndex < maxWidth) {
        endIndex += 1;
    }

    for (let i = startIndex; i <= endIndex; i++) {
        if (!nonSymbols.includes(lines[partData.lineIndex][i])) {
            if (lines[partData.lineIndex][i] === '*') {
                partData.gear = true;
                partData.gearXY.x = i;
                partData.gearXY.y = partData.lineIndex;
            }
            return true;
        }
    }

    if (partData.lineIndex > 0) {
        for (let i = startIndex; i <= endIndex; i++) {
            if (!nonSymbols.includes(lines[partData.lineIndex - 1][i])) {
                if (lines[partData.lineIndex - 1][i] === '*') {
                    partData.gear = true;
                    partData.gearXY.x = i;
                    partData.gearXY.y = partData.lineIndex - 1;
                }
                return true;
            }
        }

    }
    if (partData.lineIndex < maxLine) {
        for (let i = startIndex; i <= endIndex; i++) {
            if (!nonSymbols.includes(lines[partData.lineIndex + 1][i])) {
                if (lines[partData.lineIndex + 1][i] === '*') {
                    partData.gear = true;
                    partData.gearXY.x = i;
                    partData.gearXY.y = partData.lineIndex + 1;
                }
                return true;
            }
        }

    }

    return false;
}
