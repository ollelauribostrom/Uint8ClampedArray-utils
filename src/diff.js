import { hasSameLength } from './utils';

function calculateDiff(a, b, step) {
  let diffCount = 0;
  for (let i = 0; i <= a.length; i += step) {
    for (let j = 0; j < step; j += 1) {
      if (a[i + j] !== b[i + j]) {
        diffCount += 1;
        break;
      }
    }
  }
  return {
    diffCount,
    diffPercentage: (diffCount / (a.length / step)) * 100,
  };
}

/**
 * Async calculate the difference between two Uint8ClampedArrays
 * @param {Uint8ClampedArray} a
 * @param {Uint8ClampedArray} b
 * @param {Number} step
 * @return {Promise<{diffCount: Number, diffPercentage: Number}>}
 */
export function diff(a, b, step = 1) {
  return new Promise((resolve, reject) => {
    if (!hasSameLength(a, b, true)) {
      return reject(new Error(`Values: ${a}, ${b} does not have same length`));
    }
    return resolve(calculateDiff(a, b, step));
  });
}

/**
 * Calculate the difference between two Uint8ClampedArrays
 * @param {Uint8ClampedArray} a
 * @param {Uint8ClampedArray} b
 * @param {Number} step
 * @return {{diffCount: Number, diffPercentage: Number}}
 */
export function diffSync(a, b, step = 1) {
  if (!hasSameLength(a, b, true)) {
    throw new Error(`Values: ${a}, ${b} does not have same length`);
  }
  return calculateDiff(a, b, step);
}
