import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  name: null,
  token: null,
  login: () => { },
  logout: () => { }
});

export default AuthContext;