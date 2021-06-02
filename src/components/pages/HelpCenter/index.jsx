import DragonBridge from 'assets/media/dragonbridge.jpg';
import Footer from 'components/common/Footer';
import Header from 'components/common/Header';
import React, { useState } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import FAQs from '../FAQs';
import Introduction from '../Introduction';
import classnames from 'classnames';
import Policy from '../Policy';

function MainHelpCenter(props) {
    const { url } = useRouteMatch();
    const [active, setActive] = useState(0);

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
                                                    <Link
                                                        className={classnames({
                                                            'navi-link': true,
                                                            active: active === 0,
                                                        })}
                                                        to="/help"
                                                        onClick={() => setActive(0)}
                                                    >
                                                        <span className="navi-text text-dark-50 font-size-h5 font-weight-bold">
                                                            Giới thiệu
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li className="navi-item mb-2">
                                                    <Link
                                                        className={classnames({
                                                            'navi-link': true,
                                                            active: active === 1,
                                                        })}
                                                        to="/help/faqs"
                                                        onClick={() => setActive(1)}
                                                    >
                                                        <span className="navi-text text-dark-50 font-size-h5 font-weight-bold">
                                                            Các câu hỏi thường gặp
                                                        </span>
                                                    </Link>
                                                </li>

                                                <li className="navi-item mb-2">
                                                    <Link
                                                        className={classnames({
                                                            'navi-link': true,
                                                            active: active === 2,
                                                        })}
                                                        to="/help/policy"
                                                        onClick={() => setActive(2)}
                                                    >
                                                        <span className="navi-text text-dark-50 font-size-h5 font-weight-bold">
                                                            Chính sách và bảo mật
                                                        </span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-9">
                                            <Switch>
                                                <Route exact path={url}>
                                                    <Introduction />
                                                </Route>

                                                <Route path={`${url}/faqs`}>
                                                    <FAQs />
                                                </Route>

                                                <Route path={`${url}/Policy`}>
                                                    <Policy />
                                                </Route>
                                            </Switch>
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
