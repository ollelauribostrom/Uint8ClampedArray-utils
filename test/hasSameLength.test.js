import { hasSameLength } from '../src';

describe('{unit} hasSameLength', () => {
  it('returns false when called with non isUint8ClampedArray value', () => {
    const a = [1, 2];
    const b = new Uint8ClampedArray([21, 31]);
    expect(hasSameLength(a, b)).toBeFalsy();
  });
  it('throws error when first arg is non isUint8ClampedArray & throwError = true', () => {
    const a = [1, 2];
    const b = new Uint8ClampedArray([21, 31]);
    expect(() => hasSameLength(a, b, true)).toThrowError(/is not an Uint8ClampedArray/);
  });
  it('throws error when second arg is non isUint8ClampedArray & throwError = true', () => {
    const a = new Uint8ClampedArray([21, 31]);
    const b = [1, 2];
    expect(() => hasSameLength(a, b, true)).toThrowError(/is not an Uint8ClampedArray/);
  });
  it('returns false on different lengths', () => {
    const a = new Uint8ClampedArray([21, 31]);
    const b = new Uint8ClampedArray([21, 31, 21]);
    expect(hasSameLength(a, b)).toBeFalsy();
  });
  it('returns true on same lengths', () => {
    const a = new Uint8ClampedArray([21, 31, 31]);
    const b = new Uint8ClampedArray([21, 31, 21]);
    expect(hasSameLength(a, b)).toBeTruthy();
  });
});
