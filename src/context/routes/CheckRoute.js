import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function CheckRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth();
    return (
        <Route
            {...rest}
            render={(props) => {
                if (localStorage.getItem('role') && localStorage.getItem('role') !== '0' && currentUser) {
                    return <Redirect to="/home" />;
                } else {
                    if (localStorage.getItem('role') && localStorage.getItem('role') === '0') {
                        return <Component {...props} />;
                    } else {
                        return <Component {...props} />;
                    }
                }
            }}
        ></Route>
    );
}

export default CheckRoute;
