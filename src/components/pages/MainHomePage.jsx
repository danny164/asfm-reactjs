import Footer from 'components/common/Footer';
import Header from 'components/common/Header';
import Cancelled from 'components/labels/Cancelled';
import Completed from 'components/labels/Completed';
import InProcessing from 'components/labels/InProcessing';
import Picked from 'components/labels/Picked';
import { useAuth } from 'context/AuthContext';
import { dateToFromNowDaily } from 'convert/DateToFromNow';
import moment from 'moment';
import 'moment/locale/vi';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { db, realtime } from '../../firebase';
import Chat from './Chat/Chat';
import GoogleMaps from './Map/GoogleMaps';
import CustomRating from './Rating';
import SkeletonCard from './Skeleton/SkeletonCard';
import SkeletonShipper from './Skeleton/SkeletonShipper';
import SkeletonSortLength from './Skeleton/SkeletonSortLength';

MainHomePage.propTypes = {
    shopInfo: PropTypes.object,
    idShop: PropTypes.string,
    datas: PropTypes.object,
    ChangeOrderStatus: PropTypes.func,
    deleteOrder: PropTypes.func,
    rePostOrder: PropTypes.func,
};

MainHomePage.defaultProps = {
    shopInfo: null,
    datas: null,
    ChangeOrderStatus: null,
    deleteOrder: null,
    idShop: '',
    rePostOrder: null,
};
const convertPhone = (phone) => {
    const match = phone.match(/^(\d{4})(\d{3})(\d{3})$/);
    if (match) {
        return [match[1], match[2], match[3]].join(' ');
    }
    return null;
};

