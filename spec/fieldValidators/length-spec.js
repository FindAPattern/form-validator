var expect = require('chai').expect;
var length = require('../../src/fieldValidators/length');

describe('a length field validator', function () {
  it('fails if target data is shorter than its minimum length', function () {
    length('sample', {'sample':'a'}, {'min':3}, function (err) {
      expect(err).to.equal('sample is shorter than 3 character(s)');
    });
  });
  
  it('fails if target data is longer than its maximum length', function () {
    length('sample', {'sample':'abc'}, {'max':1}, function (err) {
      expect(err).to.equal('sample is longer than 1 character(s)');
    });
  });
  
  it('fails if maximum length is less than minimum length', function () {
    length('sample', {'sample':'abc'}, {'min':3,'max':1}, function (err) {
      expect(err).to.equal('sample has no valid values, since its minimum length exceeds its maximum length');
    });
  });
  
  it('succeeds if data length is greater than the minimum length', function () {
    length('sample', {'sample':'abc'}, {'min':1}, function (err) {
      expect(err).to.not.exist;
    });
  });
  
  it('succeeds if data length is less than the maximum length', function () {
    length('sample', {'sample':'abc'}, {'min':1}, function (err) {
      expect(err).to.not.exist;
    });
  });
  
  it('fails if data does not exist and also has a minimum length', function () {
    length('sample', {}, {'min':1}, function (err) {
      expect(err).to.equal('sample is shorter than 1 character(s)');
    });
  });
});