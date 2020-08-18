import _ from 'lodash';

const makePlain = (diffs) => {
  const makeFormat = (data, mapKeys) => data.flatMap((dif) => {
    const diffType = _.keys(dif).toString();
    const [innerKey, innerValue] = dif[diffType];
    const keys = [...mapKeys, innerKey];
    const getTypeOfValue = (value) => {
      if (_.isObject(value)) return `${'[complex value]'}`;
      if (_.isString(value)) {
        return `'${value}'`;
      }
      return value;
    };

    switch (diffType) {
      case ('updated'):
        return [`Property '${keys.join('.')}' was updated. From ${getTypeOfValue(innerValue[1].deleted)} to ${getTypeOfValue(innerValue[0].added)}`];
      case ('added'):
        return [`Property '${keys.join('.')}' was added with value: ${getTypeOfValue(innerValue)}`];
      case ('deleted'):
        return [`Property '${keys.join('.')}' was removed`];
      case ('children'):
        return makeFormat(innerValue, keys);
      case ('saved'):
        return null;
      default:
        throw new Error(`Unknown format: ${diffType}!`);
    }
  }).join('\n');

  const plain = makeFormat(diffs, []);
  const result = [...plain.split('\n')].filter((item) => item !== '').join('\n');
  return result;
};

export default makePlain;
