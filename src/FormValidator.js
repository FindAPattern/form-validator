var Field = require('./Field');
var Rule = require('./Rule');
var Validation = require('./Validation');

/**
 * Represents a form validator.
 * 
 * @constructor
 */
function FormValidator() {
  this.validators = {};
  this.fields = {};
}

/**
 * Stores a reusable field validator for use by rules contained within 
 * this validator. 
 *
 * @param {string} validatorName - Name by which to retrieve validators.
 * @param {function} fieldValidator - Field validator to store. 
 * @returns {FormValidator}
 */
FormValidator.prototype.addFieldValidator = function (validatorName, fieldValidator) {
  this.validators[validatorName] = fieldValidator;
  
  return this;
}

/**
 * Retrieves a reusable field validator by its name. The validator returned 
 * will retrieve the internal validator upon calling it, allowing rules to 
 * evaluate validators added after the rules were created. 
 *
 * @param {string} validatorName - Name of validator to retrieve. 
 * @returns {function}
 */
FormValidator.prototype.fieldValidator = function (validatorName) {
  return function (fieldName, formData, settings, next) {
    return this.validators[validatorName](fieldName, formData, settings, next);
  }.bind(this);
}

/**
 * Checks of the form validator contains a field validator. 
 *
 * @param {string} validatorName - Name of validator to retrieve. 
 * @returns {Boolean}
 */
FormValidator.prototype.hasFieldValidator = function (validatorName) {
  return !!this.validators[validatorName];
}

/**
 * Retrieves a field by its name. 
 *
 * @param {string} fieldName - Name of field to retrieve. 
 * @returns {Field}
 */
FormValidator.prototype.field = function (fieldName) {
  return this.fields[fieldName] = (this.fields[fieldName] || new Field(fieldName));
}

/**
 * Retrieves a list of all field names stored by this validator. 
 *
 * @returns {string[]}
 */
FormValidator.prototype.fieldNames = function () {
  return Object.keys(this.fields);
}

/**
 * Validates all rules on all fields stored in this validation, using only 
 * the reusable validators stored in this validation, against form data 
 * structured as: {
 *   "fieldName": "fieldValue"
 * }. 
 *
 * @param {Object} form - Form data to validate. 
 * @returns {Validation}
 */
FormValidator.prototype.validate = function (form) {
  return this.fieldNames()
    .map(function (fieldName) {
      return this.field(fieldName).validate(form);
    }.bind(this))
    .reduce(Validation.merge);
}

module.exports = FormValidator;