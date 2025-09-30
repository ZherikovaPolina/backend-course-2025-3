const { program } = require('commander');
const fs = require('fs');

program
  .option('-i, --input <file>', 'Input JSON file')
  .option('-o, --output <file>', 'Output file')
  .option('-d, --display', 'Display result in console');

program.parse();

const options = program.opts();

if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

let data;
try {
  data = fs.readFileSync(options.input, 'utf8');
} catch (err) {
  console.error("Cannot find input file");
  process.exit(1);
}

if (options.display) {
  console.log(data);
}

if (options.output) {
  fs.writeFileSync(options.output, data, 'utf8');
}