import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import DragonBridge from 'assets/media/dragonbridge.jpg';

function MainFaqs(props) {
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
                                    <h3 className="font-weight-bolder text-dark mb-0">Các câu hỏi thường gặp</h3>
                                    <div className="d-flex">
                                        <a
                                            href="mailto:admin@thenightowl.team"
                                            className="font-size-h4 text-dark font-weight-bold"
                                        >
                                            Liên hệ
                                        </a>
                                    </div>
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
                                            <div className="tab-content">
                                                <div className="accordion accordion-light accordion-light-borderless accordion-svg-toggle">
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <a
                                                                className="card-title text-dark"
                                                                data-toggle="collapse"
                                                                href="#faq1"
                                                            >
                                                                <span>
                                                                    <i className="fad fa-chevron-double-right"></i>
                                                                </span>
                                                                <div className="card-label text-dark pl-4">
                                                                    Nó ra sao
                                                                </div>
                                                            </a>
                                                        </div>
                                                        <div>
                                                            <div className="card-body text-dark-50 font-size-lg pl-12">
                                                                Câu trả lời 1
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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

MainFaqs.propTypes = {};

export default MainFaqs;
