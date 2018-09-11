import { createImage } from 'pngjs-image';
import { isEqual, isEqualSync } from '../src';

describe('Tests for isEqual.js', () => {
  describe('isEqual', () => {
    it('should reject when called with non isUint8ClampedArray value', async () => {
      const a = [1, 2, 3];
      const b = new Uint8ClampedArray([21, 31]);
      await expect(isEqual(a, b)).rejects.toThrowError();
    });
    it('should reject on different lengths', async () => {
      const a = new Uint8ClampedArray([21, 31]);
      const b = new Uint8ClampedArray([21, 31, 31]);
      await expect(isEqual(a, b)).rejects.toThrowError(/is not equal to/);
    });
    it('should reject on difference', async () => {
      const a = new Uint8ClampedArray([21, 31, 21]);
      const b = new Uint8ClampedArray([21, 31, 31]);
      await expect(isEqual(a, b)).rejects.toThrowError(/is not equal to/);
    });
    it('should resolve on equality', async () => {
      const a = new Uint8ClampedArray([21, 31, 31]);
      const b = new Uint8ClampedArray([21, 31, 31]);
      await expect(isEqual(a, b)).resolves.toEqual(true);
    });
    it('should resolve when called with two identical images', async () => {
      const imageA = createImage(100, 100);
      const imageB = createImage(100, 100);
      imageA.setAt(20, 30, { red: 255, green: 0, blue: 0, alpha: 100 });
      imageB.setAt(20, 30, { red: 255, green: 0, blue: 0, alpha: 100 });
      const imageAData = new Uint8ClampedArray(imageA.getBlob());
      const imageBData = new Uint8ClampedArray(imageB.getBlob());
      await expect(isEqual(imageAData, imageBData)).resolves.toEqual(true);
    });
  });
  describe('isEqualSync', () => {
    it('should return false when called with non isUint8ClampedArray value', () => {
      const a = [1, 2, 3];
      const b = new Uint8ClampedArray([21, 31]);
      expect(isEqualSync(a, b)).toEqual(false);
    });
    it('should throw an error when first arg is non isUint8ClampedArray & throwError = true', () => {
      const a = [1, 2, 3];
      const b = new Uint8ClampedArray([21, 31]);
      expect(() => isEqualSync(a, b, true)).toThrowError(/is not an Uint8ClampedArray/);
    });
    it('should throw an error when second arg is non isUint8ClampedArray & throwError = true', () => {
      const a = new Uint8ClampedArray([21, 31]);
      const b = [1, 2, 3];
      expect(() => isEqualSync(a, b, true)).toThrowError(/is not an Uint8ClampedArray/);
    });
    it('should return false if not same length', () => {
      const a = new Uint8ClampedArray([21, 31]);
      const b = new Uint8ClampedArray([21, 31, 21]);
      expect(isEqualSync(a, b)).toEqual(false);
    });
    it('should throw an error if not same length & throwError = true', () => {
      const a = new Uint8ClampedArray([21, 31]);
      const b = new Uint8ClampedArray([21, 31, 21]);
      expect(() => isEqualSync(a, b, true)).toThrowError(/is not equal to/);
    });
    it('should return false on difference', () => {
      const a = new Uint8ClampedArray([21, 31, 31]);
      const b = new Uint8ClampedArray([21, 31, 21]);
      expect(isEqualSync(a, b)).toEqual(false);
    });
    it('should throw an error on difference & throwError = true', () => {
      const a = new Uint8ClampedArray([21, 31, 31]);
      const b = new Uint8ClampedArray([21, 31, 21]);
      expect(() => isEqualSync(a, b, true)).toThrowError(/is not equal to/);
    });
    it('should return true on equality', () => {
      const a = new Uint8ClampedArray([21, 31, 31]);
      const b = new Uint8ClampedArray([21, 31, 31]);
      expect(isEqualSync(a, b)).toEqual(true);
    });
    it('should return true when called with two identical images', () => {
      const imageA = createImage(100, 100);
      const imageB = createImage(100, 100);
      imageA.setAt(20, 30, { red: 255, green: 0, blue: 0, alpha: 100 });
      imageB.setAt(20, 30, { red: 255, green: 0, blue: 0, alpha: 100 });
      const imageAData = new Uint8ClampedArray(imageA.getBlob());
      const imageBData = new Uint8ClampedArray(imageB.getBlob());
      expect(isEqualSync(imageAData, imageBData)).toEqual(true);
    });
  });
});
