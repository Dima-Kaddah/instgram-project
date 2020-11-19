import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';


import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/profile' exact>
              <Profile />
            </Route>
            <Route path='/login' exact>
              <Login />
            </Route>
            <Route path='/signup' exact>
              <Signup />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
