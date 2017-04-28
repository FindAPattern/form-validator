# validately
A simple form validation for NodeJS. 

(Created with love for [Plansible, a weight lifting journal
app](http://plansible.com).)

## Installation

```bash
npm install validately
```

## Getting started

Given a form: 

```html
<form>
  <input type="text" name="sample" />
  <button type="submit">Submit</button>
</form>
```

Posting this form to the server may result in post data which 
looks something like this: 

```js
var formData = {
  'sample': 'This is some sample text!'
};
```

If we want to validate that the "sample" field contains a value, 
we can create a form-validator object with a 'required' validator. 

```js
var validately = require('validately');

var sampleFormValidator = validately({
  'sample': { 'required': true }
});

var validation = sampleValidator.validate(formData);

if (validation.succeeded()) {
  // Happiness :)
} else {
  // Sadness :(
  
  validation.errors('sample').forEach(console.log);
}
```

If the validation fails, the console for this example should print: 

```sh
Sample is required
```

## Default field validators

| Name | Settings | Description |
|:--- |:---:|:--- |
| required | true | Ensures that a field contains a value. |
| matches | "target field name" | Ensures that a field's value matches a target field's value. |
| length | { min: Number, max: Number } | Ensures that the length of a field falls within a bound. |
| schema | { fieldName: { validatorName: config } } | Ensures that a field's contents match a schema. |

## Custom field validators

The form validation library supports custom field validators. 
Add them to the form validator: 

```js
var sampleFormValidator = validately({
  'sample': { 'custom': { 'key': 'value' } }
}).addFieldValidator('custom', customValidator);

function customValidator(fieldName, formData, config, next) {
  if (formData[fieldName] !== config['key']) {
    return next(fieldName + ' doesn\'t match ' + config['key']);
  }
  
  next();
}
```

This sample validator checks if a field matches the value stored 
in the rule's settings. If it doesn't, it will print out a message 
telling the user that the field does not match. 

Validators pass results into the "next" callback parameter. 
If a validator calls "next" with no parameters, then the containing 
field will not store any errors for that rule. If a validator passes 
a message into "next," then the containing field will add the 
message into a list of errors accessible on the final validation object. 

## Arrays

Configure validately to handle arrays by wrapping a field's configuration 
in an array: 

```js
var formData = {
  names: ['steve', 'dave']
};

var validator = validately({
  'names': [{
    'required': true,
    'length': { min: 2, max: 20 }
  }]
});

var validation = validator.validate(formData);

// ...
```

## Nested Objects

Configure validately to handle nested, structured objects by using the 
"schema" field validator. 

```js
var formData = {
  'name': {
    'first': 'john',
    'last': 'smith'
  }
};

var validator = validately({
  'name': {
    'schema': {
      'first': { required: true },
      'last': { required: true }
    }
  }
});

// ...
```

### Using custom validators in a nested schema

The "schema" validator uses the "validately" factory by default in order to 
validate nested objects. Adding custom validators requires overriding this 
default behavior by either deriving a custom factory from FormValidatorFactory, 
or by manually re-adding the 'schema' validator in your custom factory. 

#### Method 1: Overriding the default factory

```js
var util = require('util');
var FormValidatorFactory = require('validately').factory;

function CustomFormValidatorFactory() {
  FormValidatorFactory.call(this);
}

util.inherits(CustomFormValidatorFactory, FormValidatorFactory);

CustomFormValidatorFactory.prototype.create = function (fieldRules) {
  var validator = FormValidatorFactory.prototype.create.call(this, fieldRules);
  
  // validator.addFieldValidator('custom', ...);
  
  return validator;
};

var sampleValidator = new CustomFormValidatorFactory().create({
  'fieldName': { 'custom' : true }
});

sampleValidator.validate(formData);
```

#### Method 2: Re-adding the 'schema' validator

```js
var validately = require('validately');
var buildSchemaValidator = require('validately').validators.buildSchemaValidator;
 
function myValidator(fieldRules) {
  return validately(fieldRules).addFieldValidator('schema', buildSchemaValidator(myValidator));
}

var sampleValidator = myValidator({
  'fieldName': { 'custom' : true }
});

sampleValidator.validate(formData);
```

## Suggestions

### Add custom validators using a factory method

If you make custom validators, you may want to decorate the "validator" 
factory method with your own. 

```js
// myValidator.js
var validately = require('validately');

function myValidator(fieldRules) {
  return validately(fieldRules).addFieldValidator('custom', customValidator);
}
```

```js
// sampleRoutes.js
var myValidator = require('./myValidator');

var sampleFormValidator = myValidator({
  'fieldName': { 'custom': true }
});
```

### Split validators into reusable modules

```js
// userFormValidator.js
var validately = require('validately');

var userFormValidator = validately({
  'username': {required: true, length: {min: 4, max: 12}},
  'email': {required: true}
});

module.exports = userFormValidator;
```

```js
// routes.js
var userFormValidator = require('./userFormValidator');

// ... etc ...
```

## Documentation

Full documentation for all public classes and methods exposed by this 
project can be found in the "dist/docs" folder. 
