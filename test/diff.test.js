import { diff, diffSync } from '../src';

describe('{unit} diff', () => {
  it('rejects on non Uint8ClampedArray args', async () => {
    const a = [1, 2];
    const b = new Uint8ClampedArray([21, 31]);
    try {
      await diff(a, b);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toMatch(/is not an Uint8ClampedArray/);
    }
  });
  it('rejects on args with different lengths', async () => {
    const a = new Uint8ClampedArray([21, 31]);
    const b = new Uint8ClampedArray([21, 31, 21]);
    try {
      await diff(a, b);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toMatch(/does not have same length/);
    }
  });
  it('resolves with diff-stats object', async () => {
    const a = new Uint8ClampedArray([21, 31, 25, 25]);
    const b = new Uint8ClampedArray([21, 31, 21, 21]);
    const stats = await diff(a, b);
    expect(stats.diffCount).toEqual(2);
    expect(stats.diffPercentage).toEqual(50);
  });
});

describe('{unit} diffSync', () => {
  it('throws Error on non Uint8ClampedArray args', () => {
    const a = [1, 2];
    const b = new Uint8ClampedArray([21, 31]);
    expect(() => diffSync(a, b)).toThrowError(/is not an Uint8ClampedArray/);
  });
  it('throws Error on args with different lengths', () => {
    const a = new Uint8ClampedArray([21, 31]);
    const b = new Uint8ClampedArray([21, 31, 21]);
    expect(() => diffSync(a, b)).toThrowError(/does not have same length/);
  });
  it('returns diff-stats object', () => {
    const a = new Uint8ClampedArray([21, 31, 25, 25]);
    const b = new Uint8ClampedArray([21, 31, 21, 21]);
    const stats = diffSync(a, b);
    expect(stats.diffCount).toEqual(2);
    expect(stats.diffPercentage).toEqual(50);
  });
});
