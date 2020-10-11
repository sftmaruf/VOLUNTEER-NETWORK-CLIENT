import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { signedUserContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {

    const [signedUser, setSignedUser] = useContext(signedUserContext);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                signedUser.email ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/signin",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
};

export default PrivateRoute;