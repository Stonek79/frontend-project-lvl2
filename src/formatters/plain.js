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
    const tree = (obj) => Object.values(obj).map((objValue) => `${_.isObject(objValue) ? `${tree(objValue)}` : objValue}`);
    const getValue = (item) => (_.isObject(item) ? `${tree(item)}` : item);
    const returnedValue = (value) => (_.isArray(value) ? `${constructFormat(value, keys)}` : getValue(value));
    const delited = getTypeOfValue(innerValue[1]);
    const added = getTypeOfValue(innerValue[0]);

    switch (formatedKey) {
      case ('update'):
        return [`Property '${keys.join('.')}' was updated. From ${delited} to ${added}`];
      case ('add'):
        return [`Property '${keys.join('.')}' was added with value: ${getTypeOfValue(innerValue)}`];
      case ('del'):
        return [`Property '${keys.join('.')}' was removed`];
      default:
        if (_.isObject(innerValue)) {
          return returnedValue(innerValue);
        }
        return null;
    }
  }).join('\n');

  const result = constructFormat(diffs, []);
  return [...result.split('\n')].filter((item) => item !== '').join('\n');
};

export default plainFormatter;
