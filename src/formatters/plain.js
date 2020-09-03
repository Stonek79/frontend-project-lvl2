import _ from 'lodash';

const prepareOutputData = (value) => {
  if (_.isObject(value)) return `${'[complex value]'}`;
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const result = (data, path) => data.map(({
  type, key, value, children, oldValue, newValue,
}) => {
  const keysPath = [...path, key];

  switch (type) {
    case ('updated'):
      return [`Property '${keysPath.join('.')}' was updated. From ${prepareOutputData(oldValue)} to ${prepareOutputData(newValue)}`];
    case ('added'):
      return [`Property '${keysPath.join('.')}' was added with value: ${prepareOutputData(value)}`];
    case ('deleted'):
      return [`Property '${keysPath.join('.')}' was removed`];
    case ('nested'):
      return result(children, keysPath);
    case ('unchanged'):
      return null;
    default:
      throw new Error(`Unknown format: ${type}!`);
  }
}).flat()
  .filter((item) => item !== null).join('\n');

const makePlain = (diffs) => result(diffs, []);

export default makePlain;
