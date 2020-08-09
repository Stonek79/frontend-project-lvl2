import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';
import jsonsFormatter from './jsons.js';

const types = {
  stylish: stylishFormatter,
  plain: plainFormatter,
  json: jsonsFormatter,
};

const getFormatter = (data) => types[data];

export default getFormatter;
