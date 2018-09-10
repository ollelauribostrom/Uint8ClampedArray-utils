import { createImage } from 'pngjs-image';
import { isEqual, isEqualSync, diff, diffSync } from '../src';

describe('Integration tests using pngjs-image', () => {
  describe('isEqual', () => {
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
  describe('diff', () => {
    it('should correctly calculate the difference between two images', async () => {
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
  });
  describe('diffSync', () => {
    it('should correctly calculate the difference between two images', () => {
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
  });
});
