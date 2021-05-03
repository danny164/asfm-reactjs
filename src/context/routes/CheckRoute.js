import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import PropTypes from 'prop-types';

function CheckRoute({ component: Component, ...rest }) {

    return (
        <Route
            {...rest}
            render={(props) => {
                return localStorage.getItem('email') ? <Redirect to="/home" /> : <Component {...props} />;
            }}
        ></Route>
    );
}

export default CheckRoute;
