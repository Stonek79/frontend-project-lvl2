import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';

const types = {
  stylish: stylishFormatter,
  plain: plainFormatter,
};

const getFormatter = (data) => types[data];

export default getFormatter;
