/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const iniparser = (data) => {
  const iniobject = ini.parse(data);
  const stringToNumber = (str) => (Number.isInteger(parseInt(str, 10)) ? parseInt(str, 10) : str);
  const parse = (obj) => Object.entries(obj).reduce((acc, [key, value]) => {
    const newObj = { [key]: (_.isObject(value) ? parse(value) : stringToNumber(value)) };
    return { ...acc, ...newObj };
  }, {});
  return parse(iniobject);
};

const parser = ([filedata, format]) => {
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
