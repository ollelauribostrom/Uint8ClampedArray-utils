/**
 * (NOT EXPORTED utility): Throw error or return false
 * @param {string} msg
 * @param {boolean} throwError
 * @return {boolean}
 * @throws {Error}
 */
export function throwOrReturn(msg, throwError) {
  if (throwError) {
    throw new Error(msg);
  }
  return false;
}

/**
 * Check if value is Uint8ClampedArray
 * @param {any} value
 * @return {boolean}
 */
export function isUint8ClampedArray(value) {
  return value instanceof Uint8ClampedArray;
}

/**
 * Check if two Uint8ClampedArrays have the same length
 * @param {Uint8ClampedArray} a
 * @param {Uint8ClampedArray} b
 * @param {boolean} throwError Throw error on non Uint8ClampedArrays values
 * @return {boolean}
 */
export function hasSameLength(a, b, throwError = false) {
  if (!isUint8ClampedArray(a)) {
    return throwOrReturn(`First argument: ${a} is not an Uint8ClampedArray`, throwError);
  }
  if (!isUint8ClampedArray(b)) {
    return throwOrReturn(`Second argument: ${b} is not an Uint8ClampedArray`, throwError);
  }
  return a.length === b.length;
}
