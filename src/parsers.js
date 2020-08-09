/* eslint-disable no-underscore-dangle */
import { fileURLToPath } from 'url';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parser = (filepath) => {
  const getPath = (filename) => path.resolve(__dirname, '..', '_fixtures_', filename);
  const filedata = fs.readFileSync(getPath(filepath), 'utf-8');
  const format = path.extname(filepath);

  const iniparser = (data) => {
    const iniobject = ini.parse(data);
    const stringToNumber = (str) => (Number.isInteger(parseInt(str, 10)) ? parseInt(str, 10) : str);
    const parse = (obj) => Object.entries(obj).reduce((acc, [key, value]) => {
      const newObj = { [key]: (_.isObject(value) ? parse(value) : stringToNumber(value)) };
      return { ...acc, ...newObj };
    }, {});
    return parse(iniobject);
  };

  let parse;
  switch (format) {
    case '.yml':
      parse = yaml.safeLoad;
      break;
    case '.ini':
      parse = iniparser;
      break;
    default:
      parse = JSON.parse;
  }
  return parse(filedata);
};

export default parser;
