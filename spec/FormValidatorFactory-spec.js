var expect = require('chai').expect;
var FormValidatorFactory = require('../src/FormValidatorFactory');
var ArrayField = require('../src/ArrayField');

describe('a form validator factory', function () {
  var formValidatorFactory = new FormValidatorFactory();
  
  it('creates a form validator with a required field validator', function () {
    var validator = formValidatorFactory.create({});
    
    expect(validator.hasFieldValidator('required')).to.equal(true);
  });
  
  it('creates a form validator with a matches field validator', function () {
    var validator = formValidatorFactory.create({});
    
    expect(validator.hasFieldValidator('matches')).to.equal(true);
  });
  
  it('creates a form validator with a length field validator', function () {
    var validator = formValidatorFactory.create({});
    
    expect(validator.hasFieldValidator('length')).to.equal(true);
  });
  
  it('creates array fields', function () {
    var validator = formValidatorFactory.create({
      'fieldName': [{ 'required': true }]
    });
    
    expect(validator.field('fieldName')).to.be.an.instanceof(ArrayField);
  });
});