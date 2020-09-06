import _ from 'lodash';

const indent = (x) => '  '.repeat(x);

const transformValue = (data, count) => {
  const transformObject = (obj, indentCount) => Object.entries(obj).map((item) => {
    const [key, value] = item;
    const offset = indent(indentCount + 1);
    const getTransformed = (innerValue) => `${offset}${key}: {\n${transformObject(innerValue, indentCount + 2)}\n${offset}}`;
    return _.isObject(value) ? getTransformed(value) : `${offset}${item}`;
  }).join('\n');

  return _.isObject(data) ? `{\n${transformObject(data, count + 2)}\n${indent(count + 1)}}` : data;
};

const makeStylish = (dif, count) => dif.map(({
  type, key, value, children, oldValue, newValue,
}) => {
  switch (type) {
    case 'nested':
      return `${indent(count)}${'  '}${key}: {\n${makeStylish(children, count + 2)}\n${indent(count + 1)}}`;
    case 'updated': {
      const updatedNew = `${indent(count)}${'+ '}${key}: ${transformValue(newValue, count)}`;
      const updatedOld = `${indent(count)}${'- '}${key}: ${transformValue(oldValue, count)}`;
      return `${updatedNew}\n${updatedOld}`;
    }
    case 'deleted':
      return `${indent(count)}${'- '}${key}: ${transformValue(value, count)}`;
    case 'added':
      return `${indent(count)}${'+ '}${key}: ${transformValue(value, count)}`;
    case 'unchanged':
      return `${indent(count)}${'  '}${key}: ${transformValue(value, count)}`;
    default:
      throw new Error(`Unknown format: ${type}!`);
  }
}).join('\n');

export default (diffs) => {
  const stylish = makeStylish(diffs, 1).split(',');
  return [`{\n${stylish}\n}`]
    .join('\n');
};
