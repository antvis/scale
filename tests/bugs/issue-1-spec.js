const expect = require('chai').expect;
const scale = require('../../src/index');

describe('#1', () => {
  it('description', () => {
    expect('scale').to.be.a('string');
    expect(scale).to.be.an('object');
  });
});
