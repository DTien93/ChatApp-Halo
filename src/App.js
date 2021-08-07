import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import firebase from "firebase/app";
import Login from './components/Login';
import Chats from './components/Chats';

function App() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInput = () => {
      setEmail('');
      setPassword('');
  }

  const clearError = () => {
      setEmailError('');
      setPasswordError('');
  }

  const handleLogin = () => {
      clearError();
      firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .catch((err) => {
              // eslint-disable-next-line default-case
              switch (err.code) {
                  case "auth/invalid-email":
                  case "auth/user-disabled":
                  case "auth/user-not-found":
                      setEmailError(err.message);
                      break;
                  case "auth/wrong-password":
                      setPasswordError(err.message);
                      break;
              }
          });
  };

  const handleSignup = () => {
      clearError();
      firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .catch((err) => {
              // eslint-disable-next-line default-case
              switch (err.code) {
                  case "auth/email-already-in-use":
                  case "auth/invalid-emai;":
                      setEmailError(err.message);
                      break;
                  case "auth/weak-password":
                      setPasswordError(err.message);
                      break;
              }
          });
  };

  const authListener = () => {
      firebase.auth().onAuthStateChanged(user => {
          if (user) {
              clearInput();
              setUser(user);
          } else {
              setUser('');
          }
      })
  }

  useEffect(() => {
      authListener();
  }, []);

  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
        <AuthProvider>
            <Switch>
              <Route path="/charts" component={Chats}/>
            {/* <Route path="/" component={ Login}/> */}
            <Login
              email={email}
              setEmail={setEmail}
              setPassword={setPassword}
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              emailError={emailError}
              passwordError={passwordError}
            />
            </Switch>
        </AuthProvider>
        </Router>
    </div>
  );
}

export default App;
