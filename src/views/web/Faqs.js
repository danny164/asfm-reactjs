import AsideLeft from 'components/pages/AsideLeft';
import AsideRight from 'components/pages/AsideRight';
import MainFaqs from 'components/pages/FAQs';
import React from 'react';

function Faqs(props) {
    return (
        <>
            <div className="header-fixed sidebar-enabled bg">
                <div className="d-flex flex-row flex-column-fluid page">
                    <AsideLeft />
                    <MainFaqs />
                    <AsideRight />
                </div>
            </div>
        </>
    );
}

Faqs.propTypes = {};

export default Faqs;
