const addAttributes = (dif) => dif.map(({ type, key, value }) => {
  switch (type) {
    case 'children':
      return { [`${key}`]: addAttributes(value) };
    case 'updated':
      return { [`${type}`]: [{ [`${key}`]: value[0] }, { [`${key}`]: value[1] }] };
    default:
      return { [`${type}`]: { [`${key}`]: value } };
  }
});
const makeJson = (data) => JSON.stringify(addAttributes(data));

export default makeJson;
