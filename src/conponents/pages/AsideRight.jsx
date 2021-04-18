import PropTypes from 'prop-types';
import Signout from '../LogOut';
import Avatar from '../../assets/media/avatar.png';
import AbstractThree from '../../assets/media/abstract-3.svg';
import AbstractTwo from '../../assets/media/abstract-2.svg';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

AsideRight.propTypes = {
    name: PropTypes.string,
};

AsideRight.defaultProps = {
    name: '',
};

function AsideRight(props) {
    const {name} = props

    return (
        <aside className="sidebar d-flex flex-row-auto flex-column">
            <div className="d-flex flex-column pb-10 pt-9 px-5 px-lg-10">
                <section
                    className="card card-custom bgi-no-repeat gutter-b"
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
                            <h4 className="font-weight-bold my-2">{name}</h4>
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
                    className="card card-custom bgi-no-repeat gutter-b"
                    style={{ backgroundPosition: 'right top', backgroundSize: '30% auto', backgroundImage: `url(${AbstractTwo})` }}
                >
                    <div className="card-header border-0 pt-5">
                        <h3 className="card-title align-items-start flex-column">
                            <span className="title">Thông báo gần đây</span>
                            <span className="text-time mt-2 font-size-sm">in 7 days</span>
                        </h3>
                    </div>
                    <div className="card-body pt-2">
                        <p className="line pb-4">
                            Thông báo thứ nhất <span className="font-size-sm text-time">5 phút trước</span>
                        </p>
                        <p className="line pb-4">
                            Thông báo thứ hai <span className="font-size-sm text-time">8 phút trước</span>
                        </p>
                        <p className="line pb-4">
                            Thông báo thứ ba <span className="font-size-sm text-time">12 phút trước</span>
                        </p>
                        <p className="line pb-4">
                            Thông báo thứ bốn <span className="font-size-sm text-time">25 phút trước</span>
                        </p>
                    </div>
                </section>
            </div>
        </aside>
    );
}

export default AsideRight;
