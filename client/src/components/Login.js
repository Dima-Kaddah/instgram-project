import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useForm from './../hooks/form-hook';
import useHttpClient from './../hooks/http-hook';
import { AuthContext } from '../shared/Auth-context.js';
import { validateSignIn } from '../shared/validate';

const Login = () => {
  const auth = useContext(AuthContext);

  const [values, handleChange, handlerSubmit, errors] = useForm(authSubmitHandler, validateSignIn);

  const { isLoading, error, sendRequest } = useHttpClient();

  async function authSubmitHandler() {
    const url = `${process.env.REACT_APP_BACKEND_URL}/login`;

    const body = {
      email: values.email,
      password: values.password,
    };

    const request = {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    };

    let loginUser;

    try {
      loginUser = await sendRequest(
        url,
        request.method,
        request.body,
        request.headers
      );

      auth.login(loginUser.userId, loginUser.token);

    } catch (err) {
      console.log("can't login user", err);
    }
  };

  return (
    <div className='my-card'>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {!isLoading && !error && (
        <div className='card auth-card input-field'>
          <h2>Instagram</h2>
          <form onSubmit={handlerSubmit}>
            <input type="email" name='email' placeholder='email' value={values.email || ''} onChange={handleChange} className={`${errors.email ? 'inputErr inputForm' : 'inputForm'}`} />
            {errors.email && <p className='valErr'>{errors.email}</p>}
            <input type="password" name='password' placeholder='password' value={values.password || ''} onChange={handleChange} className={`${errors.password ? 'inputErr inputForm' : 'inputForm'}`} />
            {errors.password && <p className='valErr'>{errors.password}</p>}
            <button className='btn waves-effect waves-light #64b5f6 blue darken-1'>Login</button>
            <h6><Link to='/signup' className='switching'> Don't have an account?</Link></h6>
          </form>
        </div>)}
    </div >
  );
};
export default Login;