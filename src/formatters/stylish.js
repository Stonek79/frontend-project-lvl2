import _ from 'lodash';

const makeStylish = (diffs) => {
  const getPlainFormat = (data) => data.flatMap((dif) => {
    const diffType = _.keys(dif).toString();
    const [innerKey, innerValue] = dif[diffType];
    const makeDiffTree = (obj) => Object.entries(obj)
      .map(([key, value]) => `${'    '}${key}: ${_.isObject(value) ? [`{\n${makeDiffTree(value)}\n}`] : value}`);
    const getValue = (item) => (_.isObject(item) ? [`{\n${makeDiffTree(item)}\n}`] : item);

    switch (diffType) {
      case ('added'):
        return [`${'  + '}${innerKey}: ${getValue(innerValue)}`];
      case ('updated'):
        return [`${'  + '}${innerKey}: ${getValue(innerValue[0].added)}`, `${'  - '}${innerKey}: ${getValue(innerValue[1].deleted)}`];
      case ('deleted'):
        return [`${'  - '}${innerKey}: ${getValue(innerValue)}`];
      case ('saved'):
        return [`${'    '}${innerKey}: ${getValue(innerValue)}`];
      case ('children'):
        return [`${'    '}${innerKey}: {\n${getPlainFormat(innerValue)}\n}`];
      default:
        throw new Error(`Unknown format: ${diffType}!`);
    }
  });
  const plainStylish = getPlainFormat(diffs);
  const finalStylish = plainStylish.map((element) => element.split(',').join('\n').split('\n'))
    .flatMap((item) => {
      let count = 0;
      const step = '    ';
      return item.reduce((acc, row) => {
        acc.push(`${step.repeat(count)}${row}`);
        if (row.includes('{')) count += 1;
        if (row.includes('}')) count -= 1;
        return acc;
      }, []);
    }).join('\n');
  const result = ['{', finalStylish, '}'].join('\n');
  return result;
};

export default makeStylish;
