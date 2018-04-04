import { throwOrReturn } from '../src';

describe('{unit} throwOrReturn', () => {
  it('returns false if throwError is false', () => {
    expect(throwOrReturn('test', false)).toBeFalsy();
  });
  it('throws Error with provided message if throwError is true', () => {
    expect(() => throwOrReturn('test', true)).toThrowError('test');
  });
});
