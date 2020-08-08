/* eslint-disable no-underscore-dangle */

import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genarateDifferences from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getPath = (filename) => path.join(__dirname, '..', '_fixtures_', filename);
const expectedFile = (file) => (fs.readFileSync(getPath(file), 'utf-8')).trim();

test.each([
  ['deepFile1.json', 'deepFile2.json', expectedFile('plainFixtur.json')],
  ['deepFile1.yml', 'deepFile2.yml', expectedFile('plainFixtur.json')],
  ['deepFile1.ini', 'deepFile2.ini', expectedFile('plainFixtur.json')],
])('.add(%s, %s)', (a, b, expected) => {
  expect(genarateDifferences(a, b, 'plain')).toBe(expected);
});

test.each([
  ['deepFile1.json', 'deepFile2.json', expectedFile('stylishFixtur.json')],
  ['deepFile1.yml', 'deepFile2.yml', expectedFile('stylishFixtur.json')],
  ['deepFile1.ini', 'deepFile2.ini', expectedFile('stylishFixtur.json')],
])('.add(%s, %s)', (a, b, expected) => {
  expect(genarateDifferences(a, b)).toBe(expected);
});
