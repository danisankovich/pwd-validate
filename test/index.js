const pwdValidate = require('pwd-validate');
console.log(pwdValidate('tringtR2-re', {minLength: 5, maxLength: 30, hasNumber: true, hasUpperCase: true, hasSpecialCharacter: true, hasNoInvalidStrings: ['true', 'myname'], asdf:'asdf'}))
