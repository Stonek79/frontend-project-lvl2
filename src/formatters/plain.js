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
  updated: (keysPath, value) => [`Property '${keysPath.join('.')}' was updated. From ${makeOutputData(value.oldValue)} to ${makeOutputData(value.newValue)}`],
  added: (keysPath, value) => [`Property '${keysPath.join('.')}' was added with value: ${makeOutputData(value)}`],
  deleted: (keysPath) => [`Property '${keysPath.join('.')}' was removed`],
  nested: (keysPath, value, func) => func(value, keysPath),
  unchanged: () => [],
};

const makePlain = (diffs) => {
  const makePlainStructure = (data, path) => data
    .flatMap((item) => {
      const { type, key, ...actions } = item;
      const keysPath = [...path, key];
      const actionKey = Object.keys(actions);
      const action = typeActions[type];
      return action(keysPath, actions[actionKey], makePlainStructure);
    }).join('\n');
  return makePlainStructure(diffs, []);
};

export default makePlain;
