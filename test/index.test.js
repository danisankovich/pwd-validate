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
});
