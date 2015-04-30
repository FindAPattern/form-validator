var expect = require('chai').expect;
var validately = require('../src');
var FormValidator = require('../src/FormValidator');
var Rule = require('../src/Rule');

describe('a form validator', function () {
  it('passes validation if all validators pass', function () {
    var formValidator = new FormValidator();
    
    formValidator.addFieldValidator('custom', function (fieldName, formData, config, next) {
      next();
    });
    
    formValidator.field('fieldName').addRule(new Rule(
      formValidator.fieldValidator('custom'),
      true
    ));
    
    var validation = formValidator.validate({
      'fieldName': ''
    });
    
    expect(validation.succeeded()).to.equal(true);
  });
  
  it('fails validation if any validators fail', function () {
    var formValidator = new FormValidator();
    
    formValidator.addFieldValidator('custom', function (fieldName, formData, config, next) {
      next('fail');
    });
    
    formValidator.field('fieldName').addRule(new Rule(
      formValidator.fieldValidator('custom'),
      true
    ));
    
    var validation = formValidator.validate({
      'fieldName': ''
    });
    
    expect(validation.succeeded()).to.equal(false);
  });
  
  it('passes configuration data into validators when executing them', function () {
    var formValidator = new FormValidator();
    
    formValidator.addFieldValidator('custom', function (fieldName, formData, config, next) {
      expect(config).to.equal('check me!');
      next();
    });
    
    formValidator.field('fieldName').addRule(new Rule(
      formValidator.fieldValidator('custom'),
      'check me!'
    ));
    
    var validation = formValidator.validate({'fieldName': ''});
  });
});