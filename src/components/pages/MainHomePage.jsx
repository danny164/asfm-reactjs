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
import { CopyToClipboard } from 'react-copy-to-clipboard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { db, realtime } from '../../firebase';
import { handleDeleteOrder } from '../pages/HomepageFunc/DeleteOrder';
import { RePostOrder } from '../pages/HomepageFunc/RePostOrder';
import Chat from './Chat/Chat';
import FeedbackModal from './FeedbackModal';
import GoogleMaps from './Map/GoogleMaps';
import CustomRating from './Rating';
import SkeletonCard from './Skeleton/SkeletonCard';
import SkeletonShipper from './Skeleton/SkeletonShipper';
import SkeletonSortLength from './Skeleton/SkeletonSortLength';
import Avatar from 'assets/media/avatar.png';

MainHomePage.propTypes = {
    shopInfo: PropTypes.object,
    idShop: PropTypes.string,
    datas: PropTypes.object,
    ChangeOrderStatus: PropTypes.func,
    deleteOrder: PropTypes.func,
};

MainHomePage.defaultProps = {
    shopInfo: null,
    datas: null,
    ChangeOrderStatus: null,
    deleteOrder: null,
    idShop: '',
};
const convertPhone = (phone) => {
    const match = phone.match(/^(\d{4})(\d{3})(\d{3})$/);
    if (match) {
        return [match[1], match[2], match[3]].join(' ');
    }
    return null;
};

