import { CheckCircleFillIcon } from '@primer/octicons-react';
import Phong from 'assets/media/phong.png';
import Quynh from 'assets/media/quynh.png';
import Appstore from 'assets/media/tai-appstore.jpg';
import Playstore from 'assets/media/tai-google-play.jpg';
import Thang from 'assets/media/thang.png';
import TheNightOwl from 'assets/media/the-night-owl.png';
import Tin from 'assets/media/tin.png';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

function LandingPage() {
    const [wordList] = useState(['Quỳnh', 'Thắng', 'Phóng', 'Tín']);
    const [keywordList] = useState(['Merchants', 'Shop Owners', 'Business', 'You']);
    const [effect, setEffect] = useState({
        opacity: 0,
        activeIdx: 0,
    });
    const [keyword, setKeyword] = useState({
        opacity: 0,
        activeIdx: 0,
    });

    useEffect(() => {
        const runAnimation = () => {
            setEffect((preEffect) => {
                const newOpacity = preEffect.opacity === 0 ? 1 : 0;
                const result = {
                    opacity: newOpacity,
                    activeIdx: newOpacity === 1 ? preEffect.activeIdx + 1 : preEffect.activeIdx,
                };
                return result;
            });
        };

        const intervalId = setInterval(() => {
            runAnimation();
        }, 1500);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const runAnimation = () => {
            setKeyword((preEffect) => {
                const newOpacity = preEffect.opacity === 0 ? 1 : 0;
                const result = {
                    opacity: newOpacity,
                    activeIdx: newOpacity === 1 ? preEffect.activeIdx + 1 : preEffect.activeIdx,
                };
                return result;
            });
        };

        const intervalId = setInterval(() => {
            runAnimation();
        }, 1500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <header className="bg-custom">
                <div className="container">
                    <nav className="navbar navbar-light fixed-top">
                        <Link className="navbar-brand" to="/">
                            <img src={TheNightOwl} width={36} className="d-inline-block align-top" alt="logo" />
                        </Link>
                        <div>
                            <Link to="/login" className="btn btn-access">
                                Truy cập dành cho Shop Owner
                            </Link>
                            <span className="btn btn-download ml-2">Tải ứng dụng</span>
                        </div>
                    </nav>
                </div>
                <section className="hero">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <h1 className="hero__title">
                                    Amateur Shippers
                                    <br />
                                    for{' '}
                                    <span
                                        className="text-teal"
                                        style={{ opacity: keyword.opacity, 'transition-duration': '.5s' }}
                                    >
                                        {keywordList[keyword.activeIdx % keywordList.length]}
                                    </span>
                                </h1>
                                <p className="hero__content">
                                    <CheckCircleFillIcon size={16} fill="#28a745" />
                                    <span className="ml-2">Giải pháp tuyệt vời</span>
                                </p>
                                <p className="hero__content">
                                    <CheckCircleFillIcon size={16} fill="#28a745" />
                                    <span className="ml-2">Tìm shipper dễ dàng hơn bao giờ hết</span>
                                </p>
                                <p className="hero__content">
                                    <CheckCircleFillIcon size={16} fill="#28a745" />
                                    <span className="ml-2">Tham gia ngay để trải nghiệm</span>
                                </p>
                                <div className="hero__button">
                                    <img src={Appstore} alt="" width={130} className="mr-2" />
                                    <img src={Playstore} alt="" width={130} />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div />
                            </div>
                        </div>
                    </div>
                </section>
            </header>
            <main>
                <section className="our-team">
                    <div className="container">
                        <h3 className="our-team__title">Nhóm phát triển</h3>
                        <div className="row">
                            <div className="col-lg-3 mb-2">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-image">
                                            <img src={Phong} alt="avatar" />
                                        </div>
                                        <h5 className="card-title">Lê Văn Phóng</h5>
                                        <h6 className="card-subtitle text-blue">Scrum Master</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 mb-2">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-image">
                                            <img src={Tin} alt="avatar" />
                                        </div>
                                        <h5 className="card-title">Trần Trọng Tín</h5>
                                        <h6 className="card-subtitle text-blue">Team Member</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 mb-2">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-image">
                                            <img src={Thang} alt="avatar" />
                                        </div>
                                        <h5 className="card-title">Huỳnh Bá Thắng</h5>
                                        <h6 className="card-subtitle text-blue">Product Owner</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 mb-2">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-image">
                                            <img src={Quynh} alt="avatar" />
                                        </div>
                                        <h5 className="card-title">Nguyễn Văn Quỳnh</h5>
                                        <h6 className="card-subtitle text-blue">Team Member</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer>
                <section className="app-footer">
                    <div className="container">
                        <div className="app-footer__make-w-love">
                            Made with <span role="img">❤</span>️ from{' '}
                            <span style={{ opacity: effect.opacity, 'transition-duration': '.5s' }}>
                                {wordList[effect.activeIdx % wordList.length]}
                            </span>
                        </div>
                        <div className="app-footer__copyright">
                            <span>{moment().year()}©</span>
                            <Link to="#" target="_blank">
                                The Night Owl
                            </Link>
                        </div>
                    </div>
                </section>
            </footer>
        </>
    );
}

LandingPage.propTypes = {};

export default LandingPage;
