import M from 'materialize-css';

const validateSignIn = (value) => {

  let errors = {};
  if (!value.email) {
    errors.email = M.toast({ html: 'Email address is required' });
  } else if (/^\S+@\S+\.\S+$/.test(value)) {
    errors.email = 'Email address is invalid or not exist';
  }
  if (!value.password) {
    errors.password = M.toast({ html: 'Password is required' });
  } else if (value.password.length <= 6) {
    errors.password = M.toast({ html: 'Password need to be more than 6 characters' });
  }
  return errors;
};

export default validateSignIn;