const fs = require('fs');

const file = 'data.txt';
const lines = fs.readFileSync(file, 'utf-8').split('\n');

let games = new Map();

const redMax = 12;
const greenMax = 13;
const blueMax = 14;

lines.forEach(line => {
    const [gameNumber, gameData] = line.split(': ');

    const id = parseInt(gameNumber.split(' ')[1]);
    const highestCubes = new Map([['red', 0], ['blue', 0], ['green', 0]]);

    const picks = gameData.split('; ');

    picks.forEach(pick => {
        const colors = pick.split(', ');

        colors.forEach(color => {
            let [amount, cubeColor] = color.split(' ');
            amount = parseInt(amount);

            if (amount > highestCubes.get(cubeColor)) {
                highestCubes.set(cubeColor, amount);
            }
        });
    });

    games.set(id, highestCubes);
});

let sumOfIds = 0;
let sumOfPowers = 0;

for (const [id, highestCubes] of games.entries()) {
    if (highestCubes.get('red') <= redMax && highestCubes.get('green') <= greenMax && highestCubes.get('blue') <= blueMax) {
        sumOfIds += id;
    }

    sumOfPowers += (highestCubes.get('red') * highestCubes.get('green') * highestCubes.get('blue'));
}

console.log(`Part1: ${sumOfIds}`);
console.log(`Part2: ${sumOfPowers}`);
