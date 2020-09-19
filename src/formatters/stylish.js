import _ from 'lodash';

const indent = (x) => '    '.repeat(x);

const stringifyObject = (data, count, func) => {
  if (!_.isObject(data)) {
    return data;
  }
  const modified = Object
    .entries(data)
    .map(([key, value]) => func(count + 1, key, value, '    '));
  return ['{', ...modified, `${indent(count + 1)}}`]
    .join('\n');
};

const stringifyValue = (depth, key, value, sign) => `${indent(depth)}${sign}${key}: ${stringifyObject(value, depth, stringifyValue)}`;

const typeActions = {
  nested:
    (count, object, func) => stringifyValue(count, object.key, func(object.children, count + 1), '    '),
  updated:
    (count, object) => [
      stringifyValue(count, object.key, object.newValue, '  + '),
      stringifyValue(count, object.key, object.oldValue, '  - '),
    ],
  deleted:
    (count, object) => stringifyValue(count, object.key, object.value, '  - '),
  added:
    (count, object) => stringifyValue(count, object.key, object.value, '  + '),
  unchanged:
    (count, object) => stringifyValue(count, object.key, object.value, '    '),
};

const makeStylish = (diffs, depth) => {
  const modified = diffs
    .flatMap((item) => typeActions[item.type](depth, item, makeStylish));
  return ['{', ...modified, `${indent(depth)}}`]
    .join('\n');
};

export default (difference) => makeStylish(difference, 0);
