/* eslint-disable no-underscore-dangle */
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getData = (filepath) => {
  const getPath = (filename) => path.resolve(__dirname, '..', '_fixtures_', filename);
  const filedata = fs.readFileSync(getPath(filepath), 'utf-8');
  const format = path.extname(filepath);

  let parse;
  switch (format) {
    case '.yml':
      return yaml.safeLoad(filedata);
    case '.ini':
      return ini.parse(filedata);
    default:
      return JSON.parse(filedata);
  }
};
export default getData;
