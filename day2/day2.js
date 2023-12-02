const fs = require('fs');

const file = 'data.txt';
const lines = fs.readFileSync(file, 'utf-8').split('\n');

let games = new Map();

const maxValues = {
    red: 12,
    green: 13,
    blue: 14,
};

lines.forEach(line => {
    const [gameNumber, gameData] = line.split(': ');

    const id = parseInt(gameNumber.match(/\d+/));
    const highestCubes = { red: 0, blue: 0, green: 0 };

    const picks = gameData.split('; ');

    picks.forEach(pick => {
        const colors = pick.split(', ');

        colors.forEach(color => {
            let [amount, cubeColor] = color.split(' ');
            amount = parseInt(amount);

            if (amount > highestCubes[cubeColor]) {
                highestCubes[cubeColor] = amount;
            }
        });
    });

    games.set(id, highestCubes);
});

let sumOfIds = 0;
let sumOfPowers = 0;

for (const [id, highestCubes] of games.entries()) {
    if (highestCubes.red <= maxValues.red && highestCubes.green <= maxValues.green && highestCubes.blue <= maxValues.blue) {
        sumOfIds += id;
    }

    sumOfPowers += Object.values(highestCubes).reduce((power, value) => power *= value, 1);
}

console.log(`Part1: ${sumOfIds}`);
console.log(`Part2: ${sumOfPowers}`);
