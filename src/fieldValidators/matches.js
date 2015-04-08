/**
 * Evaluates if field data matches a target field's data. 
 *
 * @param {Object} fieldName - Name of field to evaluate.
 * @param {Object} formData - Form data against which to evaluate field.
 * @param {Object} config - Rule configuration. 
 * @param {function} next - Validation callback. 
 */
function matches(fieldName, formData, config, next) {
  var targetFieldName = config;
  
  if (formData[fieldName] !== formData[targetFieldName]) {
    return next(fieldName + ' doesn\'t match ' + targetFieldName);
  }
  
  next();
}

module.exports = matches;