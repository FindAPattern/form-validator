/**
 * Represents the results of validating a form.
 * @constructor
 */
function Validation() {
  this.fieldErrors = {};
}

/**
 * Stores an error message for a field, categorized by the field name.
 * @param {string} fieldName - Name of the field.
 * @param {string} error - Error message.
 * @returns {Validation}
 */
Validation.prototype.addError = function (fieldName, error) {
  this.fieldErrors[fieldName] = this.fieldErrors[fieldName] || [];
  this.fieldErrors[fieldName].push(error);
  
  return this;
};

/**
 * Retrieves the list of errors stored for a field name. Returns 
 * an empty array if no errors are stored. 
 * 
 * @param {string} fieldName - Name of the field. 
 * @returns {string[]}
 */
Validation.prototype.errors = function (fieldName) {
  return this.fieldErrors[fieldName] || [];
};

/**
 * Retrieves the list of error field names. Returns
 * an empty array if no errors are stored. 
 * 
 * @returns {string[]}
 */
Validation.prototype.errorFieldNames = function () {
  return Object.keys(this.fieldErrors);
};

/**
 * Merges two validations. If both validations contain errors for 
 * the same field, the second validation's errors will overwrite the 
 * first. 
 *
 * This operation does not modify either validation. It creates a 
 * new validation which contains the combined information from both 
 * input validations. 
 *
 * @param {Validation} Validation to merge. 
 * @returns {Validation}
 */
Validation.prototype.merge = function (validation) {
  var result = new Validation();
  
  this._copyErrorsTo(result);
  validation._copyErrorsTo(result);
  
  return result;
};

/**
 * Merges a list of validations, cascading conflicting field errors 
 * from the end of the array to the beginning. 
 *
 * This operation does not modify any input validations. It creates a 
 * new validation which contains the combined information from all 
 * input validations. 
 *
 * @param {Validation} Validation to merge. 
 * @returns {Validation}
 */
Validation.merge = function () {
  var validations = convertArgumentsToArray(arguments);

  return validations.reduce(function (previous, current) {
    return previous.merge(current);
  });
};

/**
 * Determines if the validation succeeded. 
 *
 * @returns {Boolean}
 */
Validation.prototype.succeeded = function () {
  return 0 === Object.keys(this.fieldErrors).map(function (fieldName) {
    return this.errors(fieldName).length;
  }.bind(this)).reduce(function (previous, current) {
    return previous + current;
  }, 0);
};

Validation.prototype._copyErrorsTo = function (validation) {
  Object.keys(this.fieldErrors).forEach(function (fieldName) {
    this.errors(fieldName).forEach(function (error) {
      validation.addError(fieldName, error);
    });
  }.bind(this));
};

function convertArgumentsToArray(arguments) {
  var args = [];
  
  for (var key in arguments) {
    args.push(arguments[key]);
  }
  
  return args;
}

module.exports = Validation;