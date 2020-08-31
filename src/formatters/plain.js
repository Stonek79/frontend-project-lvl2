import _ from 'lodash';

const getTypeOfValue = (value) => {
  if (_.isObject(value)) return `${'[complex value]'}`;
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const makePlain = (diffs, path = []) => diffs.map(({ type, key, value }) => {
  const keysPath = [...path, key];

  switch (type) {
    case ('updated'):
      return [`Property '${keysPath.join('.')}' was updated. From ${getTypeOfValue(value[1])} to ${getTypeOfValue(value[0])}`];
    case ('added'):
      return [`Property '${keysPath.join('.')}' was added with value: ${getTypeOfValue(value)}`];
    case ('deleted'):
      return [`Property '${keysPath.join('.')}' was removed`];
    case ('children'):
      return makePlain(value, keysPath);
    case ('saved'):
      return null;
    default:
      throw new Error(`Unknown format: ${type}!`);
  }
}).flat()
  .filter((item) => item !== null).join('\n');

export default makePlain;
