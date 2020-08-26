/* eslint-disable consistent-return */
/* eslint-disable no-multi-spaces */
import _ from 'lodash';

const getDifferences = (fileData1, fileData2) => {
  const keys = _.uniq(_.union(_.keys(fileData1), _.keys(fileData2))).sort();

  // eslint-disable-next-line array-callback-return
  const diff = keys.flatMap((key) => {
    const isAdded = _.has(fileData2, key) && !_.has(fileData1, key);
    const isDeleted = !_.has(fileData2, key) && _.has(fileData1, key);
    const isSaved = (fileData2[key] === fileData1[key]);
    const withChildren = (_.isObject(fileData1[key]) && _.isObject(fileData2[key]));
    const isUpdated = !isAdded && !isDeleted && !isSaved && !withChildren;

    if (withChildren) return [{ children: [key, getDifferences(fileData1[key], fileData2[key])] }];
    if (isAdded) return { added: [key, fileData2[key]] };
    if (isDeleted) return { deleted: [key, fileData1[key]] };
    if (isSaved) return { saved: [key, fileData2[key]] };
    if (isUpdated) {
      return { updated: [key, [{ added: fileData2[key] }, { deleted: fileData1[key] }]] };
    }
  });
  return diff;
};

export default getDifferences;
