const stylish = (dif) => {
  let count = 1;
  const step = '    ';
  const addStep = (data) => [...data].map((litera) => {
    if (litera === '}') {
      count -= 1;
      return `\n${step.repeat(count)}  ${litera}`;
    }
    if (litera === '{') {
      count += 1;
      return `${litera}\n${step.repeat(count)}`;
    }
    return litera;
  }).join('');
  const result = dif.map((string) => `${step.repeat(count)}${addStep(string)}`).join('\n');
  return ['{', result, '}'].join('\n');
};

export default stylish;
