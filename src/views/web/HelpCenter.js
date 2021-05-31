import AsideLeft from 'components/pages/AsideLeft';
import AsideRight from 'components/pages/AsideRight';
import MainHelpCenter from 'components/pages/HelpCenter';
import React from 'react';

function HelpCenter(props) {
    return (
        <>
            <div className="header-fixed sidebar-enabled bg">
                <div className="d-flex flex-row flex-column-fluid page">
                    <AsideLeft />
                    <MainHelpCenter />
                    <AsideRight />
                </div>
            </div>
        </>
    );
}

HelpCenter.propTypes = {};

export default HelpCenter;
