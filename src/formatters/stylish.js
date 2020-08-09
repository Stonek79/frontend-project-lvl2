import _ from 'lodash';

const stylishFormatter = (diffs) => {
  const constructFormat = (data) => data.flatMap((dif) => {
    const difKey = _.keys(dif).toString();
    const [innerKey, innerValue] = dif[difKey];
    const tree = (obj) => Object.entries(obj).map(([key, value]) => `${'    '}${key}: ${_.isObject(value) ? [`{\n${tree(value)}\n  }`] : value}`);
    const getValue = (item) => (_.isObject(item) ? [`{\n${tree(item)}\n  }`] : item);

    switch (difKey) {
      case ('added'):
        return [`${'  + '}${innerKey}: ${getValue(innerValue)}`];
      case ('updated'):
        return [`${'  + '}${innerKey}: ${getValue(innerValue[0].added)}`, `${'  - '}${innerKey}: ${getValue(innerValue[1].delited)}`];
      case ('delited'):
        return [`${'  - '}${innerKey}: ${getValue(innerValue)}`];
      case ('saved'):
        return [`${'    '}${innerKey}: ${getValue(innerValue)}`];
      case ('children'):
        return [`${'    '}${innerKey}: {\n${constructFormat(innerValue)}\n  }`];
      default:
        return `${innerKey}: ${innerValue}`;
    }
  });
  const constructDiff = constructFormat(diffs);
  const result = constructDiff.map((element) => element.split(',').join('\n').split('\n'))
    .flatMap((item) => {
      let count = 0;
      const step = '  ';
      return item.reduce((acc, row) => {
        acc.push(`${step.repeat(count)}${row}`);
        if (row.includes('{')) count += 1;
        if (row.includes('}')) count -= 1;
        return acc;
      }, []);
    }).join('\n');
  return ['{', result, '}'].join('\n');
};

export default stylishFormatter;
