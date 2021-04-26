import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TheNightOwl from '../../assets/media/the-night-owl.png';
import Avatar from '../../assets/media/avatar.png';
import AbstractTwo from '../../assets/media/abstract-2.svg';
import AbstractThree from '../../assets/media/abstract-3.svg';
import Signout from '../LogOut';
import AsideLeft from '../pages/AsideLeft';

export default function HeaderMobile() {
    const [toggle, setToggle] = useState(false);
    const [menu, setMenu] = useState(false);

    const onHandleToggle = () => {
        setToggle(true);
    };

    const onHandleMenu = () => {
        setMenu(true);
    };

    return (
        <>
            <header className="header-mobile header-mobile-fixed">
                <Link to="/home">
                    <img alt="logo" src={TheNightOwl} className="logo-default max-h-30px" />
                </Link>
                <div className="d-flex align-items-center">
                    <span href="#" className="btn btn-icon btn-lg btn-borderless mb-1" onClick={onHandleToggle}>
                        <i class="fad fa-align-right fa-2x"></i>
                    </span>
                    <span href="#" className="btn btn-icon btn-lg btn-borderless mb-1" onClick={onHandleMenu}>
                        <i class="fad fa-books fa-2x"></i>
                    </span>
                </div>
            </header>

            <AsideLeft onHandleMenu={menu} />

            <div className={`d-block d-lg-none d-md-block header-menu-wrapper header-menu-wrapper-left ${toggle ? `header-menu-wrapper-on` : ''} `}>
                <section
                    className="card card-custom bgi-no-repeat gutter-b m-5"
                    style={{ backgroundPosition: 'right top', backgroundSize: '30% auto', backgroundImage: `url(${AbstractThree})` }}
                >
                    <div className="card-body pt-15">
                        <div className="text-center mb-10">
                            <div className="symbol symbol-60 symbol-circle symbol-xl-90">
                                <div
                                    className="symbol-label"
                                    style={{
                                        backgroundImage: `url(${Avatar})`,
                                    }}
                                />
                                <i className="symbol-badge symbol-badge-bottom bg-success" />
                            </div>

                            <h4 className="font-weight-bold my-2">Nguyễn Văn Quỳnh</h4>
                            <div className="text-muted mb-2">Shop Owner</div>
                            <span className="label label-light-warning label-inline font-weight-bold label-lg">Hoạt động</span>
                            <div className="mt-10">
                                <Link to="/profile" className="btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 text-center btn-block">
                                    <i className="fad fa-user-circle mr-1" />
                                    Xem hồ sơ
                                </Link>
                                <Link to="/changepw" className="btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 text-center btn-block">
                                    <i className="fad fa-lock-alt mr-1" />
                                    Thay đổi mật khẩu
                                </Link>
                                <Signout />
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    className="card card-custom bgi-no-repeat gutter-b m-5"
                    style={{ backgroundPosition: 'right top', backgroundSize: '30% auto', backgroundImage: `url(${AbstractTwo})` }}
                >
                    <div className="card-header card-notify">
                        <h3 className="card-title align-items-start flex-column">
                            <span className="title">Thông báo trong ngày gần đây</span>
                        </h3>
                    </div>
                    <div className="card-body pt-2 px-5">
                        <div className="py-1">
                            Đơn hàng <span className="font-weight-bold menu-in-progress">#20210421-202348057193</span> đã{' '}
                            <span className="font-weight-bold text-primary-2">giao thành công</span>.{' '}
                            <span className="font-size-sm text-time">5 phút trước</span>
                        </div>
                        <div className="separator separator-dashed my-2" />
                        <div className="py-1">
                            Đơn hàng <span className="font-weight-bold menu-in-progress">#20210421-212548057193</span> đã{' '}
                            <span className="font-weight-bold text-purple">được xác nhận</span> và tài xế đang trên đường tới bạn.{' '}
                            <span className="font-size-sm text-time">5 phút trước</span>
                        </div>
                        <div className="separator separator-dashed my-2" />
                        <div className="py-1">
                            Đơn hàng <span className="font-weight-bold menu-in-progress">#20210423-165311577617</span> đã{' '}
                            <span className="font-weight-bold text-chartjs">bị hủy</span>.{' '}
                            <span className="font-size-sm text-time">5 phút trước</span>
                        </div>
                    </div>
                </section>
            </div>
            {(toggle || menu) && (
                <div
                    class="header-menu-wrapper-overlay"
                    onClick={() => {
                        setToggle(false);
                        setMenu(false);
                    }}
                ></div>
            )}
        </>
    );
}
