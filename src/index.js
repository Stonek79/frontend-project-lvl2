/* eslint-disable no-multi-spaces */
import _ from 'lodash';
import parser from './parsers.js';
import getFormatter from './formatters/index.js';

const getDifferences = (fileData1, fileData2) => {
  const keys = _.uniq(_.union(_.keys(fileData1), _.keys(fileData2))).sort();
  return keys.flatMap((key) => {
    const added = _.has(fileData2, key) && !_.has(fileData1, key);
    const delited = !_.has(fileData2, key) && _.has(fileData1, key);
    const saved = (fileData2[key] === fileData1[key]);

    if (_.isObject(fileData1[key]) && _.isObject(fileData2[key])) {
      return [{ save: [key, getDifferences(fileData1[key], fileData2[key])] }];
    }
    if (added) return { add: [key, fileData2[key]] };
    if (delited) return { del: [key, fileData1[key]] };
    if (saved) {
      return { save: [key, fileData2[key]] };
    }
    return { update: [key, [fileData2[key], fileData1[key]]] };
  });
};

const genarateDifferences = (filepath1, filepath2, format = 'stylish') => {
  const diff = getDifferences(parser(filepath1), parser(filepath2));
  const formatter = getFormatter(format);
  return formatter(diff);
};

export default genarateDifferences;
