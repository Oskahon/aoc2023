const fs = require('fs');

const file = 'data.txt';
const lines = fs.readFileSync(file, 'utf-8').split('\n');

const filteredNumbers = lines.map(line => line.split('').filter(char => !isNaN(char)));

let sum = 0;

for (const line of filteredNumbers) {
    const first = line[0];
    const last = line[line.length - 1];
    const calibrationValue = first + last;

    sum += parseInt(calibrationValue);
}

console.log(`Part1: ${sum}`);

const spelledDigits = new Map([
    ['one', '1'],
    ['two', '2'],
    ['three', '3'],
    ['four', '4'],
    ['five', '5'],
    ['six', '6'],
    ['seven', '7'],
    ['eight', '8'],
    ['nine', '9'],
    ['1', '1'],
    ['2', '2'],
    ['3', '3'],
    ['4', '4'],
    ['5', '5'],
    ['6', '6'],
    ['7', '7'],
    ['8', '8'],
    ['9', '9'],
]);

const firstAndLast = lines.map(line => {
    let first = { position: -1, value: '' };
    let last = { position: -1, value: '' };

    for (const [key, value] of spelledDigits) {
        let i = -1;

        while ((i = line.indexOf(key, i + 1)) != -1) {
            if (first.position === -1) {
                first.position = i;
                first.value = value;
                last.position = i;
                last.value = value;
            } else {
                if (i < first.position) {
                    first.position = i;
                    first.value = value;
                }
                if (i > last.position) {
                    last.position = i;
                    last.value = value;
                }
            }
        }
    }

    return first.value + last.value;
});

let part2Sum = 0;
firstAndLast.forEach(str => part2Sum += parseInt(str));

console.log(`Part2: ${part2Sum}`);