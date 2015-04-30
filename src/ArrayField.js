var Field = require('./Field');
var Validation = require('./Validation');
var util = require('util');

/**
 * Represents a field containing arrays of data. 
 *
 * @constructor
 * @param {string} name - Name of field.
 */
function ArrayField(name) {
  Field.call(this, name);
}

util.inherits(ArrayField, Field);

ArrayField.prototype.validate = function (formData) {
  var fieldData = formData[this.name];
  
  if (!util.isArray(fieldData)) return this._createListErrorValidation();
  
  var validations = [];
  
  fieldData.forEach(function (innerData, index) {
    formData[this.name] = innerData;
    
    var validation = Field.prototype.validate.apply(this, [formData]);
    
    validations.push(this._renameValidationErrors(
      validation, 
      this.name, 
      this.name + '[' + index + ']'
    ));
  }.bind(this));
  
  formData[this.name] = fieldData;
  
  var validation = Validation.merge.apply(null, validations);
  
  return validation;
};

ArrayField.prototype._renameValidationErrors = function (validation, oldPrefix, newPrefix) {
  var renamedValidation = new Validation();
  
  validation.errorFieldNames().forEach(function (fieldName) {
    var newFieldName = fieldName.indexOf(oldPrefix) === 0
                     ? newPrefix + fieldName.substring(oldPrefix.length)
                     : fieldName;
    
    validation.errors(fieldName).forEach(function (err) {
      renamedValidation.addError(newFieldName, err);
    });
  }.bind(this));
  
  return renamedValidation;
};

ArrayField.prototype._createListErrorValidation = function () {
  var validation = new Validation();
  validation.addError(this.name, this.name + ' isn\'t a list');
  return validation;
};

module.exports = ArrayField;