import _ from 'lodash';

const plainFormatter = (diffs) => {
  const constructFormat = (data, mapKeys) => data.flatMap((dif) => {
    const formatedKey = _.keys(dif).toString();
    const [innerKey, innerValue] = dif[formatedKey];
    const keys = [...mapKeys, innerKey];
    const getTypeOfValue = (value) => {
      if (_.isObject(value)) return `${'[complex value]'}`;
      if (_.isString(value)) {
        return `'${value}'`;
      }
      return value;
    };

    switch (formatedKey) {
      case ('updated'):
        return [`Property '${keys.join('.')}' was updated. From ${getTypeOfValue(innerValue[1].delited)} to ${getTypeOfValue(innerValue[0].added)}`];
      case ('added'):
        return [`Property '${keys.join('.')}' was added with value: ${getTypeOfValue(innerValue)}`];
      case ('delited'):
        return [`Property '${keys.join('.')}' was removed`];
      case ('children'):
        return constructFormat(innerValue, keys);
      case ('saved'):
        return null;
      default:
        throw new Error(`Unknown format: ${formatedKey}!`);
    }
  }).join('\n');

  const result = constructFormat(diffs, []);
  return [...result.split('\n')].filter((item) => item !== '').join('\n');
};

export default plainFormatter;
