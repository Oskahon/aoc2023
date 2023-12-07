const fs = require('fs');

const file = 'test.txt';
const lines = fs.readFileSync(file, 'utf-8').split('\n');

function parseData(lines) {
    const hands = lines.map(line => {
        const data = line.split(/\s+/g);
        return {
            hand: data[0],
            bid: +data[1],
        };
    });

    return hands;
}

function sortHandsPart1(hand1, hand2) {
    const cardValues = new Map([
        ['2', 1],
        ['3', 2],
        ['4', 3],
        ['5', 4],
        ['6', 5],
        ['7', 6],
        ['8', 7],
        ['9', 8],
        ['T', 9],
        ['J', 10],
        ['Q', 11],
        ['K', 12],
        ['A', 13],
    ]);

    const handValue1 = countHandValuePart1(hand1);
    const handValue2 = countHandValuePart1(hand2);

    if (handValue1 < handValue2) {
        return -1;
    } else if (handValue1 > handValue2) {
        return 1;
    }

    for (let i = 0; i < hand1.hand.length; i++) {
        const card1Value = cardValues.get(hand1.hand[i]);
        const card2Value = cardValues.get(hand2.hand[i]);

        if (card1Value < card2Value) {
            return -1;
        } else if (card1Value > card2Value) {
            return 1;
        }
    }

    return 0;
}

function sortHandsPart2(hand1, hand2) {
    const cardValues = new Map([
        ['2', 2],
        ['3', 3],
        ['4', 4],
        ['5', 5],
        ['6', 6],
        ['7', 7],
        ['8', 8],
        ['9', 9],
        ['T', 10],
        ['J', 1],
        ['Q', 12],
        ['K', 13],
        ['A', 14],
    ]);

    const handValue1 = countHandValuePart2(hand1);
    const handValue2 = countHandValuePart2(hand2);

    if (handValue1 < handValue2) {
        return -1;
    } else if (handValue1 > handValue2) {
        return 1;
    }

    for (let i = 0; i < hand1.hand.length; i++) {
        const card1Value = cardValues.get(hand1.hand[i]);
        const card2Value = cardValues.get(hand2.hand[i]);

        if (card1Value < card2Value) {
            return -1;
        } else if (card1Value > card2Value) {
            return 1;
        }
    }

    return 0;
}


function countHandValuePart2(hand) {
    const countUniques = Array.from(hand.hand)
        .reduce((acc, card) => (acc.has(card) ? acc.set(card, acc.get(card) + 1) : acc.set(card, 1)), new Map());

    let points = 0;

    // Ei osaa viel muuttaa J muiksi korteiksi

    for (const [card, count] of countUniques.entries()) {
        // jos kortti ei J lisaa J count
        // pitaa rajoittaa miten monta j:ta voi lisata? esim jos kaksi paria ja j ei kaksi triplaa kay jarkeen...
        // Vahennetaan else haarassa J verran pisteita
        // Korjaa pisteytys
        // keraa kaikki pisteet listaan ja ota sielta kaksi isointa? 
        if (count === 2) {
            if (card === 'J') {
                points += 1;
            } else {
                points += 2;
            }
        } else if (count === 3) {
            if (card === 'J') {
                points += 5;
            } else {
                points += 6;
            }
        } else if (count === 4) {
            if (card === 'J') {
                points += 9;
            } else {
                points += 10;
            }
        } else if (count === 5) {
            if (card === 'J') {
                points += 11;
            } else {
                points += 12;
            }
        }
    }

    return points;
}

function countHandValuePart1(hand) {
    const countUniques = Array.from(hand.hand)
        .reduce((acc, card) => (acc.has(card) ? acc.set(card, acc.get(card) + 1) : acc.set(card, 1)), new Map());

    let points = 0;

    for (const card of countUniques.values()) {
        if (card === 2) {
            points += 1;
        } else if (card === 3) {
            points += 3;
        } else if (card === 4) {
            points += 5;
        } else if (card === 5) {
            points += 6;
        }
    }

    return points;
}

function calculatePoints(hands) {
    let points = 0;

    for (let i = 0; i < hands.length; i++) {
        points += (i + 1) * hands[i].bid;
    }

    return points;
}

function part1(hands) {
    const handsSorted = [...hands].sort(sortHandsPart1);
    const points = calculatePoints(handsSorted);

    console.log(`Part1: ${points}`);
}

function part2(hands) {
    const handsSorted = [...hands].sort(sortHandsPart2);
    console.log(handsSorted);
    const points = calculatePoints(handsSorted);

    console.log(`Part2: ${points}`);
}

const hands = parseData(lines);

// part1(hands);
part2(hands);