#!/usr/bin/env node

import path from 'path';
import program from 'commander';
import { createRequire } from 'module';
import generateDifferences from '../src/index.js';

const require = createRequire(import.meta.url);
const { version, description } = require('../package.json');

const getFullPath = (filename) => path.resolve(process.cwd(), filename);

program
  .version(version)
  .description(description)
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath, filepath2) => {
    console.log(generateDifferences(getFullPath(filepath), getFullPath(filepath2), program.format));
  });
program.parse(process.argv);
