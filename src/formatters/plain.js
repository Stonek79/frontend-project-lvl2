import _ from 'lodash';

const prepareOutputData = (value) => {
  if (_.isObject(value)) {
    return `${'[complex value]'}`;
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const makePlainStructure = (data, path) => data.flatMap(({
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
      return makePlainStructure(children, keysPath);
    case ('unchanged'):
      return null;
    default:
      throw new Error(`Unknown format: ${type}!`);
  }
});

export default (diffs) => {
  const makePlain = makePlainStructure(diffs, []);
  const plainToString = makePlain.filter((item) => item !== null);
  return plainToString.join('\n');
};
