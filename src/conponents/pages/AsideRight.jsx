import PropTypes from 'prop-types';
import React from 'react';
import InforSideRight from './AsideRight/InforSideRight';
import NotifySideRight from './AsideRight/NotifySideRight';

AsideRight.propTypes = {
    name: PropTypes.string,
    name2: PropTypes.object,
    Notification: PropTypes.object,
};

AsideRight.defaultProps = {
    name: '',
    name2: null,
    Notification: null,
};

function AsideRight(props) {
    const { Notification } = props;

    return (
        <aside className="sidebar d-flex flex-row-auto flex-column">
            <div className="d-flex flex-column pb-10 pt-9 px-5 px-lg-10">
                <InforSideRight />
                <NotifySideRight Notification={Notification} />
            </div>
        </aside>
    );
}

export default AsideRight;
