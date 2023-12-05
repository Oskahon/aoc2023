const { log } = require('console');
const fs = require('fs');

const file = 'data.txt';
const lines = fs.readFileSync(file, 'utf-8').split('\n');

function parseData(lines) {
    const seeds = lines.shift().split(': ')[1].split(/\s+/).map(n => Number(n));
    const maps = [seeds];
    let mapIndex = 0;

    lines.forEach((line) => {
        if (line.includes('-to-')) {
            maps.push([]);
        } else if (line.length === 0) {
            mapIndex += 1;
        } else {
            const values = line.split(/\s+/).map(n => Number(n));
            maps[mapIndex].push(values);
        }
    });

    return maps;
}

function getLocations(data, seeds) {
    const locations = [];

    seeds.forEach(seed => {
        let destination = seed;

        data.forEach((map, mapIndex) => {
            let found = false;
            map.forEach((range, rangeIndex) => {
                if (!found && destination >= range[1] && destination < (range[1] + range[2])) {
                    destination = range[0] + (destination - range[1]);
                    // console.log(`map:${mapIndex + 1} range:${rangeIndex + 1} value:${destination}`);
                    found = true;
                }
            });
        });

        locations.push(destination);
    });

    return locations;
}

function part1(data) {
    const seeds = data[0];
    const locations = getLocations(data.slice(1), seeds);
    const nearest = Math.min(...locations);
    console.log(`Part1: ${nearest}`);
}

function part2(data) {
    const seedRanges = data[0];
    let min = Infinity;

    for (let i = 0; i < seedRanges.length; i += 2) {
        for (let j = seedRanges[i]; j < (seedRanges[i] + seedRanges[i + 1]); j++) {
            const locations = getLocations(data.slice(1), [j]);

            if (locations[0] < min) [
                min = locations[0]
            ];
        }
    }

    console.log(`Part2: ${min}`);
}

const data = parseData(lines);

// part1(data);
part2(data);
