# Utility Library for Comparing Uint8ClampedArrays
[![npm version](https://badge.fury.io/js/uint8clampedarray-utils.svg)](https://badge.fury.io/js/uint8clampedarray-utils)
[![Coverage Status](https://coveralls.io/repos/github/ollelauribostrom/Uint8ClampedArray-utils/badge.svg?branch=master)](https://coveralls.io/github/ollelauribostrom/Uint8ClampedArray-utils?branch=master)

Installation
-------
`npm install uint8clampedarray-utils`    
`yarn add uint8clampedarray-utils` 

Usage
-----
#### isEqual
Check if two values are equal Uint8ClampedArrays.   
=> Promise
```js
  // Promise is resolved if equal
  const a = new Uint8ClampedArray([1, 2, 3]);
  const b = new Uint8ClampedArray([1, 2, 3]);
  await isEqual(a, b) // => true;

  // Promise is rejected on difference
  const a = new Uint8ClampedArray([1, 2, 3]);
  const b = new Uint8ClampedArray([3, 2, 1]);
  await isEqual(a, b) // => throws Error;

  // Promise is rejected when called with non Uint8ClampedArray value
  const a = [1, 2, 3];
  const b = new Uint8ClampedArray([1, 2, 3]);;
  await isEqual(a, b) // => throws Error;
```

#### isEqualSync
Check if two values are equal Uint8ClampedArrays.     
=> Boolean
```js
  // Returns true/false
  const a = new Uint8ClampedArray([1, 2, 3]);
  const b = new Uint8ClampedArray([1, 2, 3]);
  isEqualSync(a, b) // => true

  // Pass flag to throw error on invalid arguments/difference
  const a = new Uint8ClampedArray([1, 2, 3]);
  const b = new Uint8ClampedArray([1, 2, 3, 4]);
  const throwError = true;
  isEqualSync(a, b, throwError) // => throws Error  
```

#### diff
Calculate difference between two Uint8ClampedArray.   
=> Promise
```js
  // Promise is resolved with statistics object
  const a = new Uint8ClampedArray([1, 2, 3, 4]);
  const b = new Uint8ClampedArray([1, 2, 3, 5]);
  await diff(a, b) // => { diffCount: 1, diffPercentage: 25 }

  // Promise is rejected on difference in length
  const a = new Uint8ClampedArray([1, 2, 3]);
  const b = new Uint8ClampedArray([1, 2, 3, 4]);
  await diff(a, b) // => throws Error;

  // Promise is rejected when called with non Uint8ClampedArray value
  const a = [1, 2, 3];
  const b = new Uint8ClampedArray([1, 2, 3]);;
  await diff(a, b) // => throws Error;
```

#### diffSync
Calculate difference between two Uint8ClampedArray.   
=> Object
```js
  // Returns statistics object
  const a = new Uint8ClampedArray([1, 2, 3, 4]);
  const b = new Uint8ClampedArray([1, 2, 3, 5]);
  diffSync(a, b) // => { diffCount: 1, diffPercentage: 25 }

  // Throws Error on difference in length
  const a = new Uint8ClampedArray([1, 2, 3]);
  const b = new Uint8ClampedArray([1, 2, 3, 4]);
  diffSync(a, b) // => throws Error;

  // Throws Error when called with non Uint8ClampedArray value
  const a = [1, 2, 3];
  const b = new Uint8ClampedArray([1, 2, 3]);;
  diffSync(a, b) // => throws Error;
```

#### isUint8ClampedArray
Check if value is Uint8ClampedArray. Basically a wrapper for `value instanceof Uint8ClampedArray`.      
=> Boolean
```js
  // Returns true/false
  const arr = [1, 2, 3];
  const uArr = new Uint8ClampedArray([1, 2, 3]);
  isUint8ClampedArray(arr) // => false
  isUint8ClampedArray(uArr) // => true
```

#### hasSameLength
Check if two Uint8ClampedArrays have the same length. Basically a wrapper for `a.length === b.length`.   
=> Boolean
```js
  // Returns true/false
  const a = new Uint8ClampedArray([1, 2, 3]);
  const b = new Uint8ClampedArray([1, 2, 3]);
  hasSameLength(a, b) // => true

  // Returns false when called with non Uint8ClampedArray value
  const a = [1, 2, 3];
  const b = new Uint8ClampedArray([1, 2, 3]);
  hasSameLength(a, b) // => false

  // Pass flag to throw error when called with non Uint8ClampedArray value
  const a = [1, 2, 3];
  const b = new Uint8ClampedArray([1, 2, 3]);
  const throwError = true;
  hasSameLength(a, b, throwError) // => throws Error
```

Running the tests
-----------------
`yarn test`    
`yarn coverage`    
`yarn lint`    

Support
-------
Please [open an issue](https://github.com/ollelauribostrom/Uint8ClampedArray-utils/issues/new) for support.

License
-------
MIT
