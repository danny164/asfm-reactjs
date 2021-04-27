import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

NotFound.propTypes = {

};

function NotFound(props) {
    return (
        <div>
            <h1>404 - Page not found !</h1>

            <Link to="/">
                Go Home
           </Link>

        </div>
    );
}

export default NotFound;
