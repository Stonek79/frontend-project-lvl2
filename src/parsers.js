import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const isNumber = (data) => !Number.isNaN(parseFloat(data));

const makeCorrectValue = (obj) => _.mapValues(obj, (value) => {
  if (_.isObject(value)) {
    return makeCorrectValue(value);
  }
  return isNumber(value) ? parseFloat(value) : value;
});

const iniParse = (data) => {
  const objectFromIni = ini.parse(data);
  return makeCorrectValue(objectFromIni);
};

const parsers = {
  yml: yaml.safeLoad,
  ini: iniParse,
  json: JSON.parse,
};

export default (data, type) => parsers[type](data);
