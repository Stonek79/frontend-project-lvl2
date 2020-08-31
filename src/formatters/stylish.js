import _ from 'lodash';

const attributes = {
  deleted: '  - ',
  added: '  + ',
  children: '    ',
  saved: '    ',
};
const step = '    ';
const makeStringFromObject = (obj) => [...JSON.stringify(obj, null, step)]
  .map((litera) => (litera === '}' ? `${step}${litera}` : litera))
  .filter((elem) => elem !== '"' && elem !== ',').join('').split('\n')
  .map((row) => row.slice(step.length))
  .join('\n');

const addAttributesToObject = (data) => (!_.isObject(data) ? data : Object.entries(data)
  .reduce((acc, [key, value]) => (_.isObject(value) ? { ...acc, [`${step}${key}`]: addAttributesToObject(value) }
    : { ...acc, [`${step}${key}`]: value }), {}));

const addAttributes = (dif) => dif.reduce((acc, { type, key, value }) => {
  switch (type) {
    case 'children':
      return { ...acc, [`${attributes[type]}${key}`]: addAttributes(value) };
    case 'updated':
      return {
        ...acc,
        [`${attributes.added}${key}`]: addAttributesToObject(value[0]),
        [`${attributes.deleted}${key}`]: addAttributesToObject(value[1]),
      };
    default:
      return { ...acc, [`${attributes[type]}${key}`]: addAttributesToObject(value) };
  }
}, []);

const makeStylish = (diffs) => {
  const attributed = addAttributes(diffs);
  return ['{', makeStringFromObject(attributed)].join('');
};

export default makeStylish;
