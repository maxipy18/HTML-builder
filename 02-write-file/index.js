const fs = require('fs');
const path = require('path');
const { stdout, stdin } = process;
const readLine = require('readline');
const output = fs.createWriteStream(
  path.join(__dirname, 'result.txt'),
  'utf-8',
);

stdout.write('Hello, please input your text: \n');

const rl = readLine.createInterface({
  input: stdin,
  output: stdout,
});

rl.on('line', (chunk) => {
  if (chunk === 'exit') process.exit();
  output.write(`${chunk}\n`);
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('Good luck learning Node.js!'));
