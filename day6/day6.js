const fs = require('fs');

const file = 'data.txt';
const lines = fs.readFileSync(file, 'utf-8').split('\n');

function parseData(lines) {
    const data = lines.map(line => Array.from(line.match(/\d+/g)));
    const races = [];

    for (let i = 0; i < data[0].length; i++) {
        const race = {
            time: data[0][i],
            distance: data[1][i],
        };

        races.push(race);
    }

    return races;
}

function countWinningOptions(races) {
    const optionsPerRace = [];

    for (const race of races) {
        let countWins = 0;
        for (let i = 0; i <= +race.time; i++) {
            if ((i * (+race.time - i)) > +race.distance) {
                countWins += 1;
            }
        }
        optionsPerRace.push(countWins);
    }

    return optionsPerRace;
}

function part1(races) {
    const winningOptinons = countWinningOptions(races);

    const part1 = winningOptinons.reduce((sum, value) => sum *= value, 1);

    console.log(`Part1: ${part1}`);
}

function part2(races) {
    let time = '';
    let distance = '';

    for (let i = 0; i < races.length; i++) {
        time += races[i].time;
        distance += races[i].distance;
    }

    const wins = countWinningOptions([{ time, distance }]);

    console.log(`Part2: ${wins}`);
}

const races = parseData(lines);

part1(races);
part2(races);