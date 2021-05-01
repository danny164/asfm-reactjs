import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import PropTypes from 'prop-types';

function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) => {
                return currentUser ? <Component {...props} /> : <Redirect to="/login?message=loginRequired" />;
            }}
        ></Route>
    );
}

export default PrivateRoute;
