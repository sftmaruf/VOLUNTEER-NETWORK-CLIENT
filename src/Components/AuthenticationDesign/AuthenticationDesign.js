import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { storeAuthTokens, googleSignIn } from '../AuthenticationMechanism/AuthenticationMechanism';
import GoogleSignIn from '../GoogleSignIn/GoogleSignIn';
import './AuthenticationDesign.css';
import { pushSessionStorage } from '../SessionStorageMechanism/SessionStorageMechanism';
import { context, signedUserContext } from '../../App';

const AuthenticationDesign = (props) => {

    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: '/' } };

    const [signedUser, setSignedUser] = useContext(signedUserContext);
    const [isHome, setIsHome, activeCard, setActiveCard, token, setToken] = useContext(context);
    const { name, email } = signedUser;
    const { type } = props;

    const { register, handleSubmit, errors } = useForm();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(newUser => {
                if (newUser.uid) {
                    loginProcedure(newUser);
                }
            });
    }

    const loginProcedure = (newUser) => {
        storeAuthTokens()
            .then(idToken => {
                setToken(idToken);
                pushSessionStorage('authToken', idToken);
                setSignedUser(newUser);
                pushSessionStorage('signeduser', newUser);
                alert('Signin Successful');
                history.replace(from);
            });
    }

    const onSubmit = (data) => {
        data.image = activeCard.image;
        const registeredData = {
            data: data,
            dateOfRegistration: getDate(),
        };
        fetch('https://cryptic-sands-30815.herokuapp.com/registeredVolunteer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registeredData)
        })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    history.replace('/registeredProfile');
                }
            });
    }

    const getDate = () => {
        const date = new Date();
        const processedDate =
            `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        return processedDate;
    }


    return (
        <div className="login-container">
            <div className="login-component">
                <div className="authentication-card alignment">
                    <form onSubmit={handleSubmit(onSubmit)}> {/*handleSubmit("")*/}

                        <h6 style={{ textAlign: type === 'Login With' && 'center' }}>{type}</h6><br />

                        {
                            type === 'Registration as a Volunteer' &&
                            <span>
                                <input className="login-input-design" name="fullname" defaultValue={name} ref={register({ required: true })} placeholder="Full Name" /><br />

                                <input className="login-input-design" name="username" defaultValue={email} ref={register({ required: true, pattern: /\S+@\S+.\S+/ })} placeholder="Username or Email" /><br />
                                {errors.username && <span className="warning-color">Email address isn't valid</span>}

                                <input id="date" type="date" className="login-input-design" name="date" ref={register({ required: true })} placeholder="Date" autoComplete='off' /><br />

                                <input type="text" className="login-input-design" name="description" defaultValue="" ref={register} placeholder="Description" required /><br />
                                <input type="voluteerWork" className="login-input-design" name="chooseWork" defaultValue={Object.keys(activeCard).length === 0 ? '' : activeCard.name} ref={register} placeholder="Choose a work" required /><br />

                                <div className="submit-button-align">
                                    <input className="button-color" type="submit" id="submit" value='Registration' />
                                </div>
                            </span>
                        }
                    </form>
                    {
                        type === 'Login With' &&
                        <div className="sign-with-google-container">
                            <GoogleSignIn handleGoogleSignIn={handleGoogleSignIn} logo="google"></GoogleSignIn> {/*handleGoogleSignIn={handleGoogleSignIn}*/}
                            <p className="center-align">Don't have an account?<Link to='/signup' className="text-color">Create an account</Link></p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default AuthenticationDesign;