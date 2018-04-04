import { isEqual, isEqualSync } from '../src';

describe('{unit} isEqual', () => {
  it('rejects when called with non isUint8ClampedArray value', async () => {
    const a = [1, 2, 3];
    const b = new Uint8ClampedArray([21, 31]);
    try {
      await isEqual(a, b);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
  it('rejects on different lengths', async () => {
    const a = new Uint8ClampedArray([21, 31]);
    const b = new Uint8ClampedArray([21, 31, 31]);
    try {
      await isEqual(a, b);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toMatch(/is not equal to/);
    }
  });
  it('rejects on difference', async () => {
    const a = new Uint8ClampedArray([21, 31, 21]);
    const b = new Uint8ClampedArray([21, 31, 31]);
    try {
      await isEqual(a, b);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toMatch(/is not equal to/);
    }
  });
  it('resolves on equality', async () => {
    const a = new Uint8ClampedArray([21, 31, 31]);
    const b = new Uint8ClampedArray([21, 31, 31]);
    const res = await isEqual(a, b);
    expect(res).toBeTruthy();
  });
});

describe('{unit} isEqualSync', () => {
  it('returns false when called with non isUint8ClampedArray value', () => {
    const a = [1, 2, 3];
    const b = new Uint8ClampedArray([21, 31]);
    expect(isEqualSync(a, b)).toBeFalsy();
  });
  it('throws error when first arg is non isUint8ClampedArray & throwError = true', () => {
    const a = [1, 2, 3];
    const b = new Uint8ClampedArray([21, 31]);
    expect(() => isEqualSync(a, b, true)).toThrowError(/is not an Uint8ClampedArray/);
  });
  it('throws error when second arg is non isUint8ClampedArray & throwError = true', () => {
    const a = new Uint8ClampedArray([21, 31]);
    const b = [1, 2, 3];
    expect(() => isEqualSync(a, b, true)).toThrowError(/is not an Uint8ClampedArray/);
  });
  it('returns false if not same length', () => {
    const a = new Uint8ClampedArray([21, 31]);
    const b = new Uint8ClampedArray([21, 31, 21]);
    expect(isEqualSync(a, b)).toBeFalsy();
  });
  it('throws error if not same length & throwError = true', () => {
    const a = new Uint8ClampedArray([21, 31]);
    const b = new Uint8ClampedArray([21, 31, 21]);
    expect(() => isEqualSync(a, b, true)).toThrowError(/is not equal to/);
  });
  it('returns false on difference', () => {
    const a = new Uint8ClampedArray([21, 31, 31]);
    const b = new Uint8ClampedArray([21, 31, 21]);
    expect(isEqualSync(a, b)).toBeFalsy();
  });
  it('throws error on difference & throwError = true', () => {
    const a = new Uint8ClampedArray([21, 31, 31]);
    const b = new Uint8ClampedArray([21, 31, 21]);
    expect(() => isEqualSync(a, b, true)).toThrowError(/is not equal to/);
  });
  it('returns true on equality', () => {
    const a = new Uint8ClampedArray([21, 31, 31]);
    const b = new Uint8ClampedArray([21, 31, 31]);
    expect(isEqualSync(a, b)).toBeTruthy();
  });
});
