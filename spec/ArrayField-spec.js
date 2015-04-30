var expect = require('chai').expect;
var ArrayField = require('../src/ArrayField');
var Rule = require('../src/Rule');
var required = require('../src/fieldValidators/required');
var buildSchemaValidator = require('../src/fieldValidators/schema');
var validately = require('../src');

describe('an array field', function () {
  var field;
  
  beforeEach(function () {
    field = new ArrayField('fieldName');
  
    field.addRule(new Rule(required, true));
  });
  
  it('validates an array of valid data', function () {
    var validation = field.validate({'fieldName':['abc', 'def']});
    
    expect(validation.succeeded()).to.equal(true);
  });
  
  it('invalidates an array containing invalid data', function () {
    var validation = field.validate({'fieldName':['abc', null]});
    
    expect(validation.succeeded()).to.equal(false);
    expect(validation.errors('fieldName[1]')[0]).to.equal('fieldName is required');
  });
  
  it('invalidates an array containing a failed schema validator', function () {
    field.addRule(new Rule(buildSchemaValidator(validately), {title: {required: true}}));
    
    var validation = field.validate({'fieldName':[{'title': 'abc'}, {'title':''}]});
    
    expect(validation.succeeded()).to.equal(false);
    expect(validation.errors('fieldName[1].title')[0]).to.equal('title is required');
  });
  
  it('invalidates if data is not an array', function () {
    var validation = field.validate({'fieldName':'abc'});
    
    expect(validation.errors('fieldName')[0]).to.equal('fieldName isn\'t a list');
  });
  
  it('invalidates if data does not exist', function () {
    var validation = field.validate({'nope':'abc'});
    
    expect(validation.errors('fieldName')[0]).to.equal('fieldName isn\'t a list');
  });
});