var expect = require('chai').expect;
var FormValidatorFactory = require('../src/FormValidatorFactory');

describe('a form validator factory', function () {
  it('creates a form validator with a required field validator', function () {
    var formValidatorFactory = new FormValidatorFactory();
    
    var validator = formValidatorFactory.create({});
    
    expect(validator.hasFieldValidator('required')).to.equal(true);
  });
  
  it('creates a form validator with a matches field validator', function () {
    var formValidatorFactory = new FormValidatorFactory();
    
    var validator = formValidatorFactory.create({});
    
    expect(validator.hasFieldValidator('matches')).to.equal(true);
  });
  
    it('creates a form validator with a length field validator', function () {
    var formValidatorFactory = new FormValidatorFactory();
    
    var validator = formValidatorFactory.create({});
    
    expect(validator.hasFieldValidator('length')).to.equal(true);
  });
});