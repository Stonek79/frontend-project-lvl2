import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const iniparser = (data) => {
  const objectFromIni = ini.parse(data);
  const convertToNumber = (str) => {
    if (Number(str) && !_.isBoolean(str)) {
      return Number(str);
    }
    return str;
  };

  const parse = (obj) => _.mapValues(obj, (value) => (_.isObject(value)
    ? parse(value) : convertToNumber(value)));

  return parse(objectFromIni);
};

const parsers = {
  '.yml': yaml.safeLoad,
  '.ini': iniparser,
  '.json': JSON.parse,
};

export default (fileData, extention) => parsers[extention](fileData);
