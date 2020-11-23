import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

  return (
    <div className='my-card'>
      <div className='card auth-card input-field'>
        <h2>Instagram</h2>
        <input type='email' placeholder='email'></input>
        <input type='password' placeholder='password'></input>
        <button className='btn waves-effect waves-light #64b5f6 blue darken-1'>Login</button>
        <h6><Link to='/signup' className='switching'> Don't have an account?</Link></h6>
      </div>
    </div >
  );
};
export default Login;