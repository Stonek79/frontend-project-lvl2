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

test('genDiffJson', () => {
  const json = ['file1.json', 'file2.json'];
  expect(genDiff(...json)).toEqual(expectedFile);
});

test('genDiffYaml', () => {
  const yml = ['file1.yml', 'file2.yml'];
  expect(genDiff(...yml)).toEqual(expectedFile);
});
