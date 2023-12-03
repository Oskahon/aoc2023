const fs = require('fs');

const file = 'data.txt';
const lines = fs.readFileSync(file, 'utf-8').split('\n');

function filterNumbers(char) {
    return !isNaN(char);
}

function part1(data) {
    const filteredNumbers = lines.map(line => line.split('').filter(filterNumbers));

    let sum = 0;

    for (const line of filteredNumbers) {
        const first = line[0];
        const last = line[line.length - 1];

        sum += Number(first + last);
    }

    return sum;
}

function part2(data) {
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

    let sum = 0;

    lines.map(line => {
        let first = { position: Infinity, value: '' };
        let last = { position: -1, value: '' };

        for (const [key, value] of spelledDigits) {
            const firstIndex = line.indexOf(key);
            const lastIndex = line.lastIndexOf(key);

            if (firstIndex != -1) {
                if (firstIndex < first.position) {
                    first.position = firstIndex;
                    first.value = value;
                }
                if (lastIndex > last.position) {
                    last.position = lastIndex;
                    last.value = value;
                }
            }
        }

        sum += parseInt(first.value + last.value);
    });

    return sum;
}


console.log(`Part1: ${part1(lines)}`);

console.log(`Part2: ${part2(lines)}`);