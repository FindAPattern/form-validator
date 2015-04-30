var expect = require('chai').expect;
var Field = require('../src/Field');
var Rule = require('../src/Rule');

describe('a field', function () {
  it('invalidates data if passing it through any rule fails', function () {
    var field = new Field();
    
    field.addRule(new Rule(function (fieldName, formData, config, next) { next('fail'); }, null));
    
    var validation = field.validate('fake data');
    
    expect(validation.succeeded()).to.equal(false);
  });
  
  it('validates data if passing it through all rules succeeds', function () {
    var field = new Field();
    
    field.addRule(new Rule(function (fieldName, formData, config, next) { next(); }, null));
    
    var validation = field.validate('fake data');
    
    expect(validation.succeeded()).to.equal(true);
  });
  
  it('stores Rule error messages', function () {
    var field = new Field('sample');
    
    field.addRule(new Rule(function (fieldName, formData, config, next) { next('Hello, sample!'); }, null));
    
    var validation = field.validate('fake data');
    
    expect(validation.errors('sample')).to.deep.equal(['Hello, sample!']);
  });
});