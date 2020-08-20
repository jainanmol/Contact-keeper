import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './Components/layout/Navbar';
import Home from './Components/Pages/Home';
import About from './Components/Pages/About';
import ContactState from '../src/Context/Contact/ContactState';
import AuthState from '../src/Context/Auth/AuthState';
import AlertState from '../src/Context/Alert/AlertState';
import Register from '../src/Components/Auth/Register';
import Login from '../src/Components/Auth/Login';
import Alerts from './Components/layout/Alerts';

const App= ()=> {
  return (
    <AuthState>
    <ContactState>
      <AlertState>
    <Router>
    <Fragment>
        <Navbar title='Contact Keeper' icon='fas fa-id-card-alt' />
        <div className="container">
          <Alerts />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </div>
    </Fragment>
    </Router>
    </AlertState>
    </ContactState>
    </AuthState>
  );
}

export default App;
