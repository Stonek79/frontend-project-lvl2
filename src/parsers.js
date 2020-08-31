import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const jsonparser = JSON.parse;
const ymlparser = yaml.safeLoad;
const iniparser = (data) => {
  const objectFromIniFile = ini.parse(data);
  const stringToNumber = (str) => (Number.isInteger(parseInt(str, 10)) ? parseInt(str, 10) : str);
  const parse = (obj) => Object.entries(obj).reduce((acc, [key, value]) => {
    const newMakedObject = { [key]: (_.isObject(value) ? parse(value) : stringToNumber(value)) };
    return { ...acc, ...newMakedObject };
  }, {});
  return parse(objectFromIniFile);
};

const parsers = {
  '.yml': ymlparser,
  '.ini': iniparser,
  '.json': jsonparser,
};

export default (fileData, extention) => parsers[extention](fileData);
