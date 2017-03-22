'use strict';

const getSpecifications = (options) => {
  const validOptions = [
    'minLength', 'maxLength', 'hasNumber', 'hasLowerCase', 'hasUpperCase', 'hasSpecialCharacter', 'hasNoInvalidStrings',
  ];

  const validValues = {
    minLength: 'number',
    maxLength: 'number',
    hasNumber: 'boolean',
    hasLowerCase: 'boolean',
    hasUpperCase: 'boolean',
    hasSpecialCharacter: 'boolean',
  }

  const specifications = {};

  validOptions.forEach((option) => {
    if (options[option]) {
      if (option === 'hasNoInvalidStrings') {
        if (!Array.isArray(options[option])) {
          throw new Error(`${option} must be an array`);
        }
      }
      else {
        if (typeof options[option] !== validValues[option]) {
          throw new Error(`${option} must be a ${validValues[option]}`)
        }
      }
      specifications[option] = options[option];
    }
  });

  return specifications;
}

const isEmpty = (obj) => {
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) return false;
  }
  return true;
}

const checkMinLength = (password, minLength) => {
  if (password.length < minLength) {
    return `Password does not contain enough characters. Password contains ${password.length} characters, and requires at least ${minLength}`;
  }
}

const checkMaxLength = (password, maxLength) => {
  if (password.length > maxLength) {
    return `Password contains too many characters. Password contains ${password.length} characters, and allows up to ${maxLength} characters`;
  }
}

const checkHasNumber = password => /[0-9]/.test(password);

const checkHasLowerCase = password => /[a-z]/.test(password);

const checkHasUpperCase = password => /[A-Z]/.test(password);

const checkHasSpecialCharacter = password => /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(password);

const checkHasNoInvalidStrings = (password, badStrings) => {
  const badStringsFound = [];
  badStrings.forEach((c) => {
    if (password.indexOf(c) > -1) badStringsFound.push(c);
  })
  return badStringsFound;
}

const pwdValidate = (password, options) => {
  const errors = {};

  if (typeof password !== 'string') {
    errors.passwordType = 'Password must be a string';
  }
  if (options) {
    if (typeof options !== 'object' || Array.isArray(options)) {
      errors.optionsType = 'Optional arguments must be passed as an object';
    }

    const {
      minLength,
      maxLength,
      hasNumber,
      hasLowerCase,
      hasUpperCase,
      hasSpecialCharacter,
      hasNoInvalidStrings,
    } = getSpecifications(options);

    if (minLength) {
      if (checkMinLength(password, minLength)) errors.minLength = checkMinLength(password, minLength);
    }
    if (maxLength) {
      if (checkMaxLength(password, maxLength)) errors.maxLength = checkMaxLength(password, maxLength);
    }
    if (minLength && maxLength) {
      if (minLength >= maxLength) {
        errors.equalLength = 'minLength cannot be equal to or greater than maxLength';
      }
    }

    if (hasNumber) {
      if (!checkHasNumber(password)) errors.hasNumber = 'Password must contain at least one number';
    }

    if (hasLowerCase) {
      if (!checkHasLowerCase(password)) errors.hasLowerCase = 'Password must contain at least one lower case letter';
    }

    if (hasUpperCase) {
      if (!checkHasUpperCase(password)) errors.hasUpperCase = 'Password must contain at least one upper case letter';
    }

    if (hasSpecialCharacter) {
      if (!checkHasSpecialCharacter(password)) errors.hasSpecialCharacter = 'Password must contain at least one special character';
    }

    if (hasNoInvalidStrings) {
      if (checkHasNoInvalidStrings(password, hasNoInvalidStrings).length > 0) {
        errors.hasNoInvalidStrings = `Password cannot contain the following strings: [${hasNoInvalidStrings.join(', ')}]`;
      }
    }  
  }

  if (!isEmpty(errors)) {
    return {errorMessages: errors, isValid: false};
  } else {
    return { password, isValid: true };
  }

}

module.exports = pwdValidate;
