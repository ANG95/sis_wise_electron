/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable func-names */
function Debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;

      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);
    if (callNow) func.apply(context, args);
  };
}
function IsNumber(strNumber) {
  if (strNumber === null) return false;
  if (strNumber === undefined) return false;
  if (typeof strNumber === 'number' && !isNaN(strNumber)) return true;
  if (strNumber === '') return false;
  if (strNumber === '') return false;
  const psFloat = parseFloat(strNumber);
  return !isNaN(strNumber) && !isNaN(psFloat);
}
export { Debounce, IsNumber };
