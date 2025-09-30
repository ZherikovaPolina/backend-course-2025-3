const { program } = require('commander');
const fs = require('fs');

program
  .option('-i, --input <file>', 'Input JSON file')
  .option('-o, --output <file>', 'Output file')
  .option('-d, --display', 'Display result in console')
  .option('-f, --furnished', 'Show only furnished houses')
  .option('-p, --price <number>', 'Show houses with price less than given', Number);

program.parse();

const options = program.opts();

if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

let data;
try {
  const raw = fs.readFileSync(options.input, 'utf8');
  data = JSON.parse(raw); 
} catch (err) {
  console.error("Cannot find input file");
  process.exit(1);
}

if (options.furnished) {
  data = data.filter(h => h.furnishingstatus === 'furnished');
}

if (options.price !== undefined) {
  data = data.filter(h => Number(h.price) < options.price);
}

const outputText = data.map(h => `${h.price} ${h.area}`).join('\n');

if (options.display) {
  console.log(outputText);
}

if (options.output) {
  fs.writeFileSync(options.output, outputText, 'utf8');
}