import getData from './parsers.js';
import _ from 'lodash';

const getDiff = (data1, data2) => {
  const getEntries = (obj) => Object.entries(obj);
  const data1Diff = getEntries(data1)
    .reduce((acc, [key, value]) => {
      if (!_.has(data2, key)) return [...acc, `  - ${key}: ${value}`];
      if (data2[key] === value) {
        return [...acc, `    ${key}: ${value}`];
      }
      return [...acc, `  - ${key}: ${value}`, `  + ${key}: ${data2[key]}`];
    }, []);
  const data2Diff = getEntries(data2)
    .reduce((acc, [key, value]) => (!_.has(data1, key) ? [...acc, `  + ${key}: ${value}`]
      : [...acc]), data1Diff);
  const result = ['{', ...data2Diff, '}'].join('\n');

  return result;
};

const genDiff = (filepath1, filepath2) => {
  return getDiff(getData(filepath1), getData(filepath2));
};

export default genDiff;
