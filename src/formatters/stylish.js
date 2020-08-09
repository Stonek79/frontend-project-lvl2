import _ from 'lodash';

const stylishFormatter = (diffs) => {
  const constructFormat = (data) => data.flatMap((dif) => {
    const difKey = _.keys(dif).toString();
    const [innerKey, innerValue] = dif[difKey];
    const tree = (obj) => Object.entries(obj).map(([key, value]) => `${'    '}${key}: ${_.isObject(value) ? [`{\n${tree(value)}\n  }`] : value}`);
    const getValue = (item) => (_.isObject(item) ? [`{\n${tree(item)}\n  }`] : item);
    const addedValue = (value) => (_.isArray(value) ? [`{\n${constructFormat(value)}\n  }`] : getValue(value));
    switch (difKey) {
      case ('added'):
        return [`${'  + '}${innerKey}: ${addedValue(innerValue)}`];
      case ('updated'):
        return [`${'  + '}${innerKey}: ${addedValue(innerValue[0].added)}`, `${'  - '}${innerKey}: ${addedValue(innerValue[1].delited)}`];
      case ('delited'):
        return [`${'  - '}${innerKey}: ${addedValue(innerValue)}`];
      case ('saved'):
        return [`${'    '}${innerKey}: ${addedValue(innerValue)}`];
      default:
        return `${innerKey}: ${innerValue}`;
    }
  }).join('\n')
    .split('\n').join(',')
    .split(',');
  const step = '  ';
  let count = 0;
  const getCount = (data) => {
    if (data.includes('{')) {
      count += 1;
      return count;
    }
    if (data.includes('}')) {
      count -= 1;
      return count;
    }
    return count;
  };
  const result = constructFormat(diffs).reduce((acc, item) => {
    acc.push(`${step.repeat(count)}${item}`);
    getCount(item);
    return acc;
  }, []).join('\n');
  return ['{', result, '}'].join('\n');
};

export default stylishFormatter;
