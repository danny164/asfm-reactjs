import AsideLeft from 'components/pages/AsideLeft';
import AsideRight from 'components/pages/AsideRight';
import MainMailbox from 'components/pages/Mailbox';
import React from 'react';

function Mailbox(props) {
    return (
        <div className="header-fixed sidebar-enabled bg">
            <div className="d-flex flex-row flex-column-fluid page">
                <AsideLeft />
                <MainMailbox />
                <AsideRight />
            </div>
        </div>
    );
}

Mailbox.propTypes = {};

export default Mailbox;
