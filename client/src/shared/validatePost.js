import M from 'materialize-css';

const validatePost = (value) => {

  let errors = {};
  if (!value.title) {
    errors.title = M.toast({ html: 'title is required', classes: '#c62828 red darken-3' });
  } else if (value.title.length <= 3) {
    errors.title = M.toast({ html: 'title need to be more than 3 characters', classes: '#c62828 red darken-3' });
  }
  if (!value.description) {
    errors.description = M.toast({ html: 'description is required', classes: '#c62828 red darken-3' });
  } else if (value.description.length <= 6) {
    errors.description = M.toast({ html: 'description need to be more than 6 characters', classes: '#c62828 red darken-3' });
  }
  return errors;
};

export default validatePost;