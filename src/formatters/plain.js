import _ from 'lodash';

const makeOutputData = (value) => {
  if (_.isObject(value)) {
    return `${'[complex value]'}`;
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};
const typeActions = {
  updated:
    (keysPath, object) => [`Property '${keysPath.join('.')}' was updated. From ${makeOutputData(object.oldValue)} to ${makeOutputData(object.newValue)}`],
  added:
    (keysPath, object) => [`Property '${keysPath.join('.')}' was added with value: ${makeOutputData(object.value)}`],
  deleted:
    (keysPath) => [`Property '${keysPath.join('.')}' was removed`],
  nested:
    (keysPath, object, func) => func(object.children, keysPath),
  unchanged:
    () => [],
};

const makePlain = (diffs) => {
  const makePlainStructure = (data, path) => data
    .flatMap((item) => {
      const { type, key } = item;
      const keysPath = [...path, key];
      return typeActions[type](keysPath, item, makePlainStructure);
    }).join('\n');
  return makePlainStructure(diffs, []);
};

export default makePlain;
