import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeFilter } from './filterSlice';
import HeaderMobile from './HeaderMobile';

function Header(props) {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filter);

    const handleFilterClick = (filter) => {
        const action = changeFilter(filter);
        console.log(action);
        dispatch(action);
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
                                    <Link to="/home" className="menu-link" onClick={() => handleFilterClick('all')}>
                                        <span className={`menu menu-recent ${filter === 'all' ? 'active' : 'none'}`}>Đơn gần đây</span>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/home" className="menu-link" onClick={() => handleFilterClick('0')}>
                                        <span className={`menu menu-in-progress ${filter === '0' ? 'active' : 'none'}`}>Đang xử lý</span>
                                    </Link>
                                    <span className="label label-sm label-light-warning label-rounded font-weight-bolder position-absolute top--4 right-0 mt-1 mr-1">
                                        15
                                    </span>
                                </li>
                                <li className="menu-item">
                                    <Link to="/home" className="menu-link" onClick={() => handleFilterClick('1')}>
                                        <span className={`menu menu-picked ${filter === '1' ? 'active' : 'none'}`}>Đã nhận đơn</span>
                                    </Link>
                                    <span className="label label-sm label-light-info label-rounded font-weight-bolder position-absolute top--4 right-0 mt-1 mr-1">
                                        5
                                    </span>
                                </li>
                                <li className="menu-item">
                                    <Link to="/home" className="menu-link" onClick={() => handleFilterClick('2')}>
                                        <span className={`menu menu-completed ${filter === '2' ? 'active' : 'none'}`}>Hoàn thành</span>
                                    </Link>
                                    <span className="label label-sm label-light-success label-rounded font-weight-bolder position-absolute top--4 right-0 mt-1 mr-1">
                                        9
                                    </span>
                                </li>
                                <li className="menu-item">
                                    <Link to="/home" className="menu-link" onClick={() => handleFilterClick('3')}>
                                        <span className={`menu menu-canceled ${filter === '3' ? 'active' : 'none'}`}>Đơn hủy</span>
                                    </Link>
                                    <span className="label label-sm label-light-danger label-rounded font-weight-bolder position-absolute top--4 right-0 mt-1 mr-1">
                                        7
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="d-flex align-items-center d-block d-xl-none d-lg-block py-3 py-lg-2">
                            <Link to="/home" className="btn btn-icon btn-light h-40px w-40px mr-3" onClick={() => handleFilterClick('all')}>
                                <i className="fad fa-sync-alt"></i>
                            </Link>
                            <Link to="/home" className="btn btn-icon btn-light h-40px w-40px mr-3" onClick={() => handleFilterClick('0')}>
                                <i className="fad fa-spinner-third menu-in-progress"></i>
                            </Link>
                            <Link to="/home" className="btn btn-icon btn-light h-40px w-40px mr-3" onClick={() => handleFilterClick('1')}>
                                <i className="fad fa-user-check text-primary-2"></i>
                            </Link>
                            <Link to="/home" className="btn btn-icon btn-light h-40px w-40px mr-3" onClick={() => handleFilterClick('2')}>
                                <i className="fad fa-box-check menu-completed"></i>
                            </Link>
                            <Link to="/home" className="btn btn-icon btn-light h-40px w-40px mr-3" onClick={() => handleFilterClick('3')}>
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
