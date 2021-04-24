import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AbstractTwo from '../../assets/media/abstract-2.svg';
import AbstractThree from '../../assets/media/abstract-3.svg';
import Avatar from '../../assets/media/avatar.png';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import Signout from '../LogOut';

AsideRight.propTypes = {
    name: PropTypes.string,
    name2: PropTypes.object
};

AsideRight.defaultProps = {
    name: '',
    name2: null
};

function AsideRight(props) {
    const { name } = props;
    const { currentUser } = useAuth();

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

                            <h4 className="font-weight-bold my-2">
                                {localStorage.getItem('fullname') ? localStorage.getItem('fullname') : currentUser.email}
                            </h4>
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
        </aside>
    );
}

export default AsideRight;
