var expect = require('chai').expect;
var validator = require('../src');

describe('a form validator', function () {
  it('passes validation if all validators pass', function () {
    var formValidator = validator({
      'fieldName': { custom: true }
    }).addFieldValidator('custom', function (fieldName, formData, config, next) { next(); });
    
    var validation = formValidator.validate({
      'fieldName': ''
    });
    
    expect(validation.succeeded()).to.equal(true);
  });
  
  it('fails validation if any validators fail', function () {
    var formValidator = validator({
      'fieldName': { custom: true }
    }).addFieldValidator('custom', function (fieldName, formData, config, next) { next('fail'); });
    
    var validation = formValidator.validate({
      'fieldName': ''
    });
    
    expect(validation.succeeded()).to.equal(false);
  });
  
  it('passes configuration data into validators when executing them', function () {
    var formValidator = validator({
      'fieldName': { custom: 'check me!' }
    }).addFieldValidator('custom', function (fieldName, formData, config, next) {
      expect(config).to.equal('check me!');
      next();
    });
    
    var validation = formValidator.validate({'fieldName': ''});
  });
});