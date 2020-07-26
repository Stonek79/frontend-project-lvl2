/* eslint-disable no-underscore-dangle */

import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('genDiff', () => {
  const getPath = (filename) => path.join(__dirname, '..', '_fixtures_', filename);
  const expectedFile = (fs.readFileSync(getPath('expected.json'), 'utf-8')).trim();
  const filepath1 = getPath('file1.json');
  const filepath2 = getPath('file2.json');

  expect(genDiff(filepath1, filepath2)).toBe(expectedFile);
});
