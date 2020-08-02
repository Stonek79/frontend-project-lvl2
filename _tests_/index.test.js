/* eslint-disable no-underscore-dangle */

import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getPath = (filename) => path.join(__dirname, '..', '_fixtures_', filename);
const expectedFile = (fs.readFileSync(getPath('deepExpected.json'), 'utf-8')).trim();

test.each([
  ['deepFile1.json', 'deepFile2.json', expectedFile],
  ['deepFile1.yml', 'deepFile2.yml', expectedFile],
  ['deepFile1.ini', 'deepFile2.ini', expectedFile],
])('.add(%s, %s)', (a, b, expected) => {
  expect(genDiff(a, b)).toBe(expected);
});
