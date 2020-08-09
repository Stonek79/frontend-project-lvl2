/* eslint-disable no-multi-spaces */
import _ from 'lodash';
import parser from './parsers.js';
import getFormatter from './formatters/index.js';

const getDifferences = (fileData1, fileData2) => {
  const keys = _.uniq(_.union(_.keys(fileData1), _.keys(fileData2))).sort();
  const result = keys.flatMap((key) => {
    const add = _.has(fileData2, key) && !_.has(fileData1, key);
    const delite = !_.has(fileData2, key) && _.has(fileData1, key);
    const save = (fileData2[key] === fileData1[key]);

    if (_.isObject(fileData1[key]) && _.isObject(fileData2[key])) {
      return [{ children: [key, getDifferences(fileData1[key], fileData2[key])] }];
    }
    if (add) return { added: [key, fileData2[key]] };
    if (delite) return { delited: [key, fileData1[key]] };
    if (save) {
      return { saved: [key, fileData2[key]] };
    }
    return { updated: [key, [{ added: fileData2[key] }, { delited: fileData1[key] }]] };
  });
  // console.log(result);
  return result;
};

const genarateDifferences = (filepath1, filepath2, format = 'stylish') => {
  const diff = getDifferences(parser(filepath1), parser(filepath2));
  const formatter = getFormatter(format);
  return formatter(diff);
};

export default genarateDifferences;
