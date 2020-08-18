/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const jsonparser = JSON.parse;
const ymlparser = yaml.safeLoad;
const iniparser = (data) => {
  const iniobject = ini.parse(data);
  const stringToNumber = (str) => (Number.isInteger(parseInt(str, 10)) ? parseInt(str, 10) : str);
  const parse = (obj) => Object.entries(obj).reduce((acc, [key, value]) => {
    const newObj = { [key]: (_.isObject(value) ? parse(value) : stringToNumber(value)) };
    return { ...acc, ...newObj };
  }, {});
  return parse(iniobject);
};

const parsers = {
  '.yml': ymlparser,
  '.ini': iniparser,
  '.json': jsonparser,
};

export default (extention) => parsers[extention];
