export const sum = (objArr, prop, initialValue = 0) => {
  return objArr.reduce((sum, item) => sum + item[prop], initialValue);
};
