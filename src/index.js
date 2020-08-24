/* eslint-disable no-multi-spaces */
/* eslint-disable no-underscore-dangle */

import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import getFormatter from './formatters/index.js';
import getDifferences from './getdifferences.js';

const getDataForParse = (filepath) => {
  const extention = path.extname(filepath);
  const fileData = fs.readFileSync(filepath, 'utf-8');
  return [fileData, extention];
};

const generateDifferences = (filepath1, filepath2, format = 'stylish') => {
  const dataForParse1 = getDataForParse(filepath1);
  const dataForParse2 = getDataForParse(filepath2);

  const parsedData1 = parse(...dataForParse1);
  const parsedData2 = parse(...dataForParse2);

  const diff = getDifferences(parsedData1, parsedData2);
  const formatter = getFormatter(format);

  return formatter(diff);
};

export default generateDifferences;
