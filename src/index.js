/* eslint-disable no-underscore-dangle */

import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const genDiff = (filepath1, filepath2) => {
  const getPath = (filename) => path.resolve(__dirname, '..', '_fixtures_', filename);
  const filedata1 = JSON.parse(fs.readFileSync(getPath(filepath1), 'utf-8'));
  const filedata2 = JSON.parse(fs.readFileSync(getPath(filepath2), 'utf-8'));
  const getEntries = (obj) => Object.entries(obj);
  const filedata1Diff = getEntries(filedata1)
    .reduce((acc, [key, value]) => {
      if (!_.has(filedata2, key)) return [...acc, `  - ${key}: ${value}`];
      if (filedata2[key] === value) {
        return [...acc, `    ${key}: ${value}`];
      }
      return [...acc, `  - ${key}: ${value}`, `  + ${key}: ${filedata2[key]}`];
    }, []);
  const filedata2Diff = getEntries(filedata2)
    .reduce((acc, [key, value]) => (!_.has(filedata1, key) ? [...acc, `  + ${key}: ${value}`]
      : [...acc]), filedata1Diff);
  const result = ['{', ...filedata2Diff, '}'].join('\n');

  return result;
};

export default genDiff;
