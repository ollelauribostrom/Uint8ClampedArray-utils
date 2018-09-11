import { throwOrReturn, isUint8ClampedArray, hasSameLength } from '../src/utils';

describe('Tests for utils.js', () => {
  describe('throwOrReturn', () => {
    it('should return false if throwError is false', () => {
      expect(throwOrReturn('test', false)).toEqual(false);
    });
    it('should throw an Error with the provided message if throwError is true', () => {
      expect(() => throwOrReturn('test', true)).toThrowError('test');
    });
  });
  describe('isUint8ClampedArray', () => {
    it('should return false for non Uint8ClampedArray values', () => {
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
      ].forEach(val => expect(isUint8ClampedArray(val)).toEqual(false));
    });
    it('should return true for Uint8ClampedArray', () => {
      const arr = new Uint8ClampedArray(2);
      expect(isUint8ClampedArray(arr)).toEqual(true);
    });
  });
  describe('hasSameLength', () => {
    it('should return false when called with non isUint8ClampedArray value', () => {
      const a = [1, 2];
      const b = new Uint8ClampedArray([21, 31]);
      expect(hasSameLength(a, b)).toEqual(false);
    });
    it('should throw error when first arg is non isUint8ClampedArray & throwError = true', () => {
      const a = [1, 2];
      const b = new Uint8ClampedArray([21, 31]);
      expect(() => hasSameLength(a, b, true)).toThrowError(/is not an Uint8ClampedArray/);
    });
    it('should throw error when second arg is non isUint8ClampedArray & throwError = true', () => {
      const a = new Uint8ClampedArray([21, 31]);
      const b = [1, 2];
      expect(() => hasSameLength(a, b, true)).toThrowError(/is not an Uint8ClampedArray/);
    });
    it('should return false on different lengths', () => {
      const a = new Uint8ClampedArray([21, 31]);
      const b = new Uint8ClampedArray([21, 31, 21]);
      expect(hasSameLength(a, b)).toEqual(false);
    });
    it('should return true on same lengths', () => {
      const a = new Uint8ClampedArray([21, 31, 31]);
      const b = new Uint8ClampedArray([21, 31, 21]);
      expect(hasSameLength(a, b)).toEqual(true);
    });
  });
});
