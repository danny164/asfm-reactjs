import AsideLeft from 'components/pages/AsideLeft';
import AsideRight from 'components/pages/AsideRight';
import MainFeedback from 'components/pages/Feedback';
import React from 'react';

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