import _ from 'lodash';

const getDifferences = (parsedData1, parsedData2) => {
  const keys = _.union(_.keys(parsedData1), _.keys(parsedData2));
  const sortedKeys = _.sortBy(keys);
  const diff = sortedKeys.map((key) => {
    if (!_.has(parsedData2, key)) {
      return { type: 'deleted', key, value: parsedData1[key] };
    }
    if (!_.has(parsedData1, key)) {
      return { type: 'added', key, value: parsedData2[key] };
    }
    if (_.isObject(parsedData1[key]) && _.isObject(parsedData2[key])) {
      return { type: 'nested', key, children: getDifferences(parsedData1[key], parsedData2[key]) };
    }
    if (parsedData1[key] !== parsedData2[key]) {
      return {
        type: 'updated', key, newValue: parsedData2[key], oldValue: parsedData1[key],
      };
    }
    return { type: 'unchanged', key, value: parsedData2[key] };
  });
  return diff;
};

export default getDifferences;
