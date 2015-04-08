/**
 * Evaluates if the length of a field's data falls within a bound. 
 *
 * @param {Object} fieldName - Name of field to evaluate.
 * @param {Object} formData - Form data against which to evaluate field.
 * @param {Object} config - Rule configuration. 
 * @param {function} next - Validation callback. 
 */
function length(fieldName, formData, config, next) {
  var fieldLength = !!formData[fieldName] ? formData[fieldName].length : 0;
  
  if (config.min > config.max) {
    return next(fieldName + ' has no valid values, since its minimum length exceeds its maximum length');
  } else if (fieldLength < config.min) {
    return next(fieldName + ' is shorter than ' + config.min + ' character(s)');
  } else if (fieldLength > config.max) {
    return next(fieldName + ' is longer than ' + config.max + ' character(s)');
  }
  
  next();
}

module.exports = length;