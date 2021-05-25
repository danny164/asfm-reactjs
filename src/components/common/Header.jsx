import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeFilter } from './filterSlice';
import HeaderMobile from './HeaderMobile';
import { realtime } from '../../firebase';
import PropTypes from 'prop-types';
import { useAuth } from 'context/AuthContext';

Header.propTypes = {
    datas: PropTypes.object,
};

Header.defaultProps = {
    datas: null,
};
function Header(props) {
    const { datas } = props;
    const { currentUser } = useAuth();
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filter);
    const [unRead0, setUnRead0] = useState(0);
    const [unRead1, setUnRead1] = useState(0);
    const [unRead2, setUnRead2] = useState(0);
    const [unRead3, setUnRead3] = useState(0);
    const [unReadData0, setUnReadData0] = useState([]);
    const [unReadData1, setUnReadData1] = useState([]);
    const [unReadData2, setUnReadData2] = useState([]);
    const [unReadData3, setUnReadData3] = useState([]);

    const handleFilterClick = (filter) => {
        const action = changeFilter(filter);
        dispatch(action);
    };

    useEffect(() => {
        if (datas) {
            setUnReadData0(Object.values(datas).filter((data) => data.status === '0' && data.read === 0));
            setUnReadData1(Object.values(datas).filter((data) => data.status === '1' && data.read === 0));
            setUnReadData2(Object.values(datas).filter((data) => data.status === '2' && data.read === 0));
            setUnReadData3(Object.values(datas).filter((data) => data.status === '3' && data.read === 0));
            setUnRead0(Object.values(datas).filter((data) => data.status === '0' && data.read === 0).length);
            setUnRead1(Object.values(datas).filter((data) => data.status === '1' && data.read === 0).length);
            setUnRead2(Object.values(datas).filter((data) => data.status === '2' && data.read === 0).length);
            setUnRead3(Object.values(datas).filter((data) => data.status === '3' && data.read === 0).length);
        }
    }, [datas]);

    const updateUnreadOrder = async (status) => {
        await updateRead(status);
    };

    console.log('hahaaaaaaa');
    const updateRead = async (status) => {
        try {
            if (status === '0') {
                unReadData0.map((data) => {
                    realtime.ref('OrderStatus/' + currentUser.uid + '/' + data.id_post).update({
                        read: 1,
                    });
                });
            }

            if (status === '1') {
                unReadData1.map((data) => {
                    realtime.ref('OrderStatus/' + currentUser.uid + '/' + data.id_post).update({
                        read: 1,
                    });
                });
            }

            if (status === '2') {
                unReadData2.map((data) => {
                    realtime.ref('OrderStatus/' + currentUser.uid + '/' + data.id_post).update({
                        read: 1,
                    });
                });
            }

            if (status === '3') {
                unReadData3.map((data) => {
                    realtime.ref('OrderStatus/' + currentUser.uid + '/' + data.id_post).update({
                        read: 1,
                    });
                });
            }
        } catch (err) {
            console.log(err);
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
                                    <Link to="/home" className="menu-link" onClick={() => handleFilterClick('all')}>
                                        <span className={`menu menu-recent ${filter === 'all' ? 'active' : 'none'}`}>Đơn gần đây</span>
                                    </Link>
                                </li>
                                <li className="menu-item">
                                    <Link
                                        to="/home"
                                        className="menu-link"
                                        onClick={() => {
                                            handleFilterClick('0');
                                            updateUnreadOrder('0');
                                        }}
                                    >
                                        <span className={`menu menu-in-progress ${filter === '0' ? 'active' : 'none'}`}>Đang xử lý</span>
                                    </Link>
                                    <span className="label label-sm label-light-warning label-rounded font-weight-bolder position-absolute top--4 right-0 mt-1 mr-1">
                                        {unRead0}
                                    </span>
                                </li>
                                <li className="menu-item">
                                    <Link
                                        to="/home"
                                        className="menu-link"
                                        onClick={() => {
                                            handleFilterClick('1');
                                            updateUnreadOrder('1');
                                        }}
                                    >
                                        <span className={`menu menu-picked ${filter === '1' ? 'active' : 'none'}`}>Đã nhận đơn</span>
                                    </Link>
                                    <span className="label label-sm label-light-info label-rounded font-weight-bolder position-absolute top--4 right-0 mt-1 mr-1">
                                        {unRead1}
                                    </span>
                                </li>
                                <li className="menu-item">
                                    <Link
                                        to="/home"
                                        className="menu-link"
                                        onClick={() => {
                                            handleFilterClick('2');
                                            updateUnreadOrder('2');
                                        }}
                                    >
                                        <span className={`menu menu-completed ${filter === '2' ? 'active' : 'none'}`}>Hoàn thành</span>
                                    </Link>
                                    <span className="label label-sm label-light-success label-rounded font-weight-bolder position-absolute top--4 right-0 mt-1 mr-1">
                                        {unRead2}
                                    </span>
                                </li>
                                <li className="menu-item">
                                    <Link
                                        to="/home"
                                        className="menu-link"
                                        onClick={() => {
                                            handleFilterClick('3');
                                            updateUnreadOrder('3');
                                        }}
                                    >
                                        <span className={`menu menu-canceled ${filter === '3' ? 'active' : 'none'}`}>Đơn hủy</span>
                                    </Link>
                                    <span className="label label-sm label-light-danger label-rounded font-weight-bolder position-absolute top--4 right-0 mt-1 mr-1">
                                        {unRead3}
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
