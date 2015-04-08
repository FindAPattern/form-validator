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
                       if (err) validation.addError(this.name, this._replaceTokens(err));
                     }.bind(this));
    
                     return validation;
                   }.bind(this))
                   .reduce(Validation.merge);
}

Field.prototype._replaceTokens = function (str) {
  return str.replace('{field.name}', this.name);
}

module.exports = Field;