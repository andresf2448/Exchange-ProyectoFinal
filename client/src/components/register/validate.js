export function validate(input) {
  let error = {
    email: "",
    password: "",
    passwordValidate: "",
    isError: false
  };
  let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
  if (!input.email) {
    error.email = "Username is required"
    error.isError = true
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    error.email = "Username is invalid"
    error.isError = true
  }
  if (!input.password) {
    error.password = "Password is required";
  } else if (!regexPassword.test(input.password)) {
    error.password = "Password is invalid"
    error.isError = true
  }
  if (!input.passwordValidate) {
    error.passwordValidate = 'Repeat the password'
    error.isError = true
  } else if (input.password !== input.passwordValidate) {
    error.passwordValidate = 'Passwords don\'t match'
    error.isError = true
  }
  return error;
}