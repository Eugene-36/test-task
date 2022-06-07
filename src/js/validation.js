function checkRegExp(pattern, message, value) {
  return pattern.test(value) ? true : message;
}
function checkEqualPasswords(password1, password2, message) {
  console.log('password2', password1.value);
  console.log('password2', password2.value);

  console.log('message', message);

  return password1.value !== password2.value ? message : null;
}

module.exports = {
  firstName: [
    checkRegExp.bind(
      null,
      /^[A-Zа-я]{2,}$/i,
      'Field may contain only letters and not be less than 2 letters'
    ),
    checkRegExp.bind(
      null,
      /^[A-Zа-я]{2,64}$/i,
      'Field may contain only letters and not be more than 64 letters'
    ),
  ],
  lastName: [
    checkRegExp.bind(
      null,
      /^[A-Zа-я]{2,}$/i,
      'Field may contain only letters and not be less than 2 letters'
    ),
    checkRegExp.bind(
      null,
      /^[A-Zа-я]{2,64}$/i,
      'Field may contain only letters and not be more than 64 letters'
    ),
  ],
  email: [
    checkRegExp.bind(
      null,
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter valid email'
    ),
  ],
  phone: [
    checkRegExp.bind(null, /^[0-9]{8}$/, 'Field may contain only 8 digits'),
  ],
  password: [
    checkRegExp.bind(
      null,
      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\!\@\#\$\%\^\&\*\-])/,
      'Required at least one number (0-9), uppercase and lowercase letters (a-Z) and at least one special character (!@#$%^&*-)'
    ),
  ],
  password2: [
    checkRegExp.bind(
      null,
      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\!\@\#\$\%\^\&\*\-])/,
      'Required at least one number (0-9), uppercase and lowercase letters (a-Z) and at least one special character (!@#$%^&*-)'
    ),

    checkEqualPasswords.bind(
      null,
      password,
      password2,
      'Passwords must be equal !!!'
    ),
  ],
  zip: [
    checkRegExp.bind(
      null,
      /^[0-9]{5}$/,
      'Field must include 5 digits and only consist of numeric values'
    ),
  ],
};