function MainHomePage(props) {
    const { datas, shopInfo, idShop } = props;

    const [hasMore, setHasMore] = useState(true);
    const [copied, setCopied] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const [sortStatus, setSortStatus] = useState([]);
    const { currentUser } = useAuth();

    const [titleStatus, setTitleStatus] = useState('g???n ????y');

    const [sortByRange, setSortByRange] = useState('1');
    const [subTitleStatus, setSubTitleStatus] = useState('trong ng??y');

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

    useEffect(() => {
        if (copied) {
            enqueueSnackbar('???? copy Order ID th??nh c??ng', { variant: 'success' });
            setCopied(false);
        }
    }, [copied]);

    /////////////////////////////////////////////////////////
    // ! L???c theo s??? ki???n click tr??n header

    const filter = useSelector((state) => state.filter);

    const [checkLoading, setCheckLoading] = useState(false);

    useEffect(() => {
        setCheckLoading(false);
        if (filter === 'all') setTitleStatus('g???n ????y');
        if (filter === '0') setTitleStatus('??ang x??? l??');
        if (filter === '1') setTitleStatus('???? nh???n');
        if (filter === '2') setTitleStatus('ho??n th??nh');
        if (filter === '3') setTitleStatus('b??? h???y');
    }, [filter]);

    // * L???c theo ph???m vi, tr??? v??? k???t qu??? theo ng??y, th??ng, tu???n cho lastStatus []
    const last24hrs = (sortByRange, dataTime) => {
        if (sortByRange === '7') {
            return dataTime >= moment().subtract(7, 'days').format('X');
        }
        if (sortByRange === '30') return dataTime >= moment().subtract(1, 'month').format('X');
        return dataTime >= moment().subtract(1, 'day').format('X');
    };

    // * Khi Sort by Range thay ?????i, th?? Title c??ng c???n update theo
    useEffect(() => {
        if (sortByRange === '1') setSubTitleStatus('trong ng??y');
        if (sortByRange === '7') setSubTitleStatus('trong tu???n');
        if (sortByRange === '30') setSubTitleStatus('trong th??ng');
    }, [sortByRange]);

    // * Nh???n lo???i sort t??? s??? ki???n click
    const handleSortByRange = (range) => {
        setSortByRange(range);
    };

    /////////////////////////////////////////////////////////
    // ! delay loading ch??? l???y th??ng tin
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    // Ch???y l???n ?????u b???t bu???c ph???i c?? loading
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

    // Ch???y l???n 2 data status thay ?????i s??? kh??ng b??? d??nh loading
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
    // ! X??a ????n
    const handledeleteOrder = async (id) => {
        if (handleDeleteOrder) {
            await handleDeleteOrder(id, 'B???n ???? th???c hi???n thao t??c h???y tr??n h??? th???ng !', currentUser.uid, enqueueSnackbar);
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
    // ! Fetch th??ng tin c???a shipper khi nh???n ????n

    const fetchDataShipper = async (idPost) => {
        try {
            await realtime.ref('Transaction/' + idPost).on('value', (snapshot) => {
                /* ki???m tra l???n ?????u n???u ch??a c?? dataModel th?? k ch???y setDataModal 
                v?? ki???m tra n???u c?? thay ?????i status th?? m???i set k th?? th??i */

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
                                    console.log('Kh??ng fetch ???????c d??? li???u !');
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

    // * L???y key v?? value trong object l???ng { id : { key: value}}
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

    const rePostOrder = async (dataPostOrder) => {
        if (RePostOrder) {
            let re;
            re = await RePostOrder(dataPostOrder, currentUser.uid, enqueueSnackbar);
            if (re === 0) {
                return setShow(false);
            }
            enqueueSnackbar(`????n #${dataPostOrder.id_post} ???? ???????c ????ng l???i`, { variant: 'success' });
            setShow(false);
        }
    };

    let extraTime = 0;

    const estimateTime = (secs) => {
        const mins = Math.round(secs / 60);

        if (mins <= 1) {
            extraTime = 20;
            return '20 ph??t';
        }

        const bonusTime = mins + 20;

        extraTime = bonusTime;

        return bonusTime + ' ph??t';
    };

    // TODO: ?????c t??nh th???i gian ho??n th??nh
    const estimateCompletedTime = (pickedTime) => {
        return moment.unix(pickedTime).add(extraTime, 'minutes').format('HH:mm DD/MM/YYYY');
    };

    // TODO: Th???i gian ch??nh x??c ho??n t???t ????n
    const exactCompletedTime = (completedTime) => {
        return moment.unix(completedTime).format('HH:mm DD/MM/YYYY');
    };

    // TODO: T??nh t???ng th???i gian giao th???c t???
    const calTotalTime = (start, end) => {
        const picked = moment.unix(start);
        const completed = moment.unix(end);

        return picked.to(completed); // 2 ph??t t???i
    };

    const popover = (
        <Popover>
            <Popover.Title as="h3">????y l?? g???</Popover.Title>
            <Popover.Content>
                <p>
                    <span className="text-primary-2">S??? km ?????c t??nh</span> t??? ??i???m nh???n ????n t???i ??i???m giao h??ng
                </p>
                <p>
                    <span className="text-chartjs">S??? ph??t ?????c t??nh</span> shipper giao h??ng trong bao l??u
                </p>
                <p>
                    <span className="text-muted">Th???i gian ho??n th??nh ?????c t??nh</span> k??? t??? l??c shipper nh???n h??ng
                </p>
            </Popover.Content>
        </Popover>
    );

    //update l???i read = 1 cho cho dataModal, tr??nh report l???n 2
    const handleUpdateSubmitReport = () => {
        setDataModal({ ...dataModal, status_report: 1 });
    };

    return (
        <main className="d-flex flex-column flex-row-fluid wrapper">
            <Header />

            <section className="d-flex flex-column flex-row-fluid container">
                <div className="card card-custom card-bottom">
                    <header className="card-header border-0">
                        <div className="card-title py-4">
                            <h3 className="card-label">
                                <span className="d-block title">
                                    Danh s??ch ????n {titleStatus}
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
                                        <span className="nav-text">Th??ng</span>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div
                                        className={`nav-link btn py-2 px-4 ${sortByRange === '7' ? 'active' : 'btn-outline-secondary'}`}
                                        onClick={() => handleSortByRange('7')}
                                    >
                                        <span className="nav-text">Tu???n</span>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div
                                        className={`nav-link btn py-2 px-4 ${sortByRange === '1' ? 'active' : 'btn-outline-secondary'}`}
                                        onClick={() => handleSortByRange('1')}
                                    >
                                        <span className="nav-text">Ng??y</span>
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
                                            <span className="font-weight-bold">Yay! H???t c??i ????? xem {subTitleStatus} r???i !</span>
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
                                                                Chi ph?? giao h??ng:{' '}
                                                                <span className="font-weight-bold text-primary-2">{data.phi_giao}</span>
                                                            </div>
                                                            <div className="mb-1">
                                                                T???m ???ng: <span className="font-weight-bold text-chartjs">{data.phi_ung}</span>
                                                            </div>
                                                        </div>
                                                        <span className="delivery">Giao h??ng t???i</span>
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
                                        B???n kh??ng c?? ????n n??o {titleStatus} {subTitleStatus} !
                                    </span>
                                </article>
                            </>
                        )}
                    </section>

                    <Modal size="lg" show={show} onHide={handleClose}>
                        <Modal.Header>
                            <Modal.Title>Chi ti???t ????n #{dataModal.id_post}</Modal.Title>
                            {dataModal.status === '3' && (
                                <button
                                    className="btn btn-sm btn-light flex-shrink-0"
                                    onClick={() => {
                                        rePostOrder(dataModal);
                                    }}
                                >
                                    ?????t l???i ngay
                                </button>
                            )}
                            {dataModal.status === '2' && dataModal.status_report === 0 && (
                                <FeedbackModal id_post={dataModal.id_post} handleUpdateSubmitReport={handleUpdateSubmitReport} />
                            )}
                        </Modal.Header>
                        <Modal.Body>
                            <div className="d-flex align-items-start">
                                <span className="bullet bullet-bar bg-orange align-self-stretch" />
                                <div className="d-flex flex-column flex-grow-1 ml-4">
                                    <header className="card-title content mb-4">
                                        <span>
                                            Order ID: {dataModal.id_post}{' '}
                                            <CopyToClipboard text={dataModal.id_post} onCopy={() => setCopied(true)}>
                                                <span className="ml-1 cursor-pointer">
                                                    <i className="fad fa-copy"></i>
                                                </span>
                                            </CopyToClipboard>
                                        </span>
                                        <span>
                                            {dateToFromNowDaily(dataModal.thoi_gian)}
                                            {/* <Moment format="DD/MM/YYYY">{data.thoi_gian}</Moment> */}
                                        </span>
                                    </header>
                                    <section className="card-info content">
                                        <div className="mb-5">
                                            <p>
                                                T??n kh??ch h??ng:
                                                <span className="font-weight-bold ml-2">{dataModal.ten_nguoi_nhan}</span>
                                            </p>
                                            <p>
                                                S??? ??i???n tho???i:
                                                <span className="font-weight-bold ml-2">{dataModal.sdt_nguoi_nhan}</span>
                                            </p>
                                            <p>
                                                Chi ph?? giao h??ng:
                                                <span className="font-weight-bold text-primary-2 ml-2">{dataModal.phi_giao}</span>
                                            </p>
                                            <p>
                                                T???m ???ng:
                                                <span className="font-weight-bold text-chartjs ml-2">{dataModal.phi_ung}</span>
                                            </p>
                                            <p>
                                                M?? nh???n h??ng:
                                                <span className="font-weight-bold menu-in-progress ml-2">{dataModal.ma_bi_mat}</span>
                                            </p>
                                        </div>

                                        <p className="delivery m-0">Nh???n h??ng t???</p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <address className="mb-0 pl-0">{dataModal.noi_nhan}</address>
                                        </div>

                                        <p className="delivery m-0 mt-5">Giao h??ng t???i</p>
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
                                        <span className="label label-xl label-inline label-inprogress label-rounded mr-2">Ghi ch??:</span>
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
                                    <p className="font-weight-bold">Ng?????i nh???n ????n:</p>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="shipper-info">
                                            <div className="avatar-shipper-sm">
                                                <img src={shipperInfor.avatar || Avatar} alt="Avatar Shipper" />
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
                                        <span className="font-weight-bold">L?? do h???y:</span>
                                        <span className="text-muted ml-2">{dataModal.reason}</span>
                                    </div>
                                </>
                            )}
                            {/* Kh??ng hi???n Th??ng tin ????n h??ng sau khi h???y */}
                            {dataModal.status !== '3' && (
                                <>
                                    <div className="separator separator-dashed my-5" />
                                    <p className="font-weight-bold">
                                        Theo d??i ????n h??ng:<span className="ml-2 text-primary-2">{dataModal.km}</span>
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
                                        H???y ????n
                                    </Button>
                                )}
                            </div>
                            <Button variant="secondary" onClick={handleClose}>
                                ????ng
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
