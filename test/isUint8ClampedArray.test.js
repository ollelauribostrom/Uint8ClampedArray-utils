import { isUint8ClampedArray } from '../src';

describe('{unit} isUint8ClampedArray', () => {
  it('returns false for non Uint8ClampedArray values', () => {
    [
      1,
      '1',
      {},
      true,
      [1, 2, 3],
      new Int8Array(),
      new Uint8Array(),
      new Int16Array(),
      new Uint16Array(),
      new Int32Array(),
      new Uint32Array(),
      new Float32Array(),
      new Float64Array(),
    ].forEach(val => expect(isUint8ClampedArray(val)).toBeFalsy());
  });
  it('returns true for Uint8ClampedArray', () => {
    const arr = new Uint8ClampedArray(2);
    expect(isUint8ClampedArray(arr)).toBeTruthy();
  });
});
