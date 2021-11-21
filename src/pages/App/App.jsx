import React, { useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
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
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

function App() {
  // MetaMask stuff
  const ethereum = window.ethereum
  const [currentWallet, setCurrentWallet] = useState()

  let currentAccount = null;
  ethereum
    .request({ method: 'eth_accounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
      // Some unexpected error.
      // For backwards compatibility reasons, if no accounts are available,
      // eth_accounts will return an empty array.
      console.error(err, 'here');
    });

  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
      setCurrentWallet(currentAccount)
    }
  }

  function connect() {
    ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
  }
  // end MetaMask
  const history = useHistory()
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
      <Navbar wallet={currentWallet} connect={connect} user={userService.getUser()} handleLogout={handleLogout} setShow={setShow} show={show} />
      <Switch>
        {/* {user !== null ? */}
        <Route exact path="/login">
          <LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />
        </Route>
        <Route exact path="/register">
          <SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />
        </Route>

        <Route path="/index">
          <Home />
        </Route>
        <Route exact path='/'>
          <Redirect to='/index' />
        </Route>
        {user ?
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
                <Find user={user} />
              </Route>
            </Switch>
          </>
          :
          <Redirect to='/index' />
        }

      </Switch>
    </div >
  );
}

export default App;
