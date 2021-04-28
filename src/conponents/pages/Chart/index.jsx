import React from 'react';
import PropTypes from 'prop-types';
import AsideLeft from '../AsideLeft';
import HeaderMobile from '../../../conponents/common/HeaderMobile';
import Footer from '../../../conponents/common/Footer';

function Chart(props) {
    return (
        <div className="header-fixed sidebar-enabled bg">
            <div className="d-flex flex-row flex-column-fluid page">
                <AsideLeft />
                <main className="d-flex flex-column flex-row-fluid wrapper min-vh-100">
                    <HeaderMobile />
                    <section className="card-body">
                        <span className="label label-xl label-inprogress label-inline ml-3 py-4 flex-shrink-0 cursor-pointer">Chart 1</span>
                        <span className="label label-xl label-picked label-inline ml-3 py-4 flex-shrink-0 cursor-pointer">Chart 2</span>
                    </section>
                    <Footer />
                </main>
            </div>
        </div>
    );
}

Chart.propTypes = {};

export default Chart;
