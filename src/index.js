/* eslint-disable no-multi-spaces */
/* eslint-disable no-underscore-dangle */

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import parser from './parsers.js';
import getFormatter from './formatters/index.js';
import getDifferences from './getdifferenses.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getData = (filepath) => {
  const getPath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
  const filedata = fs.readFileSync(getPath(filepath), 'utf-8');
  const extention = path.extname(filepath);
  return [filedata, extention];
};

const genarateDifferences = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const parsedData1 = parser(data1);
  const parsedData2 = parser(data2);
  const diff = getDifferences(parsedData1, parsedData2);
  const formatter = getFormatter(format);
  return formatter(diff);
};

export default genarateDifferences;
