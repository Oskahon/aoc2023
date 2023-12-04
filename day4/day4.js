const fs = require('fs');

const file = 'data.txt';
const lines = fs.readFileSync(file, 'utf-8').trim().split('\n');

function parseData(lines) {
    const allGames = [];

    lines.forEach(line => {
        const [gameNumber, data] = line.trim().split(':');
        const [winningNumbers, yourNumbers] = data.trim().split('|');

        const game = {
            gameId: Number(gameNumber.trim().split(/\s+/g)[1]),
            winningNumbers: winningNumbers.trim().split(/\s+/g).map(num => Number(num)),
            yourNumbers: yourNumbers.trim().split(/\s+/g).map(num => Number(num)),

        };

        allGames.push(game);
    });

    return allGames;
}

function findWinningNumbers(game) {
    return game.yourNumbers.filter(num => game.winningNumbers.includes(num));
}

function countStartingCards(games) {
    const countOfCards = new Map();

    games.forEach(game => {
        countOfCards.set(game.gameId, 1);
    });

    return countOfCards;
}

function part1(games) {
    let sumOfPoints = 0;

    games.forEach(game => {
        const winningNumbers = findWinningNumbers(game);

        if (winningNumbers.length > 0) {
            sumOfPoints += 2 ** (winningNumbers.length - 1);
        }
    });

    console.log(`Part1: ${sumOfPoints}`);
}

function part2(games) {
    const countOfCards = countStartingCards(games);

    games.forEach(game => {
        const numberOfCopies = countOfCards.get(game.gameId);
        const amountOfWins = findWinningNumbers(game).length;

        let startingId = game.gameId + 1;
        for (let i = startingId; i < (startingId + amountOfWins); i++) {
            if (countOfCards.has(i)) {
                countOfCards.set(i, (countOfCards.get(i) + numberOfCopies));
            }
        }
    });

    const sumOfCards = Array.from(countOfCards.values()).reduce((sum, value) => sum += value);

    console.log(`Part2: ${sumOfCards}`);
}

const games = parseData(lines);

part1(games);
part2(games);