var expect = require('chai').expect;
var Validation = require('../src/Validation');

describe('a validation', function () {
  it('succeeds by default', function () {
    var validation = new Validation();
    
    expect(validation.succeeded()).to.equal(true);
  });
  
  it('stores errors', function () {
    var validation = new Validation();
    
    validation.addError('fieldName', 'message');
    
    expect(validation.errors('fieldName')).to.deep.equal(['message'])
  });

  describe('when merged', function () {
    it('does not succeeded if the first validation has failed', function () {
      var validation = new Validation();
      var otherValidation = new Validation();

      validation.addError('field', 'fail');

      expect(validation.merge(otherValidation).succeeded()).to.equal(false);
    });
    
    it('does not succeeded if the second validation has failed', function () {
      var validation = new Validation();
      var otherValidation = new Validation();

      otherValidation.addError('field', 'fail');

      expect(validation.merge(otherValidation).succeeded()).to.equal(false);
    });
    
    it('succeeds if the both validations succeed', function () {
      var validation = new Validation();
      var otherValidation = new Validation();

      expect(validation.merge(otherValidation).succeeded()).to.equal(true);
    });
  });
});