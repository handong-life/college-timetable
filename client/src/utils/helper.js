export const sum = (objArr, prop, initialValue = 0) => {
  return objArr.reduce((sum, item) => sum + item[prop], initialValue);
};

export const isIn = (item, arr, prop) => {
  return arr.find((x) => x[prop] === item[prop]) !== undefined;
};

export const isPeriodDup = (lecture, timetableLectures) => {
  return timetableLectures.reduce(
    (isDup, { period: periods }) =>
      isDup ||
      lecture.period.split(',').reduce((isDup, period) => isDup || periods.includes(period), false),
    false,
  );
};

export const copyToClipboard = (text) => {
  const textarea = document.createElement('textarea');

  textarea.textContent = text;
  document.body.appendChild(textarea);

  const selection = document.getSelection();
  const range = document.createRange();

  range.selectNode(textarea);
  selection.removeAllRanges();
  selection.addRange(range);

  document.execCommand('copy');
  selection.removeAllRanges();
};
