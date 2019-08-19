import { expect } from 'chai';
import { Scale, getScale, registerScale } from '../../src';

describe('scale index', () => {
  class Custom extends Scale {}

  registerScale('custom', Custom);

  it('registerScale func', () => {
    expect(() => registerScale('cat')).to.throw("type 'cat' existed.");
  });

  it('getScale func', () => {
    const scale = getScale('custom');

    expect(scale).to.equal(Custom);
  });
});
