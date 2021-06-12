import PropTypes from 'prop-types';
import React from 'react';
import InforSideRight from './AsideRight/InforSideRight';
import NotifySideRight from './AsideRight/NotifySideRight';

AsideRight.propTypes = {
    checkUpdateProfile: PropTypes.bool,
};

AsideRight.defaultProps = {
    checkUpdateProfile: false,
};

function AsideRight(props) {
    const { checkUpdateProfile } = props;

    return (
        <aside className="sidebar d-flex flex-row-auto flex-column">
            <div className="d-flex flex-column pb-10 pt-9 px-5 px-lg-10">
                <InforSideRight checkUpdateProfile={checkUpdateProfile} />
                <NotifySideRight />
            </div>
        </aside>
    );
}

export default AsideRight;
