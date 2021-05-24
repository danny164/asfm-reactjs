import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

function MainFaqs(props) {
    return (
        <>
            <main className="d-flex flex-column flex-row-fluid wrapper">
                <Header />
                <section className="d-flex flex-column flex-row-fluid container">
                    <div className="card card-custom card-bottom"></div>
                </section>
                <Footer />
            </main>
        </>
    );
}

MainFaqs.propTypes = {};

export default MainFaqs;
