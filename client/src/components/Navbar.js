import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from './../shared/Auth-context';

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav>
      <div className='nav-wrapper white'>
        <Link to='/' className='brand-logo left'>Instagram</Link>
        <ul id='nav-mobile' className='right'>
          {isLoggedIn && (
            <li><NavLink to='/profile'>Profile</NavLink></li>
          )}
          {isLoggedIn && (
            <li><NavLink to='/addpost'>Add Post</NavLink></li>
          )}
          {!isLoggedIn && (
            <li><NavLink to='/login'>Login</NavLink ></li>
          )}
          {!isLoggedIn && (
            <li><NavLink to='/signup'>Signup</NavLink></li>
          )}
          {isLoggedIn && (
            <li><NavLink to='/login'><button className='btn waves-effect waves-light #c62828 red darken-3' onClick={logout}>Logout</button></NavLink></li>
          )}

        </ul>
      </div>
    </nav>
  );
};
export default Navbar;