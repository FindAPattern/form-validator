var Validation = require('../Validation');

/**
 * Builds a schema validator. 
 *
 * @param {FormValidatorFactory} validatorFactory - Validator factory to use in built schema validator.
 */
function buildSchemaValidator(validatorFactory) {
  /**
  * Evaluates if field data matches a validation 
  *
  * @param {Object} fieldName - Name of field to evaluate.
  * @param {Object} formData - Form data against which to evaluate field.
  * @param {Object} config - Rule configuration. 
  * @param {function} next - Validation callback. 
  */
  return function schema(fieldName, formData, config, next) {
    var fieldData = formData[fieldName];
    
    var validator = validatorFactory(config);

    var validation = validator.validate(fieldData);
    
    if (!validation.succeeded()) {
      validation = prefixValidationErrorFields(
        validation, 
        Object.keys(config), 
        fieldName + '.'
      );
      
      next(validation);
    } else {
      next();
    }
  };
}

function prefixValidationErrorFields(validation, fieldNames, prefix) {
  var renamedValidation = new Validation();

  fieldNames.forEach(function (fieldName) {
    validation.errors(fieldName).forEach(function (err) {
      renamedValidation.addError(prefix + fieldName, err);
    });
  });

  return renamedValidation;
}

module.exports = buildSchemaValidator;