import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const formatType = {
  stylish: makeStylish,
  plain: makePlain,
  json: makeJson,
};

export default (format) => formatType[format];
