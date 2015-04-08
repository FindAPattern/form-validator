var expect = require('chai').expect;
var required = require('../../src/fieldValidators/required');

describe('a required field validator', function () {
  var errorMessage = 'sample is required';
  
  it('fails for null data', function () {
    required('sample', {'sample':null}, true, function (err) {
      expect(err).to.equal(errorMessage);
    });
  });
  
  it('fails for undefined data', function () {
    required('sample', {}, true, function (err) {
      expect(err).to.equal(errorMessage);
    });
  });
  
  it('fails for empty string data', function () {
    required('sample', {'sample':''}, true, function (err) {
      expect(err).to.equal(errorMessage);
    });
  });
  
  it('passes for populated string data', function () {
    required('sample', {'sample':'testing'}, true, function (err) {
      expect(err).to.not.exist;
    });
  });
  
  it('fails for whitespace string data', function () {
    required('sample', {'sample':'      '}, true, function (err) {
      expect(err).to.equal(errorMessage);
    });
  });
});