import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { db, realtime } from '../../firebase';
import Footer from '../common/Footer';
import Header from '../common/Header';
import Cancelled from '../labels/Cancelled';
import Completed from '../labels/Completed';
import InProcessing from '../labels/InProcessing';
import Picked from '../labels/Picked';
import Chat from './Chat/Chat';
import TheNightOwl from '../../assets/media/avatar.png';
import SkeletonCard from './Skeleton';
import Expand from 'react-expand-animated';

MainHomePage.propTypes = {
    shopInfo: PropTypes.object,
    idShop: PropTypes.string,
    datas: PropTypes.object,
    ChangeOrderStatus: PropTypes.func,
    DeleteOrder: PropTypes.func,
    Notification: PropTypes.object,
};

MainHomePage.defaultProps = {
    shopInfo: null,
    datas: null,
    ChangeOrderStatus: null,
    DeleteOrder: null,
    idShop: '',
    Notification: null,
};

var renderStatus = [];
var lastStatus = [];
var sortStatus = [];

function MainHomePage(props) {
    const { datas, DeleteOrder, shopInfo, idShop } = props;

    const [filteredStatus, setFilteredStatus] = useState('all');
    const [titleStatus, setTitleStatus] = useState('gần đây');

    const [sortByRange, setSortByRange] = useState('1');
    const [subTitleStatus, setSubTitleStatus] = useState('trong ngày');

    const [shipperInfor, setShipperInfor] = useState({});
    const [transactionInfor, setTransactionInfor] = useState({
        id_post: '',
        id_roomchat: '',
        id_shipper: '',
        id_shop: '',
    });

    const [dataModal, setDataModal] = useState({});
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const dateToFromNowDaily = (date) => {
        const convertDate = moment.unix(date);

        return moment(convertDate).calendar(null, {
            lastDay: '[Hôm qua,] HH:mm',
            sameDay: '[Hôm nay,] HH:mm',
            nextDay: '[Ngày mai,] HH:mm',
            lastWeek: 'HH:mm, DD/MM/YYYY',
            nextWeek: 'HH:mm, DD/MM/YYYY',
            sameElse: function () {
                return 'HH:mm, DD/MM/YYYY';
            },
        });
    };

    /////////////////////////////////////////////////////////
    const handleFilterStatus = (status) => {
        setFilteredStatus(status);
        status === 'all' && setTitleStatus('gần đây');
        status === '0' && setTitleStatus('đang xử lý');
        status === '1' && setTitleStatus('đã nhận');
        status === '2' && setTitleStatus('hoàn thành');
        status === '3' && setTitleStatus('bị hủy');
    };

    const last24hrs = (sortByRange, dataTime) => {
        if (sortByRange === '7') {
            return dataTime >= moment().subtract(7, 'days').format('X');
        }
        if (sortByRange === '30') return dataTime >= moment().subtract(1, 'month').format('X');
        return dataTime >= moment().subtract(1, 'day').format('X');
    };

    useEffect(() => {
        if (sortByRange === '1') setSubTitleStatus('trong ngày');
        if (sortByRange === '7') setSubTitleStatus('trong tuần');
        if (sortByRange === '30') setSubTitleStatus('trong tháng');
    }, [sortByRange]);

    const handleSortByRange = (range) => {
        setSortByRange(range);
    };

    /////////////////////////////////////////////////////////

    const [loading, setLoading] = useState(false);

    if (datas) {
        renderStatus = Object.values(datas).filter((data) => filteredStatus === 'all' || filteredStatus === data.status);
        lastStatus = Object.values(renderStatus).filter((data) => last24hrs(sortByRange, data.thoi_gian));
        sortStatus = lastStatus.sort((a, b) => (a.thoi_gian < b.thoi_gian ? 1 : -1));
    }

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
            console.log(loading);
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    // console.log(sortStatus);

    const handleDeleteOrder = (id) => {
        if (DeleteOrder) {
            DeleteOrder(id);
            setShow(false);
        }
    };

    const [showChat, setShowChat] = useState(false);

    const handleClickChat = () => {
        setShowChat(true);
    };

    const handleCloseChat = () => {
        setShowChat(false);
    };

    const fetchDataShipper = async (idPost) => {
        console.log('idpost: ' + idPost);
        try {
            await realtime.ref('Transaction/' + idPost).on('value', (snapshot) => {
                setTransactionInfor(snapshot.val());
                if (snapshot.val().id_shipper !== '') {
                    db.collection('ProfileShipper')
                        .doc(snapshot.val().id_shipper)
                        .get()
                        .then((doc) => {
                            if (doc.exists) {
                                setShipperInfor(doc.data());
                            } else {
                                console.log('Không fetch được dữ liệu !');
                            }
                        });
                } else {
                    setShipperInfor({
                        id_post: '',
                        id_roomchat: '',
                        id_shipper: '',
                        id_shop: '',
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="d-flex flex-column flex-row-fluid wrapper">
            <Header onClickFilterStatus={handleFilterStatus} filteredStatus={filteredStatus} />
            <section className="d-flex flex-column flex-row-fluid container">
                <div className="card card-custom card-bottom">
                    <header className="card-header border-0">
                        <div className="card-title py-4">
                            <h3 className="card-label">
                                <span className="d-block title">Danh sách đơn {titleStatus}</span>
                                <span className="d-block text-time mt-2 font-size-sm">{subTitleStatus}</span>
                            </h3>
                        </div>
                        <div className="card-toolbar">
                            <ul className="nav nav-pills">
                                <li className="nav-item">
                                    <div
                                        className={`nav-link btn py-2 px-4 ${sortByRange === '30' ? 'active' : 'btn-outline-secondary'}`}
                                        onClick={() => handleSortByRange('30')}
                                    >
                                        <span className="nav-text">Tháng</span>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div
                                        className={`nav-link btn py-2 px-4 ${sortByRange === '7' ? 'active' : 'btn-outline-secondary'}`}
                                        onClick={() => handleSortByRange('7')}
                                    >
                                        <span className="nav-text">Tuần</span>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div
                                        className={`nav-link btn py-2 px-4 ${sortByRange === '1' ? 'active' : 'btn-outline-secondary'}`}
                                        onClick={() => handleSortByRange('1')}
                                    >
                                        <span className="nav-text">Ngày</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </header>
                    <section className="card-body newsfeed">
                        {loading && <SkeletonCard />}
                        {sortStatus.map((data, index) => (
                            <>
                                {loading && <SkeletonCard />}
                                {!loading && (
                                    <article
                                        className="order"
                                        key={index}
                                        onClick={() => {
                                            setShow(true);
                                            fetchDataShipper(data.id_post);
                                            setDataModal(data);
                                        }}
                                    >
                                        <div className="d-flex align-items-start">
                                            <span className="bullet bullet-bar bg-orange align-self-stretch" />
                                            <div className="d-flex flex-column flex-grow-1 ml-4">
                                                <header className="card-title content">
                                                    <span>#{data.id_post}</span>
                                                    <span className="flex-shrink-0">
                                                        {dateToFromNowDaily(data.thoi_gian)}
                                                        {/* <Moment format="DD/MM/YYYY">{data.thoi_gian}</Moment> */}
                                                    </span>
                                                </header>
                                                <section className="card-info content">
                                                    <div className="mb-3">
                                                        <div className="mb-3">
                                                            <span className="font-weight-bold">{data.ten_nguoi_nhan}</span> -{' '}
                                                            <span className="font-weight-bold">{data.sdt_nguoi_nhan}</span>
                                                        </div>
                                                        <div className="mb-1">
                                                            Chi phí giao hàng:{' '}
                                                            <span className="font-weight-bold text-primary-2">{data.phi_giao}</span>
                                                        </div>
                                                        <div className="mb-1">
                                                            Tạm ứng: <span className="font-weight-bold text-chartjs">{data.phi_ung}</span>
                                                        </div>
                                                    </div>
                                                    <span className="delivery">Giao hàng tới</span>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <address className="mb-0 pl-0">{data.noi_giao}</address>
                                                        {data.status === '0' && <InProcessing />}
                                                        {data.status === '1' && <Picked />}
                                                        {data.status === '2' && <Completed />}
                                                        {data.status === '3' && <Cancelled />}
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                        <div className="separator separator-dashed my-5" />
                                    </article>
                                )}
                            </>
                        ))}
                        {sortStatus.length === 0 && (
                            <>
                                {!loading && (
                                    <article className="empty-order">
                                        <span className="text menu-in-progress">
                                            Bạn không có đơn nào {titleStatus} {subTitleStatus} !
                                        </span>
                                    </article>
                                )}
                                {console.log(loading)}
                            </>
                        )}
                    </section>

                    <Modal size="lg" show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Chi tiết đơn #{dataModal.id_post}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="d-flex align-items-start">
                                <span className="bullet bullet-bar bg-orange align-self-stretch" />
                                <div className="d-flex flex-column flex-grow-1 ml-4">
                                    <header className="card-title content mb-4">
                                        <span>Order ID: {dataModal.id_post}</span>
                                        <span>
                                            {dateToFromNowDaily(dataModal.thoi_gian)}
                                            {/* <Moment format="DD/MM/YYYY">{data.thoi_gian}</Moment> */}
                                        </span>
                                    </header>
                                    <section className="card-info content">
                                        <div className="mb-5">
                                            <p>
                                                Tên khách hàng:
                                                <span className="font-weight-bold ml-2">{dataModal.ten_nguoi_nhan}</span>
                                            </p>
                                            <p>
                                                Số điện thoại:
                                                <span className="font-weight-bold ml-2">{dataModal.sdt_nguoi_nhan}</span>
                                            </p>
                                            <p>
                                                Chi phí giao hàng:
                                                <span className="font-weight-bold text-primary-2 ml-2">{dataModal.phi_giao}</span>
                                            </p>
                                            <p>
                                                Tạm ứng:
                                                <span className="font-weight-bold text-chartjs ml-2">{dataModal.phi_ung}</span>
                                            </p>
                                        </div>

                                        <p className="delivery m-0">Nhận hàng từ</p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <address className="mb-0 pl-0">{dataModal.noi_nhan}</address>
                                        </div>

                                        <p className="delivery m-0 mt-5">Giao hàng tới</p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <address className="mb-0 pl-0">{dataModal.noi_giao}</address>
                                            {dataModal.status === '0' && <InProcessing />}
                                            {dataModal.status === '1' && <Picked />}
                                            {dataModal.status === '2' && <Completed />}
                                            {dataModal.status === '3' && <Cancelled />}
                                        </div>
                                    </section>
                                </div>
                            </div>
                            <div className="separator separator-dashed my-5" />
                            {dataModal.ghi_chu && (
                                <>
                                    <p>
                                        <span className="label label-xl label-inline label-inprogress label-rounded mr-2">Ghi chú:</span>
                                        {dataModal.ghi_chu}
                                    </p>
                                    <div className="separator separator-dashed my-5" />
                                </>
                            )}

                            <p className="font-weight-bold">Người nhận đơn:</p>

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="shipper-info">
                                    <div className="avatar-shipper-sm">
                                        {shipperInfor.avatar && <img src={shipperInfor.avatar} alt="Avatar Shipper" />}
                                    </div>
                                    <div className="mr-5 font-weight-bold text-chartjs">{shipperInfor.name}</div>
                                    <span>{shipperInfor.phone}</span>
                                </div>
                                {dataModal.status !== '0' && (
                                    <span className="cursor-pointer" onClick={handleClickChat}>
                                        <i className="fad fa-comments fa-2x"></i>
                                    </span>
                                )}
                            </div>

                            <div className="separator separator-dashed my-5" />
                            <p className="font-weight-bold">Theo dõi đơn hàng:</p>
                        </Modal.Body>

                        <Modal.Footer className="d-flex justify-content-between">
                            <div>
                                {dataModal.status === '0' && (
                                    <Button variant="chartjs" onClick={() => handleDeleteOrder(dataModal.id_post)}>
                                        Xóa đơn
                                    </Button>
                                )}
                            </div>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Chat
                        showChat={showChat}
                        onHandleCloseChat={handleCloseChat}
                        shopInfo={shopInfo}
                        idPost={dataModal.id_post}
                        idRoom={transactionInfor.id_roomchat}
                        idShop={idShop}
                        shipperInfor={shipperInfor}
                    />
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default MainHomePage;
