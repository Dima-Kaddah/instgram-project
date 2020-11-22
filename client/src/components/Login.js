import React from 'react';

const Login = () => {

  return (
    <div className='my-card'>
      <div className='card auth-card input-field'>
        <h2>Instagram</h2>
        <input type='email' placeholder='email'></input>
        <input type='password' placeholder='password'></input>
        <button className='btn waves-effect waves-light #64b5f6 blue lighten-2'>Login</button>
      </div>
    </div >
  );
};
export default Login;