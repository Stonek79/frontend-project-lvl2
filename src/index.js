import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import getFormatter from './formatters/index.js';
import getDifferences from './getDifferences.js';

const getParsedData = (filepath) => {
  const extention = path.extname(filepath);
  const fileData = fs.readFileSync(filepath, 'utf-8');
  return parse(fileData, extention);
};

const generateDifferences = (filepath1, filepath2, format = 'stylish') => {
  const parsedData1 = getParsedData(filepath1);
  const parsedData2 = getParsedData(filepath2);

  const diff = getDifferences(parsedData1, parsedData2);
  const makeFormat = getFormatter(format);

  return makeFormat(diff);
};

export default generateDifferences;
