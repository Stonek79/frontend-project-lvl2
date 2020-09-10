import _ from 'lodash';

const step = '    ';
const indent = (x) => step.repeat(x);

const sings = {
  plus: '  + ',
  minus: '  - ',
  tab: '    ',
};

const transformObject = (obj, count) => Object.entries(obj)
  .map(([key, value]) => {
    if (_.isObject(value)) {
      return `${indent(count)}${key}: {\n${transformObject(value, count + 1)}\n${indent(count)}}`;
    }
    return `${indent(count)}${key}: ${value}`;
  }).join('\n');

const transformValue = (data, count) => {
  if (_.isObject(data)) {
    return `{\n${transformObject(data, count + 2)}\n${indent(count + 1)}}`;
  }
  return data;
};

const typeActions = {
  nested: (key, count, value, func) => `${indent(count)}${sings.tab}${key}: {\n${func(value, count + 1)}\n${indent(count + 1)}}`,
  updated: (key, count, value) => {
    const newValue = `${indent(count)}${sings.plus}${key}: ${transformValue(value.newValue, count)}`;
    const oldValue = `${indent(count)}${sings.minus}${key}: ${transformValue(value.oldValue, count)}`;
    return `${newValue}\n${oldValue}`;
  },
  deleted: (key, count, value) => `${indent(count)}${sings.minus}${key}: ${transformValue(value, count)}`,
  added: (key, count, value) => `${indent(count)}${sings.plus}${key}: ${transformValue(value, count)}`,
  unchanged: (key, count, value) => `${indent(count)}${sings.tab}${key}: ${transformValue(value, count)}`,
};

const makeStylish = (diffs) => {
  const getResult = (dif, count) => dif.map((item) => {
    const { type, key, ...actions } = item;
    const actionKey = Object.keys(actions);
    const action = typeActions[type];
    return action(key, count, actions[actionKey], getResult);
  });
  return `{\n${getResult(diffs, 0)}\n}`.split(',').join('\n');
};

export default makeStylish;
