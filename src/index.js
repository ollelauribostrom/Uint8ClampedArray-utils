/**
 * (utility): Throw error or return false
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

/**
 * Async check if two values are equal Uint8ClampedArrays
 * @param {Uint8ClampedArray} a
 * @param {Uint8ClampedArray} b
 * @return {Promise}
 */
export function isEqual(a, b) {
  return new Promise((resolve, reject) => {
    if (!hasSameLength(a, b, true)) {
      return reject(new Error(`${a} is not equal to ${b}`));
    }
    for (let i = 0; i < a.length; i += 1) {
      if (a[i] !== b[i]) {
        return reject(new Error(`${a} is not equal to ${b}`));
      }
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

  for (let i = 0; i <= a.length; i += 1) {
    if (a[i] !== b[i]) {
      return throwOrReturn(`${a} is not equal to ${b}`, throwError);
    }
  }
  return true;
}

/**
 * Async calculate difference between two Uint8ClampedArray
 * @param {Uint8ClampedArray} a
 * @param {Uint8ClampedArray} b
 * @return {Object} { differences, diffPercentage }
 */
export function diff(a, b) {
  return new Promise((resolve, reject) => {
    if (!hasSameLength(a, b, true)) {
      return reject(new Error(`Values: ${a}, ${b} does not have same length`));
    }

    let diffCount = 0;
    for (let i = 0; i <= a.length; i += 1) {
      if (a[i] !== b[i]) {
        diffCount += 1;
      }
    }

    return resolve({
      diffCount,
      diffPercentage: (diffCount / a.length) * 100,
    });
  });
}

/**
 * Calculate difference between two Uint8ClampedArray
 * @param {Uint8ClampedArray} a
 * @param {Uint8ClampedArray} b
 * @return {Object} { differences, diffPercentage }
 */
export function diffSync(a, b) {
  if (!hasSameLength(a, b, true)) {
    throw new Error(`Values: ${a}, ${b} does not have same length`);
  }

  let diffCount = 0;
  for (let i = 0; i <= a.length; i += 1) {
    if (a[i] !== b[i]) {
      diffCount += 1;
    }
  }

  return {
    diffCount,
    diffPercentage: (diffCount / a.length) * 100,
  };
}
