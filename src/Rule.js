var Validation = require('./Validation');

/**
 * Represents a rule.
 * 
 * @constructor
 * @param {function} validator - Field validator. 
 * @param {Object} settings - Rule configuration. 
 */
function Rule(validator, settings) {
  this.validator = validator;
  this.settings = settings;
}

/**
 * Evaluates a rule by evaluating its validator against passed in field 
 * data, configured using the stored settings. 
 *
 * If the evaluate method succeeds, it will pass through to the next rule 
 * via the "next" callback. If the evaluate method fails, it will pass an 
 * error message as the first parameter into "next". 
 *
 * @param {Object} data - Field data to evaluate.
 * @param {function} next - Next validator to evaluate. 
 */
Rule.prototype.evaluate = function (fieldName, formData, next) {
  this.validator(fieldName, formData, this.settings, function (err) {
    if (err) {
      return next(err);
    }
    next();
  })
};

module.exports = Rule;