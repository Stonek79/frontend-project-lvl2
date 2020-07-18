#!/usr/bin/env node

import program from 'commander';

//import { version, description } from '../package.json';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { version, description } = require('../package.json');

program
  .version(version)
  .description(description);

program.parse(process.argv);
