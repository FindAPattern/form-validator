/**
 * Evaluates if field data contains a value. 
 *
 * @param {Object} fieldName - Name of field to evaluate.
 * @param {Object} formData - Form data against which to evaluate field.
 * @param {Object} config - Rule configuration. 
 * @param {function} next - Validation callback. 
 */
function required(fieldName, formData, config, next) {
  var fieldData = formData[fieldName];
  
  if (typeof fieldData === "string" ? fieldData.trim() === '' : !fieldData) {
    return next(fieldName + ' is required');
  }
  
  next();
}

module.exports = required;