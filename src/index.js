/* eslint-disable no-multi-spaces */
import _ from 'lodash';
import getData from './parsers.js';
import stylish from './formatter.js';

const getDiff = (data1, data2) => {
  const keys = _.uniq(_.union(_.keys(data1), _.keys(data2))).sort();
  const tree = (obj) => Object.entries(obj).reduce((acc, [key, value]) => [...acc,  `  ${key}: ${_.isObject(value)
    ? [`{${tree(value)}}`] : [`${value}`]}`], []);
  const diff = keys.reduce((acc, item) => {
    const zero = [`  ${item}: ${data1[item]}`].join(' ');
    const plus = [`+ ${item}: ${data2[item]}`].join(' ');
    const minus = [`- ${item}: ${data1[item]}`].join(' ');
    if (_.isObject(data1[item]) && _.isObject(data2[item])) {
      return [...acc, `  ${item}: {${getDiff(data1[item], data2[item])}}`];
    }

    if (_.has(data1, item) && _.has(data2, item)) {
      if (_.isObject(data1[item]) || _.isObject(data2[item])) {
        return _.isObject(data1[item]) ? [...acc, `- ${item}: {${tree(data1[item])}}`, plus]
          : [...acc, `+ ${item}: {${tree(data2[item])}}`, minus];
      }
      return [...acc, (data1[item] === data2[item] ? zero : [minus, plus])];
    }

    if (_.isObject(data1[item]) || _.isObject(data2[item])) {
      return _.isObject(data1[item]) ? [...acc, `- ${item}: {${tree(data1[item])}}`]
        : [...acc, `+ ${item}: {${tree(data2[item])}}`];
    }
    return [...acc, (_.has(data1, item) ? minus : plus)];
  }, []);
  const result = [diff.flat()].join('\n').split(',');
  return result;
};

const genDiff = (filepath1, filepath2) => stylish(getDiff(getData(filepath1), getData(filepath2)));

export default genDiff;
