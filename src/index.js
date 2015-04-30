var FormValidatorFactory = require('./FormValidatorFactory');

function validately(rules) {
  return new FormValidatorFactory().create(rules);
}

validately.factory = FormValidatorFactory;
validately.validators = {
  'required': require('./fieldValidators/required'),
  'matches': require('./fieldValidators/matches'),
  'length': require('./fieldValidators/length'),
  'buildSchemaValidator': require('./fieldValidators/schema')
};

module.exports = validately;