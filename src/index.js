/* eslint-disable no-multi-spaces */
/* eslint-disable no-underscore-dangle */

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import getParser from './parsers.js';
import getFormatter from './formatters/index.js';
import getDifferences from './getdifferenses.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getExtention = (filepath) => path.extname(filepath);
const getData = (filepath) => {
  const getPath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
  return fs.readFileSync(getPath(filepath), 'utf-8');
};

const genarateDifferences = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  const extention1 = getExtention(filepath1);
  const extention2 = getExtention(filepath2);

  const parser1 = getParser(extention1);
  const parser2 = getParser(extention2);

  const parsedData1 = parser1(data1);
  const parsedData2 = parser2(data2);

  const diff = getDifferences(parsedData1, parsedData2);
  const formatter = getFormatter(format);

  const result = formatter(diff);

  return result;
};

export default genarateDifferences;
