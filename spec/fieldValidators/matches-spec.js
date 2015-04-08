var expect = require('chai').expect;
var matches = require('../../src/fieldValidators/matches');

describe('a matches field validator', function () {
  it('succeeds if target field data matches', function () {
    matches('sample', {'sample':'a','target':'a'}, 'target', function (err) {
      expect(err).to.not.exist;
    });
  });
  
  it('fails if target field data differs', function () {
    matches('sample', {'sample':'a','target':'b'}, 'target', function (err) {
      expect(err).to.equal('sample doesn\'t match target');
    });
  });
});