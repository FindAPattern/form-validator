var FormValidator = require('./FormValidator');
var Rule = require('./Rule');

/**
 * Represents a factory for constructing form validators.
 * 
 * @constructor
 */
function FormValidatorFactory() {
}

/**
 * Creates a form validator pre-populated with rules passed in as 
 * "fieldRules". Format of "fieldRules" looks like: {
 *   "fieldName" : { "validatorName" : validatorSettings }
 * }
 *
 * @param {Object} fieldRules - Field validation rules.
 * @returns {FormValidator}
 */
FormValidatorFactory.prototype.create = function (fieldRules) {
  var formValidator = new FormValidator()
    .addFieldValidator('required', require('./fieldValidators/required'))
    .addFieldValidator('matches', require('./fieldValidators/matches'))
    .addFieldValidator('length', require('./fieldValidators/length'));
  
  Object.keys(fieldRules).forEach(function (fieldName) {
    var rules = fieldRules[fieldName];
    
    Object.keys(rules).forEach(function (validatorName) {
      var config = rules[validatorName];
      
      formValidator.field(fieldName).addRule(
        new Rule(formValidator.fieldValidator(validatorName), 
                 config));
    });
  });
  
  return formValidator;
}

module.exports = FormValidatorFactory;