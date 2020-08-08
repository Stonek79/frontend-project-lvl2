#!/usr/bin/env node

import program from 'commander';
import { createRequire } from 'module';
import genarateDifferences from '../src/index.js';

const require = createRequire(import.meta.url);
const { version, description } = require('../package.json');

program
  .version(version)
  .description(description)
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(genarateDifferences(filepath1, filepath2, program.format));
  });
program.parse(process.argv);
