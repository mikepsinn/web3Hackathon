import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer';
import AddClient from '../AddClient/AddClient';
import AddTrial from '../AddTrial/AddTrial';
import Find from '../Find/Find';
import Home from '../Home/Home';

function App() {

  const [show, setShow] = useState(false)
  const [user, setUser] = useState(userService.getUser()) // getUser decodes our JWT token, into a javascript object
  // this object corresponds to the jwt payload which is defined in the server signup or login function that looks like 
  // this  const token = createJWT(user); // where user was the document we created from mongo

  function handleSignUpOrLogin() {
    setUser(userService.getUser()) // getting the user from localstorage decoding the jwt
  }

  function handleLogout() {
    userService.logout();
    setUser({ user: null })
  }

  return (
    <div className="App">
      <Navbar user={userService.getUser()} handleLogout={handleLogout} setShow={setShow} show={show} />
      <Switch>
        <Route exact path="/login">
          <LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />
        </Route>
        <Route exact path="/register">
          <SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />
        </Route>
        <Route path="/index">
          <Home />
        </Route>
        {userService.getUser() ?
          <>
            <Switch>
              <Route exact path='/profile'>
                profile page here!
              </Route>
              <Route exact path='/addclient'>
                <AddClient />
              </Route>
              <Route exact path='/addtrial'>
                <AddTrial />
              </Route>
              <Route exact path='/find'>
                <Find />
              </Route>
            </Switch>
            <Route path="/">
              <Redirect to='/index' />
            </Route>
          </>
          :
          <Redirect to='/index' />
        }

      </Switch>
    </div>
  );
}

export default App;
