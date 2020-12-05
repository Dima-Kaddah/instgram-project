import M from 'materialize-css';

const validateSignUp = (value) => {

  let errors = {};
  if (!value.name) {
    errors.name = M.toast({ html: 'Name is required', classes: '#c62828 red darken-3' });
  } else if (value.name.length < 3) {
    errors.name = M.toast({ html: 'Name need to be more than 3 characters', classes: '#c62828 red darken-3' });
  }
  if (!value.email) {
    errors.email = M.toast({ html: 'Email address is required', classes: '#c62828 red darken-3' });
  } else if (/^\S+@\S+\.\S+$/.test(value)) {
    errors.email = M.toast({ html: 'Email address is invalid', classes: '#c62828 red darken-3' });
  }
  if (!value.password) {
    errors.password = M.toast({ html: 'Password is required', classes: '#c62828 red darken-3' });
  } else if (value.password.length <= 6) {
    errors.password = M.toast({ html: 'Password need to be more than 6 characters', classes: '#c62828 red darken-3' });
  }

  return errors;
};

export default validateSignUp;