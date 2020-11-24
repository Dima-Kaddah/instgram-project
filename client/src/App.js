import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import AddPost from './components/AddPost';
import { AuthContext } from './shared/Auth-context';
import { useAuth } from './hooks/auth-hook';


import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

const App = () => {
  const { token, login, logout } = useAuth();
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path='/addpost' exact>
          <AddPost />
        </Route>
        <Route path='/profile' exact>
          <Profile />
        </Route>
        <Route path='/' exact>
          <Home />
        </Route>
        <Redirect to='/' />
      </Switch>

    );

  } else {
    routes = (
      <Switch>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/signup' exact>
          <Signup />
        </Route>
        {/* <Route path='/' exact>
          <Home />
        </Route> */}
        <Redirect to='/login' />
      </Switch>

    );
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, login: login, logout: logout }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <Navbar />
            <main>
              {routes}
            </main>
          </Router>
        </Suspense>
      </AuthContext.Provider >
    </div >
  );
};

export default App;
