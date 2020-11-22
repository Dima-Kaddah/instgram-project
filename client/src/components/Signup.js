import React from 'react';

const Signup = () => {

  return (
    <div className='my-card'>
      <div className='card auth-card input-field'>
        <h2>Instagram</h2>
        <input type='text' placeholder='name'></input>
        <input type='email' placeholder='email'></input>
        <input type='password' placeholder='password'></input>
        <button className='btn waves-effect waves-light #64b5f6 blue lighten-2'>Signup</button>
      </div>
    </div >
  );
};
export default Signup;