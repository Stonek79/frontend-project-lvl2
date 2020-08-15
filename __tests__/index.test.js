/* eslint-disable no-underscore-dangle */

import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genarateDifferences from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedResult = (fileName) => (fs.readFileSync(getPath(fileName), 'utf-8')).trim();

describe.each(['json', 'stylish', 'plain', ])('Test format -(%s)', (format) => {
  const expected = expectedResult(`${format}Fixtur.txt`);

  test.each(['.json', '.yml', '.ini'])('Test extention %s', (extention) => {
    const filePath1 = (`deepFile1${extention}`);
    const filePath2 = (`deepFile2${extention}`);
    
    expect(genarateDifferences(filePath1, filePath2, format)).toBe(expected);
  });
});

test.each(['.json', '.yml', '.ini'])('Test default format %s', (extention) => {
  const filePath1 = (`deepFile1${extention}`);
  const filePath2 = (`deepFile2${extention}`);
  const expected = expectedResult('stylishFixtur.txt');

  expect(genarateDifferences(filePath1, filePath2)).toBe(expected);
});
