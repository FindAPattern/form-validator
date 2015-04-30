var Validation = require('./Validation');

/**
 * Represents a field. 
 *
 * @constructor
 * @param {string} name - Name of field.
 */
function Field(name) {
  this.name = name;
  this.rules = [];
}

/**
 * Adds a rule to this field. 
 *
 * @param {Rule} rule - Rule to add.
 */
Field.prototype.addRule = function (rule) {
  this.rules.push(rule);
};

/**
 * Validates the rules stored in this field against field data. 
 *
 * @param {string} data - Field data to validate. 
 * @returns {Validation}
 */
Field.prototype.validate = function (formData) {
  // This should be refactored to use a version of map which 
  // accepts callbacks. If rule.evaluate ever becomes a 
  // deferred call, this method will fail. 
  return this.rules.map(function (rule) {
    var validation = new Validation();

    rule.evaluate(this.name, formData, function (err) {
      if (err) {
        if (is(Validation, err)) {
          validation = validation.merge(err);
        } else {
          validation.addError(this.name, err);
        }
      }
    }.bind(this));
    
    return validation;
  }.bind(this)).reduce(function (previous, current) {
    return previous.merge(current);
  });
};

function is(type, obj) {
    return obj !== undefined && obj !== null && obj.constructor === type;
}

module.exports = Field;