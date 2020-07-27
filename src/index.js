import getData from './parsers.js';
import getDiff from './getdiff.js';

const genDiff = (filepath1, filepath2) => {
  const filedata1 = getData(filepath1);
  const filedata2 = getData(filepath2);

  return getDiff(filedata1, filedata2);
};

export default genDiff;
