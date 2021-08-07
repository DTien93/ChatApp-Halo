import React, { useState, useEffect } from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { auth } from '../firebase';
import firebase from "firebase/app";

Login.propTypes = {};

function Login(props) {
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError } = props;
    
    return (
        <div className="login-page">
            <div className="login-card">
                <h2>Halo Chat</h2>
                <section className="login">
                    <div className="loginContainer">
                        <label>Username</label>
                        <input
                            type="text"
                            autoFocus
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <p className="errorMsg">{emailError}</p>
                        <label>Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange = {e => setPassword(e.target.value)}
                        />
                        <p className="errorMsg">{passwordError}</p>
                        <div className="btnContainer">
                            {hasAccount ? (
                                <>
                                    <button onClick={handleLogin}>Sign in</button>
                                    <p>Don't have a account ?<span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                                </>
                            ) : (
                                <>
                                        <button onClick={handleSignup}>Sign up</button>
                                        <p>Have a account ?<span onClick ={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                                    <p></p>
                                </>    
                                )}
                        </div>
                    </div>
                </section>
                <div
                    className="login-button google"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                >
                    <GoogleOutlined /> Login with Google
                </div>
                <br/> <br/>
                <div
                    className="login-button facebook"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
                >
                    <FacebookOutlined /> Login with Facebook
                  
                </div>
            </div>   
       </div>
    );
}

export default Login;