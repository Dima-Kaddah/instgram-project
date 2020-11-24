import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useForm from './../hooks/form-hook';
import useHttpClient from './../hooks/http-hook';
import { AuthContext } from '../shared/Auth-context.js';
import { validateSignUp } from '../shared/validate';

const Signup = () => {
  const auth = useContext(AuthContext);

  const [values, handleChange, handlerSubmit, errors] = useForm(authSubmitHandler, validateSignUp);

  const { isLoading, error, sendRequest } = useHttpClient();

  async function authSubmitHandler() {
    const url = `${process.env.REACT_APP_BACKEND_URL}/signup`;

    const body = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    const request = {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    };

    let createUser;

    try {
      createUser = await sendRequest(
        url,
        request.method,
        request.body,
        request.headers
      );

      auth.login(createUser.userId, createUser.token);

    } catch (err) {
      console.log("can't create user", err);
    }
  };

  return (
    <React.Fragment>
      <div className='my-card'>
        {error && <div>{error}</div>}
        {isLoading && <div>Loading...</div>}
        {!isLoading && !error && (
          <div className='card auth-card input-field'>
            <h2>Instagram</h2>
            <form onSubmit={handlerSubmit}>
              <input type='text' name='name' placeholder='name' value={values.name || ''} onChange={handleChange} className={`${errors.name ? 'inputErr inputForm' : 'inputForm'}`} autoFocus />
              {errors.name && <p className='valErr'>{errors.name}</p>}
              <input type='email' name='email' placeholder='email' value={values.email || ''} onChange={handleChange} className={`${errors.email ? 'inputErr inputForm' : 'inputForm'}`} />
              {errors.email && <p className='valErr'>{errors.email}</p>}
              <input type='password' name='password' placeholder='password' value={values.password || ''} onChange={handleChange} className={`${errors.password ? 'inputErr inputForm' : 'inputForm'}`} />
              {errors.password && <p className='valErr'>{errors.password}</p>}
              <button className='btn waves-effect waves-light #64b5f6 blue darken-1'>Signup</button>
              <h6><Link to='/login' className='switching'> Already have an account?</Link></h6>
            </form>
          </div>)}
      </div>
    </React.Fragment>
  );
};
export default Signup;