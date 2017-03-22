const { expect, should, assert } = require('chai');
const pwdValidate = require('../index');

describe('Validator', () => {
  it('Should validate a password and return an object {password, isvalid}', () => {
    const passwordObject = pwdValidate('tringtR2-re', {minLength: 5, maxLength: 30, hasNumber: true, hasUpperCase: true, hasLowerCase: true, hasSpecialCharacter: true, hasNoInvalidStrings: ['true', 'myname']});
    expect(passwordObject.isValid).to.equal(true);
    expect(passwordObject.password).to.equal('tringtR2-re');
  });
  describe('Validate Password Type (no options)', () => {
    it('Should validate that the password is a string(no options)', () => {
      const passwordObject = pwdValidate('tringtR2-re');
      expect(passwordObject.isValid).to.equal(true);
      expect(passwordObject.password).to.equal('tringtR2-re');
    });
    it('Should fail if the password is not a string(no options)', () => {
      const passwordObject = pwdValidate(123);
      expect(passwordObject.isValid).to.equal(false);
      expect(passwordObject.errorMessages.passwordType).to.equal('Password must be a string');
    });
  });
  describe('Validate Password with options', () => {
    // const passwordObject = pwdValidate('tringtR2-re', {hasSpecialCharacter: true, hasNoInvalidStrings: ['true', 'myname']});
    it('Should validate min length', () => {
      const passwordObject = pwdValidate('trin', {minLength: 5});

      expect(passwordObject.isValid).to.equal(false);
      expect(passwordObject.errorMessages.minLength).to.equal('Password does not contain enough characters. Password contains 4 characters, and requires at least 5');
    });

    it('Should validate max length', () => {
      const passwordObject = pwdValidate('string', {maxLength: 5});
      expect(passwordObject.isValid).to.equal(false);
      expect(passwordObject.errorMessages.maxLength).to.equal('Password contains too many characters. Password contains 6 characters, and allows up to 5 characters');
    });

    it('Should validate that password has number', () => {
      const passwordObject = pwdValidate('string', {hasNumber: true});
      expect(passwordObject.isValid).to.equal(false);
      expect(passwordObject.errorMessages.hasNumber).to.equal('Password must contain at least one number');
    });

    it('Should validate that password has at least one lower case letter', () => {
      const passwordObject = pwdValidate('STRING', {hasLowerCase: true});
      expect(passwordObject.isValid).to.equal(false);
      expect(passwordObject.errorMessages.hasLowerCase).to.equal('Password must contain at least one lower case letter');
    });

    it('Should validate that password has at least one upper case letter', () => {
      const passwordObject = pwdValidate('string', {hasUpperCase: true});
      expect(passwordObject.isValid).to.equal(false);
      expect(passwordObject.errorMessages.hasUpperCase).to.equal('Password must contain at least one upper case letter');
    });

    it('Should validate that password has at least one special character', () => {
      const passwordObject = pwdValidate('string', {hasSpecialCharacter: true});
      expect(passwordObject.isValid).to.equal(false);
      expect(passwordObject.errorMessages.hasSpecialCharacter).to.equal('Password must contain at least one special character');
    });

    it('Should validate that password does not contain invalid strings', () => {
      const passwordObject = pwdValidate('truedat', {hasNoInvalidStrings: ['true', 'myname']});
      expect(passwordObject.isValid).to.equal(false);
      expect(passwordObject.errorMessages.hasNoInvalidStrings).to.equal('Password cannot contain the following strings: [true, myname]');
    });

  });
});
