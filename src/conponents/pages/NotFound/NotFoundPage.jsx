import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
function NotFoundPage(props) {
    return (
        <div>
            <h1>Not Found Page</h1>

            <Link to="/">Go Home</Link>
        </div>
    );
}

NotFoundPage.propTypes = {};

export default NotFoundPage;
