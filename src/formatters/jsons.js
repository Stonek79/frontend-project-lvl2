const makeJson = (data) => JSON.stringify(data);

export default makeJson;

// альтернативный вариант форматтера JSON
// const addAttributes = (dif) => dif.reduce((acc, {
//   type, key, children, ...values
// }) => [...acc, { [type]: { [key]: type === 'nested' ? addAttributes(children) : values } }], []);

// const makeJson = (data) => JSON.stringify(addAttributes(data));
