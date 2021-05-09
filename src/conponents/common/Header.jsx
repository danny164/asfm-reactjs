import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderMobile from './HeaderMobile';

Header.propTypes = {
    onClickFilterStatus: PropTypes.func,
    filteredStatus: PropTypes.string,
};

Header.defaultProps = {
    onClickFilterStatus: null,
    filteredStatus: '',
};

function Header(props) {
    const { onClickFilterStatus, filteredStatus } = props;

    const handleFilterStatus = (status) => {
        if (!onClickFilterStatus) return;
        else {
            onClickFilterStatus(status);
        }
    };

    return (
        <>
            <HeaderMobile />
            <header className="header header-fixed">
                <div className="d-flex flex-grow-1 align-items-center rounded-top-xl">
                    <div className="d-flex align-items-center justify-content-between flex-wrap container-fluid ">
                        <div className="d-none d-xl-block">
                            <ul className="menu-nav">
                                <li className="menu-item">
                                    <Link to="/home" className="menu-link" onClick={() => handleFilterStatus('all')}>
                                        <span className={`menu menu-recent ${filteredStatus === 'all' ? 'active' : 'none'}`}>Đơn gần đây</span>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/home" className="menu-link" onClick={() => handleFilterStatus('0')}>
                                        <span className={`menu menu-in-progress ${filteredStatus === '0' ? 'active' : 'none'}`}>Đang xử lý</span>
                                    </Link>
                                    <span className="label label-sm label-light-warning label-rounded font-weight-bolder position-absolute top--4 right-0 mt-1 mr-1">
                                        15
                                    </span>
                                </li>
                                <li className="menu-item">
                                    <Link to="/home" className="menu-link" onClick={() => handleFilterStatus('1')}>
                                        <span className={`menu menu-picked ${filteredStatus === '1' ? 'active' : 'none'}`}>Đã nhận đơn</span>
                                    </Link>
                                    <span className="label label-sm label-light-info label-rounded font-weight-bolder position-absolute top--4 right-0 mt-1 mr-1">
                                        5
                                    </span>
                                </li>
                                <li className="menu-item">
                                    <Link to="/home" className="menu-link" onClick={() => handleFilterStatus('2')}>
                                        <span className={`menu menu-completed ${filteredStatus === '2' ? 'active' : 'none'}`}>Hoàn thành</span>
                                    </Link>
                                    <span className="label label-sm label-light-success label-rounded font-weight-bolder position-absolute top--4 right-0 mt-1 mr-1">
                                        9
                                    </span>
                                </li>
                                <li className="menu-item">
                                    <Link to="/home" className="menu-link" onClick={() => handleFilterStatus('3')}>
                                        <span className={`menu menu-canceled ${filteredStatus === '3' ? 'active' : 'none'}`}>Đơn hủy</span>
                                    </Link>
                                    <span className="label label-sm label-light-danger label-rounded font-weight-bolder position-absolute top--4 right-0 mt-1 mr-1">
                                        7
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="d-flex align-items-center d-block d-xl-none d-lg-block py-3 py-lg-2">
                            <Link to="/home" className="btn btn-icon btn-light h-40px w-40px mr-3" onClick={() => handleFilterStatus('all')}>
                                <i className="fad fa-sync-alt"></i>
                            </Link>
                            <Link to="/home" className="btn btn-icon btn-light h-40px w-40px mr-3" onClick={() => handleFilterStatus('0')}>
                                <i className="fad fa-spinner-third menu-in-progress"></i>
                            </Link>
                            <Link to="/home" className="btn btn-icon btn-light h-40px w-40px mr-3" onClick={() => handleFilterStatus('1')}>
                                <i className="fad fa-user-check text-primary-2"></i>
                            </Link>
                            <Link to="/home" className="btn btn-icon btn-light h-40px w-40px mr-3" onClick={() => handleFilterStatus('2')}>
                                <i className="fad fa-box-check menu-completed"></i>
                            </Link>
                            <Link to="/home" className="btn btn-icon btn-light h-40px w-40px mr-3" onClick={() => handleFilterStatus('3')}>
                                <i className="fas fa-times-circle text-danger-2 "></i>
                            </Link>
                        </div>

                        <div className="d-flex align-items-center py-3 py-lg-2">
                            <Link to="/post-order" className="btn btn-icon btn-light h-40px w-40px">
                                <i className="fad fa-file-alt pallette-purple"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
export default Header;
