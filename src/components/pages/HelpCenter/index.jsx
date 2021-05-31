import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import DragonBridge from 'assets/media/dragonbridge.jpg';
import Introduction from '../Introduction';
import FAQs from '../FAQs';

function MainHelpCenter(props) {
    return (
        <>
            <main className="d-flex flex-column flex-row-fluid wrapper">
                <Header />
                <section className="content pt-0 d-flex flex-column flex-column-fluid">
                    <div className="d-flex flex-column">
                        <div
                            className="d-flex flex-row-fluid bgi-size-cover bgi-position-center"
                            style={{
                                backgroundImage: `url(${DragonBridge})`,
                            }}
                        >
                            <div className="container-fluid">
                                <div className="d-flex justify-content-between align-items-center pt-15 pb-35">
                                    <h3 className="font-weight-bolder text-dark mb-0">Trung tâm trợ giúp</h3>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid mt-n15">
                            <div className="card mb-8">
                                <div className="card-body p-10">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <ul
                                                className="navi navi-link-rounded navi-accent navi-hover navi-active nav flex-column mb-8 mb-lg-0"
                                                role="tablist"
                                            >
                                                <li className="navi-item mb-2">
                                                    <a className="navi-link active" href="#">
                                                        <span className="navi-text text-dark-50 font-size-h5 font-weight-bold">
                                                            Giới thiệu
                                                        </span>
                                                    </a>
                                                </li>
                                                <li className="navi-item mb-2">
                                                    <a className="navi-link" href="#">
                                                        <span className="navi-text text-dark-50 font-size-h5 font-weight-bold">
                                                            Các câu hỏi thường gặp
                                                        </span>
                                                    </a>
                                                </li>
                                                <li className="navi-item mb-2">
                                                    <a className="navi-link" href="#">
                                                        <span className="navi-text text-dark font-size-h5 font-weight-bold">
                                                            Hướng dẫn
                                                        </span>
                                                    </a>
                                                </li>
                                                <li className="navi-item mb-2">
                                                    <a className="navi-link" href="#">
                                                        <span className="navi-text text-dark-50 font-size-h5 font-weight-bold">
                                                            Chính sách và bảo mật
                                                        </span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-9">
                                            <Introduction />
                                            <FAQs />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
        </>
    );
}

MainHelpCenter.propTypes = {};

export default MainHelpCenter;
