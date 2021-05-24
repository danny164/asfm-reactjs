import React from 'react';
import PropTypes from 'prop-types';
import AsideRight from 'components/pages/AsideRight';
import AsideLeft from 'components/pages/AsideLeft';
import MainFeedback from 'components/pages/Feedback';

function Feedback(props) {
    return (
        <>
            <div className="header-fixed sidebar-enabled bg">
                <div className="d-flex flex-row flex-column-fluid page">
                    <AsideLeft />
                    <MainFeedback />
                    <AsideRight />
                </div>
            </div>
        </>
    );
}

Feedback.propTypes = {};

export default Feedback;
