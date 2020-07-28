/* eslint-disable no-underscore-dangle */

import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getPath = (filename) => path.join(__dirname, '..', '_fixtures_', filename);
const expectedFile = (fs.readFileSync(getPath('expected.json'), 'utf-8')).trim();

test.each([
  ['file1.json', 'file2.json', expectedFile],
  ['file1.yml', 'file2.yml', expectedFile],
  ['file1.ini', 'file2.ini', expectedFile],
])('.add(%s, %s)', (a, b, expected) => {
  expect(genDiff(a, b)).toBe(expected);
});
