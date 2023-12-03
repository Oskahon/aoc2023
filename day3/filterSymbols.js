const fs = require('fs');

const file = 'data.txt';
const lines = fs.readFileSync(file, 'utf-8').replace(/\n/g, '');

const nonSymbols = '0123456789.';

const uniques = new Set(lines);
const symbols = Array.from(uniques).filter(c => !nonSymbols.includes(c)).join('');

console.log(symbols);