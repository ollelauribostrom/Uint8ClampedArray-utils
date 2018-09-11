import { hasSameLength, throwOrReturn } from './utils';

function isEqualUint8ClampedArrays(a, b) {
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

/**
 * Async check if two values are equal Uint8ClampedArrays
 * @param {Uint8ClampedArray} a
 * @param {Uint8ClampedArray} b
 * @return {Promise<boolean>}
 */
export function isEqual(a, b) {
  return new Promise((resolve, reject) => {
    if (!hasSameLength(a, b, true)) {
      return reject(new Error(`${a} is not equal to ${b}`));
    }
    if (!isEqualUint8ClampedArrays(a, b)) {
      return reject(new Error(`${a} is not equal to ${b}`));
    }
    return resolve(true);
  });
}

/**
 * Check if two values are equal Uint8ClampedArrays
 * @param {Uint8ClampedArray} a
 * @param {Uint8ClampedArray} b
 * @param {boolean} throwError Throw error on non Uint8ClampedArrays values
 * @return {boolean}
 */
export function isEqualSync(a, b, throwError = false) {
  if (!hasSameLength(a, b, throwError)) {
    return throwOrReturn(`${a} is not equal to ${b}`, throwError);
  }
  if (!isEqualUint8ClampedArrays(a, b)) {
    return throwOrReturn(`${a} is not equal to ${b}`, throwError);
  }
  return true;
}
