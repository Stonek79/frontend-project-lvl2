/*global process */

import { createRequire } from 'module';
import program from 'commander';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import _ from 'lodash';

const require = createRequire(import.meta.url);
const { version, description } = require('../package.json');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const genDiff = () => {
  program
    .version(version)
    .description(description)
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1>')
    .arguments('<filepath2>')
    .action( (filepath1, filepath2) => {
      const paths = (filename) => path.resolve(__dirname, '..', '_JSONS_', filename);
      const filedata1 = JSON.parse(fs.readFileSync(paths(filepath1), 'utf-8'));
      const filedata2 = JSON.parse(fs.readFileSync(paths(filepath2), 'utf-8'));
      const entries = (obj) => Object.entries(obj);
      const filesDiff = entries(filedata1)
        .reduce((acc, [key, value]) => {
          return (!_.has(filedata2, key)) ? acc.concat([`  - ${key}: ${value}`]) :
          (filedata2[key] === value ? acc.concat([`    ${key}: ${value}`]) :
             acc.concat([`  - ${key}: ${value}`], [`  + ${key}: ${filedata2[key]}`]));
        }, []);

        const resultDiff = entries(filedata2)
          .reduce((acc, [key, value]) => !_.has(filedata1, key) ?
            acc.concat(`  + ${key}: ${value}`) : acc, filesDiff);

        console.log(['{', ...resultDiff, '}'].join('\n'));
    })

  program.parse(process.argv);
};
export default genDiff;
