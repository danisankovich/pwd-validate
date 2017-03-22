install the package
```
$ npm install --save pwd-validate
```

```
// option: type

const options = {
  maxLength: number, //optional
  minLength: number, //optional
  hasNumber: boolean, //optional
  hasLowerCase: boolean, //optional
  hasUpperCase: boolean, //optional
  hasNoInvalidStrings: array, //optional
}

```

example usage
```

  const pwdValidate = require('pwd-validate');

  console.log(
    pwdValidate('Test23!@#', {
      minLength: 5,
      maxLength: 30,
      hasNumber: true,
      hasUpperCase: true,
      hasSpecialCharacter: true,
      hasNoInvalidStrings: ['myname'],
    })
  )

  // returns { password: 'Test23!@#', isValid: true }
}
```

example failure
```

  const pwdValidate = require('pwd-validate');

  console.log(
    pwdValidate('badtest', {
      minLength: 5,
      maxLength: 30,
      hasNumber: true,
      hasUpperCase: true,
      hasSpecialCharacter: true,
      hasNoInvalidStrings: ['myname'],
    })
  )

//  returns {
//    errorMessages : {
//      hasNumber: 'Password must contain at least one number',
//      hasUpperCase: 'Password must contain at least one upper case letter',
//      hasSpecialCharacter: 'Password must contain at least one special character',
//      hasNoInvalidStrings: 'Password cannot contain the following strings: ["myname"]',
//    },
//    isValid: false,
//  }
}
```
