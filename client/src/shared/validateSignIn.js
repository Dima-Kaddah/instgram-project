import M from 'materialize-css';

const validateSignIn = (value) => {

  let errors = {};
  if (!value.email) {
    errors.email = M.toast({ html: 'Email address is required', classes: '#c62828 red darken-3' });
  } else if (/^\S+@\S+\.\S+$/.test(value)) {
    errors.email = M.toast({ html: 'Email address is invalid or not exist', classes: '#c62828 red darken-3' });
  }
  if (!value.password) {
    errors.password = M.toast({ html: 'Password is required', classes: '#c62828 red darken-3' });
  } else if (value.password.length <= 6) {
    errors.password = M.toast({ html: 'Password need to be more than 6 characters', classes: '#c62828 red darken-3' });
  }
  return errors;
};

export default validateSignIn;