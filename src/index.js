var FormValidatorFactory = require('./FormValidatorFactory');

module.exports = function (rules) {
  return new FormValidatorFactory().create(rules);
}