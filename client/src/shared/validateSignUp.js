import M from 'materialize-css';

const validateSignUp = (value) => {

  let errors = {};
  if (!value.name) {
    errors.name = M.toast({ html: 'Name is required' });
  } else if (value.name.length < 3) {
    errors.name = M.toast({ html: 'Name need to be more than 3 characters' });
  }
  if (!value.email) {
    errors.email = M.toast({ html: 'Email address is required' });
  } else if (/^\S+@\S+\.\S+$/.test(value)) {
    errors.email = 'Email address is invalid or already exist';
  }
  if (!value.password) {
    errors.password = M.toast({ html: 'Password is required' });
  } else if (value.password.length <= 6) {
    errors.password = M.toast({ html: 'Password need to be more than 6 characters' });
  }

  return errors;
};

export default validateSignUp;