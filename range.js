/**
 * Creates an Iterable range between `start` and `end`
 *
 * @param      {number}  start   The start number
 * @param      {number}  end     The end number
 * @param      {number}  step    The step by which to increment at each iteration
 * @return     {object}  an Iterable
 */
const range = (start, end, step = 1) => {
  const iterable = {};

  iterable[Symbol.iterator] = function*() {
    let index = start;
    while(index < end) {
      index += step;
      yield index;
    }
  };

  return iterable;
};

/**
 * Return an array of numbers within the given range
 *
 * @param      {number}  start   The start number
 * @param      {number}  end     The end number
 * @param      {number}  step    The step by which to increment at each iteration
 * @return     {array}  an array ranging from `start` to `end`
 */
const arange = (start, end, step) => [...range(start, end, step)];

module.exports = {
  range,
  arange
};
