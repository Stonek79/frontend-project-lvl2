import _ from 'lodash';

const attributes = {
  deleted: '- ',
  added: '+ ',
  nested: '  ',
  updated: '  ',
  unchanged: '  ',
};
const indent = (x) => '  '.repeat(x);

const transformObject = (obj, count) => Object.entries(obj)
  .map(([key, value]) => (_.isObject(value)
    ? `${indent(count + 1)}${key}: {\n${transformObject(value, count + 2)}\n${indent(count + 1)}}`
    : `${indent(count + 1)}${key}: ${value}`));

const transformValue = (data, count) => (!_.isObject(data)
  ? data : `{\n${transformObject(data, count + 2)}\n${indent(count + 1)}}`);

const addAttributes = (dif, count) => dif.map(({
  type, key, value, children, oldValue, newValue,
}) => {
  switch (type) {
    case 'nested':
      return `${indent(count)}${attributes[type]}${key}: {\n${addAttributes(children, count + 2)}\n${indent(count + 1)}}`;
    case 'updated':
      return `${indent(count)}${attributes.added}${key}: ${transformValue(newValue, count)}\n${indent(count)}${attributes.deleted}${key}: ${transformValue(oldValue, count)}`;
    case 'deleted':
    case 'added':
    case 'unchanged':
      return `${indent(count)}${attributes[type]}${key}: ${transformValue(value, count)}`;
    default:
      throw new Error(`Unknown format: ${type}!`);
  }
});

const makeStylish = (diffs) => {
  const stylish = addAttributes(diffs, 1);
  return ['{\n', stylish, '\n}']
    .join('')
    .split(',')
    .join('\n');
};

export default makeStylish;
