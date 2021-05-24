import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function BanRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) => {
                if (localStorage.getItem('role') && localStorage.getItem('role') === '0' && currentUser) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to="/login?message=loginRequired" />;
                }
            }}
        ></Route>
    );
}

export default BanRoute;