function MainHomePage(props) {
    const { rePostOrder, datas, deleteOrder, shopInfo, idShop } = props;

    const [hasMore, setHasMore] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    const [sortStatus, setSortStatus] = useState([]);
    const { currentUser } = useAuth();

    const [titleStatus, setTitleStatus] = useState('gần đây');

    const [sortByRange, setSortByRange] = useState('1');
    const [subTitleStatus, setSubTitleStatus] = useState('trong ngày');

    const [shipperInfor, setShipperInfor] = useState({});
    const [transactionInfor, setTransactionInfor] = useState({
        id_post: '',
        id_roomchat: '',
        id_shipper: '',
        id_shop: '',
        status: '',
        shipperLat: 0,
        shipperLng: 0,
    });

    const [dataModal, setDataModal] = useState({
        ghi_chu: '',
        picked_time: '',
        completed_time: '',
        id_post: '',
        id_shop: '',
        km: '',
        noi_giao: '',
        noi_nhan: '',
        phi_giao: '',
        phi_ung: '',
        sdt_nguoi_gui: '',
        sdt_nguoi_nhan: '',
        status: '',
        ten_nguoi_gui: '',
        ten_nguoi_nhan: '',
        ma_bi_mat: '',
        thoi_gian: '',
        ma_bi_mat: '',
        reason: '',
        receiveLng: 0,
        receiveLat: 0,
        shipLng: 0,
        shipLat: 0,
        time_estimate: 0,
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    /////////////////////////////////////////////////////////
    // ! Lọc theo sự kiện click trên header

    const filter = useSelector((state) => state.filter);

    const [checkLoading, setCheckLoading] = useState(false);

    useEffect(() => {
        setCheckLoading(false);
        if (filter === 'all') setTitleStatus('gần đây');
        if (filter === '0') setTitleStatus('đang xử lý');
        if (filter === '1') setTitleStatus('đã nhận');
        if (filter === '2') setTitleStatus('hoàn thành');
        if (filter === '3') setTitleStatus('bị hủy');
    }, [filter]);

    // * Lọc theo phạm vi, trả về kết quả theo ngày, tháng, tuần cho lastStatus []
    const last24hrs = (sortByRange, dataTime) => {
        if (sortByRange === '7') {
            return dataTime >= moment().subtract(7, 'days').format('X');
        }
        if (sortByRange === '30') return dataTime >= moment().subtract(1, 'month').format('X');
        return dataTime >= moment().subtract(1, 'day').format('X');
    };

    // * Khi Sort by Range thay đổi, thì Title cũng cần update theo
    useEffect(() => {
        if (sortByRange === '1') setSubTitleStatus('trong ngày');
        if (sortByRange === '7') setSubTitleStatus('trong tuần');
        if (sortByRange === '30') setSubTitleStatus('trong tháng');
    }, [sortByRange]);

    // * Nhận loại sort từ sự kiện click
    const handleSortByRange = (range) => {
        setSortByRange(range);
    };

    /////////////////////////////////////////////////////////
    // ! delay loading chờ lấy thông tin
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    // Chạy lần đầu bắt buộc phải có loading
    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(async () => {
            if (datas) {
                const renderStatus = Object.values(datas).filter(
                    (data) => (filter === 'all' || filter === data.status) && last24hrs(sortByRange, data.thoi_gian)
                );
                await setSortStatus(renderStatus.sort((a, b) => (a.thoi_gian < b.thoi_gian ? 1 : -1)));
                await setItems(renderStatus.sort((a, b) => (a.thoi_gian < b.thoi_gian ? 1 : -1)).slice(0, 5));
            } else {
                setSortStatus([]);
            }
            setCheckLoading(true);

            setLoading(false);
        }, 800);

        return () => {
            clearTimeout(timer);
        };
    }, [filter, checkLoading, sortByRange]);

    // Chạy lần 2 data status thay đổi sẽ không bị dính loading
    useEffect(() => {
        if (checkLoading) {
            const timer = setTimeout(async () => {
                if (datas) {
                    const renderStatus = Object.values(datas).filter(
                        (data) => (filter === 'all' || filter === data.status) && last24hrs(sortByRange, data.thoi_gian)
                    );
                    setSortStatus(renderStatus.sort((a, b) => (a.thoi_gian < b.thoi_gian ? 1 : -1)));
                    setItems(renderStatus.sort((a, b) => (a.thoi_gian < b.thoi_gian ? 1 : -1)).slice(0, 5));
                } else {
                    setSortStatus([]);
                }
            }, 800);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [filter, datas, sortByRange]);

    // console.log(sortStatus);

    /////////////////////////////////////////////////////////
    // ! Xóa đơn
    const handledeleteOrder = async (id) => {
        if (deleteOrder) {
            await deleteOrder(id, 'Bạn đã thực hiện thao tác hủy trên hệ thống !');
            setShow(false);
        }
    };

    /////////////////////////////////////////////////////////
    // ! Chat
    const [showChat, setShowChat] = useState(false);

    const handleClickChat = () => {
        setShowChat(true);
    };

    const handleCloseChat = () => {
        setShowChat(false);
    };

    /////////////////////////////////////////////////////////
    // ! Fetch thông tin của shipper khi nhận đơn

    //
    const fetchDataShipper = async (idPost, data) => {
        console.log('idpost: ' + idPost);
        try {
            await realtime.ref('Transaction/' + idPost).on('value', (snapshot) => {
                /* kiểm tra lần đầu nếu chưa có dataModel thì k chạy setDataModal 
                và kiểm tra nếu có thay đổi status thì mới set k thì thôi */

                if (snapshot.val() !== null) {
                    realtime
                        .ref('OrderStatus/' + currentUser.uid)
                        .orderByChild('id_post')
                        .equalTo(idPost)
                        .once('value')
                        .then((snapshot) => {
                            setDataModal(snapshotToObject(snapshot));
                            console.log('ok');
                        });

                    setTransactionInfor(snapshot.val());
                    if (transactionInfor.id_roomchat === null) {
                        setTransactionInfor({ id_post: '', id_roomchat: '', id_shipper: '', id_shop: '', status: '' });
                    }

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
                } else {
                    setTransactionInfor({
                        id_post: '',
                        id_roomchat: '',
                        id_shipper: '',
                        id_shop: '',
                        status: '',
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const [fetchLoading, setFetchLoading] = useState(false);

    useEffect(() => {
        if (shipperInfor === null) return;

        setFetchLoading(true);

        const timer = setTimeout(() => {
            setFetchLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [dataModal, transactionInfor, shipperInfor]);
    //////////////////////////////////////////////////////////

    // * Lấy key và value trong object lồng { id : { key: value}}
    const snapshotToObject = (snapshot) => {
        let box = {};
        snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            item.key = childSnapshot.key;
            box = item;
        });
        return box;
    };

    const fetchMoreData = async () => {
        let index = items.length + 5;

        if (items.length >= sortStatus.length) {
            setHasMore(false);
            return;
        }
        setTimeout(() => {
            setItems(sortStatus.slice(0, index));
        }, 1500);
    };

    useEffect(() => {
        setHasMore(true);
    }, [sortByRange, datas, filter]);

    const rePostOrderr = async (dataPostOrder) => {
        if (rePostOrder) {
            await rePostOrder(dataPostOrder);
            enqueueSnackbar(`Đơn #${dataPostOrder.id_post} đã được đăng lại`, { variant: 'success' });
            setShow(false);
        }
    };

    let extraTime = 0;

    const estimateTime = (secs) => {
        const mins = Math.round(secs / 60);

        if (mins <= 1) {
            extraTime = 20;
            return '20 phút';
        }

        const bonusTime = mins + 20;

        extraTime = bonusTime;

        return bonusTime + ' phút';
    };

    // TODO: Ước tính thời gian hoàn thành
    const estimateCompletedTime = (pickedTime) => {
        return moment.unix(pickedTime).add(extraTime, 'minutes').format('HH:mm DD/MM/YYYY');
    };

    // TODO: Thời gian chính xác hoàn tất đơn
    const exactCompletedTime = (completedTime) => {
        return moment.unix(completedTime).format('HH:mm DD/MM/YYYY');
    };

    // TODO: Tính tổng thời gian giao thực tế
    const calTotalTime = (start, end) => {
        const picked = moment.unix(start);
        const completed = moment.unix(end);

        return picked.to(completed); // 2 phút tới
    };

    const popover = (
        <Popover>
            <Popover.Title as="h3">Đây là gì?</Popover.Title>
            <Popover.Content>
                <p>
                    <span className="text-primary-2">Số km ước tính</span> từ điểm nhận đơn tới điểm giao hàng
                </p>
                <p>
                    <span className="text-chartjs">Số phút ước tính</span> shipper giao hàng trong bao lâu
                </p>
                <p>
                    <span className="text-muted">Thời gian hoàn thành ước tính</span> kể từ lúc shipper nhận hàng
                </p>
            </Popover.Content>
        </Popover>
    );

    return (
        <main className="d-flex flex-column flex-row-fluid wrapper">
            <Header />

            <section className="d-flex flex-column flex-row-fluid container">
                <div className="card card-custom card-bottom">
                    <header className="card-header border-0">
                        <div className="card-title py-4">
                            <h3 className="card-label">
                                <span className="d-block title">
                                    Danh sách đơn {titleStatus}
                                    {loading && <SkeletonSortLength />}
                                    {!loading && (
                                        <span className="label label-sm label-light label-rounded font-weight-bolder ml-2">{sortStatus.length}</span>
                                    )}
                                </span>

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

                    <section className="card-body pt-1 newsfeed">
                        {loading && <SkeletonCard />}
                        {!loading && (
                            <InfiniteScroll
                                dataLength={items.length}
                                next={fetchMoreData}
                                hasMore={hasMore}
                                loader={items.length !== 0 && sortStatus.length > 5 && <SkeletonCard />}
                                endMessage={
                                    items.length !== 0 && (
                                        <p style={{ textAlign: 'center' }}>
                                            <span className="font-weight-bold">Yay! Hết cái để xem {subTitleStatus} rồi !</span>
                                        </p>
                                    )
                                }
                            >
                                {items.map((data, index) => (
                                    <>
                                        <article
                                            className="order"
                                            key={index}
                                            onClick={() => {
                                                setDataModal(data);
                                                fetchDataShipper(data.id_post);
                                                setShow(true);
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
                                    </>
                                ))}
                            </InfiniteScroll>
                        )}
                        {!loading && sortStatus.length === 0 && (
                            <>
                                <article className="empty-order">
                                    <span className="text menu-in-progress">
                                        Bạn không có đơn nào {titleStatus} {subTitleStatus} !
                                    </span>
                                </article>
                            </>
                        )}
                    </section>

                    <Modal size="lg" show={show} onHide={handleClose}>
                        <Modal.Header>
                            <Modal.Title>Chi tiết đơn #{dataModal.id_post}</Modal.Title>
                            {dataModal.status === '3' && (
                                <button
                                    className="btn btn-sm btn-light flex-shrink-0"
                                    onClick={() => {
                                        rePostOrderr(dataModal);
                                    }}
                                >
                                    Đặt lại ngay
                                </button>
                            )}
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
                                            <p>
                                                Mã nhận hàng:
                                                <span className="font-weight-bold menu-in-progress ml-2">{dataModal.ma_bi_mat}</span>
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

                            {dataModal.ghi_chu && dataModal.status !== '3' && (
                                <>
                                    <div className="separator separator-dashed my-5" />
                                    <p>
                                        <span className="label label-xl label-inline label-inprogress label-rounded mr-2">Ghi chú:</span>
                                        {dataModal.ghi_chu}
                                    </p>
                                </>
                            )}

                            {dataModal.status === '2' && (
                                <>
                                    <div className="separator separator-dashed my-5" />
                                    <CustomRating shipper_id={shipperInfor.id} post_id={dataModal.id_post} />
                                </>
                            )}

                            {(dataModal.status === '0' || fetchLoading) && dataModal.status !== '3' && <SkeletonShipper status={dataModal.status} />}

                            {!fetchLoading && dataModal.status !== '0' && dataModal.status !== '3' && (
                                <>
                                    <div className="separator separator-dashed my-5" />
                                    <p className="font-weight-bold">Người nhận đơn:</p>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="shipper-info">
                                            <div className="avatar-shipper-sm">
                                                {shipperInfor.avatar && <img src={shipperInfor.avatar} alt="Avatar Shipper" />}
                                            </div>
                                            <div className="mr-5 font-weight-bold text-brown">{shipperInfor.fullname}</div>
                                            <div>
                                                {shipperInfor.phone && convertPhone(shipperInfor.phone)}
                                                <span className="font-weight-bold middle-dot text-brown">
                                                    {shipperInfor.rate_star && shipperInfor.rate_star}
                                                    <i className="fad fa-star-shooting text-warning rate-star ml-1"></i>
                                                </span>
                                            </div>
                                        </div>

                                        {dataModal.status === '1' && (
                                            <span className="cursor-pointer" onClick={handleClickChat}>
                                                <i className="fad fa-comments fa-2x"></i>
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}
                            {dataModal.status === '3' && (
                                <>
                                    <div className="separator separator-dashed my-5" />
                                    <div>
                                        <span className="font-weight-bold">Lý do hủy:</span>
                                        <span className="text-muted ml-2">{dataModal.reason}</span>
                                    </div>
                                </>
                            )}
                            {/* Không hiển Thông tin đơn hàng sau khi hủy */}
                            {dataModal.status !== '3' && (
                                <>
                                    <div className="separator separator-dashed my-5" />
                                    <p className="font-weight-bold">
                                        Theo dõi đơn hàng:<span className="ml-2 text-primary-2">{dataModal.km}</span>
                                        <span className="middle-dot text-chartjs">
                                            {dataModal.completed_time
                                                ? calTotalTime(dataModal.picked_time, dataModal.completed_time)
                                                : estimateTime(dataModal.time_estimate)}
                                        </span>
                                        {dataModal.picked_time && (
                                            <span className="middle-dot text-muted">
                                                {dataModal.completed_time
                                                    ? exactCompletedTime(dataModal.completed_time)
                                                    : estimateCompletedTime(dataModal.picked_time)}
                                            </span>
                                        )}
                                        <OverlayTrigger placement="top" overlay={popover}>
                                            <span className="ml-2 cursor-pointer">
                                                <i className="fad fa-question-circle fa-1x" />
                                            </span>
                                        </OverlayTrigger>
                                    </p>
                                    {dataModal.status !== '2' && (
                                        <GoogleMaps
                                            receiveLat={dataModal.receiveLat}
                                            receiveLng={dataModal.receiveLng}
                                            shipLat={dataModal.shipLat}
                                            shipLng={dataModal.shipLng}
                                            noiNhan={dataModal.noi_nhan}
                                            noiGiao={dataModal.noi_giao}
                                            shipperInfor={shipperInfor}
                                            status={dataModal.status}
                                        />
                                    )}
                                </>
                            )}
                        </Modal.Body>

                        <Modal.Footer className="d-flex justify-content-between">
                            <div>
                                {dataModal.status === '0' && (
                                    <Button variant="chartjs" onClick={() => handledeleteOrder(dataModal.id_post)}>
                                        Hủy đơn
                                    </Button>
                                )}
                            </div>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                        </Modal.Footer>
                        {/* </>
                        ))} */}
                    </Modal>
                    {transactionInfor.id_roomchat !== null && (
                        <Chat
                            showChat={showChat}
                            onHandleCloseChat={handleCloseChat}
                            shopInfo={shopInfo}
                            idPost={dataModal.id_post}
                            idRoom={transactionInfor.id_roomchat}
                            idShop={idShop}
                            shipperInfor={shipperInfor}
                        />
                    )}
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default MainHomePage;
