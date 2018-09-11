import { createImage } from 'pngjs-image';
import { diff, diffSync } from '../src';

describe('Tests for diff.js', () => {
  describe('diff', () => {
    it('should reject the promise on non Uint8ClampedArray args', async () => {
      const a = [1, 2];
      const b = new Uint8ClampedArray([21, 31]);
      await expect(diff(a, b)).rejects.toThrowError(/is not an Uint8ClampedArray/);
    });
    it('should reject the promise on args with different lengths', async () => {
      const a = new Uint8ClampedArray([21, 31]);
      const b = new Uint8ClampedArray([21, 31, 21]);
      await expect(diff(a, b)).rejects.toThrowError(/does not have same length/);
    });
    it('should calculate the difference and resolve the promise', async () => {
      const imageA = createImage(100, 100);
      const imageB = createImage(100, 100);
      // Make one pixel in imageA different
      imageA.setAt(20, 30, { red: 100, green: 100, blue: 100, alpha: 100 });
      const imageAData = new Uint8ClampedArray(imageA.getBlob());
      const imageBData = new Uint8ClampedArray(imageB.getBlob());
      await expect(diff(imageAData, imageBData)).resolves.toEqual({
        diffCount: 4,
        diffPercentage: 0.01,
      });
    });
    it('should calculate the difference and resolve the promise (RGBA, step = 4)', async () => {
      const imageA = createImage(100, 100);
      const imageB = createImage(100, 100);
      // Make one pixel in imageA different
      imageA.setAt(20, 30, { red: 100, green: 0, blue: 0, alpha: 100 });
      const imageAData = new Uint8ClampedArray(imageA.getBlob());
      const imageBData = new Uint8ClampedArray(imageB.getBlob());
      await expect(diff(imageAData, imageBData, 4)).resolves.toEqual({
        diffCount: 1,
        diffPercentage: 0.01,
      });
    });
  });
  describe('diffSync', () => {
    it('should throw an Error on non Uint8ClampedArray args', () => {
      const a = [1, 2];
      const b = new Uint8ClampedArray([21, 31]);
      expect(() => diffSync(a, b)).toThrowError(/is not an Uint8ClampedArray/);
    });
    it('should throw an Error on args with different lengths', () => {
      const a = new Uint8ClampedArray([21, 31]);
      const b = new Uint8ClampedArray([21, 31, 21]);
      expect(() => diffSync(a, b)).toThrowError(/does not have same length/);
    });
    it('should calculate the difference', () => {
      const imageA = createImage(100, 100);
      const imageB = createImage(100, 100);
      // Make one pixel in imageA different
      imageA.setAt(20, 30, { red: 100, green: 100, blue: 100, alpha: 100 });
      const imageAData = new Uint8ClampedArray(imageA.getBlob());
      const imageBData = new Uint8ClampedArray(imageB.getBlob());
      expect(diffSync(imageAData, imageBData)).toEqual({
        diffCount: 4,
        diffPercentage: 0.01,
      });
    });
    it('should calculate the difference (RGBA, step = 4)', () => {
      const imageA = createImage(100, 100);
      const imageB = createImage(100, 100);
      // Make one pixel in imageA different
      imageA.setAt(20, 30, { red: 100, green: 0, blue: 0, alpha: 100 });
      const imageAData = new Uint8ClampedArray(imageA.getBlob());
      const imageBData = new Uint8ClampedArray(imageB.getBlob());
      expect(diffSync(imageAData, imageBData, 4)).toEqual({
        diffCount: 1,
        diffPercentage: 0.01,
      });
    });
  });
});
