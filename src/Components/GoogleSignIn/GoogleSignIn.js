import { Avatar } from '@material-ui/core';
import React from 'react';
import logo from '../../resources/logos/google.png';
import './GoogleSignIn.css';

const GoogleSignIn = (props) => {
    return (
            <button onClick={props.handleGoogleSignIn} className="login-through outline-remove">
                <Avatar alt="goggolelogo" src={logo} />
                <div className="prompt-container">
                    <p className="center-align">Continue with Google</p>
                </div>
            </button>
    );
};

export default GoogleSignIn;