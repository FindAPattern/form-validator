var expect = require('chai').expect;
var buildSchemaValidator = require('../../src/fieldValidators/schema');
var Validation = require('../../src/Validation');
var validately = require('../../src');

describe('a schema field validator', function () {
  var schema = buildSchemaValidator(validately);
  
  it('fails when child validators don\'t pass', function (done) {
    schema(
      'sample', 
      {'sample': '10'}, 
      {'title': {'required': true}}, 
      function (err) {
        expect(err).to.be.a.instanceof(Validation);
        expect(err.errors('sample.title')[0]).to.equal('title is required');
        done();
      });
  });
  
  it('passes when child validators pass', function (done) {
    schema(
      'sample', 
      {'sample': {'title': 'I am here!'}}, 
      {'title': {'required': true}}, 
      function (err) {
        expect(err).to.not.exist;
        done();
      });
  });
  
  it('can nest itself', function (done) {
    schema(
      'sample', 
      {
        'sample': {
          'author': {
            'firstName': 'steve',
            'lastName': 'harold'
          }
        }
      }, 
      {
        'author': {
          'schema': {
            'firstName': { 'required': true },
            'lastName': { 'required': true }
          }
        }
      }, 
      function (err) {
        expect(err).to.not.exist;
        done();
      });
  });
  
  it('works in arrays', function (done) {
    schema(
      'sample', 
      {
        'sample': {
          'author': [{
            'firstName': 'steve',
            'lastName': 'harold'
          }, {
            'firstName': 'second',
            'lastName': 'guy'
          }]
        }
      }, 
      {
        'author': [{
          'schema': {
            'firstName': { 'required': true },
            'lastName': { 'required': true }
          }
        }]
      }, 
      function (err) {
        expect(err).to.not.exist;
        done();
      });
  });
});