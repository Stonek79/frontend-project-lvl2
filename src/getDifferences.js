import _ from 'lodash';

const getDifferences = (fileData1, fileData2) => {
  const keys = _.union(_.keys(fileData1), _.keys(fileData2)).sort();
  const diff = keys.map((key) => {
    if (!_.has(fileData2, key)) {
      return { type: 'deleted', key, value: fileData1[key] };
    }
    if (!_.has(fileData1, key)) {
      return { type: 'added', key, value: fileData2[key] };
    }
    if (_.isObject(fileData1[key]) && _.isObject(fileData2[key])) {
      return { type: 'children', key, value: getDifferences(fileData1[key], fileData2[key]) };
    }
    if (fileData1[key] !== fileData2[key]) {
      return { type: 'updated', key, value: [fileData2[key], fileData1[key]] };
    }
    return { type: 'saved', key, value: fileData2[key] };
  });
  return diff;
};

export default getDifferences;
