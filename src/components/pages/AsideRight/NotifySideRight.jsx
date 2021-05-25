import { fetchDataShipper } from 'components/pages/HomepageFunc/fetchDataShipper';
import { useAuth } from 'context/AuthContext';
import moment from 'moment';
import 'moment/locale/vi';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import AbstractTwo from '../../../assets/media/abstract-2.svg';
import SkeletonNotification from '../Skeleton/SkeletonNotification';
import OrderModal from './OrderModal';
import './styles.scss';

NotifySideRight.propTypes = {};

NotifySideRight.defaultProps = {};

const baseOnStatus = [
    {
        id: 1,
        action: 'đang',
        name: 'được xử lý',
        classname: `text-progress`,
        icon: <i className="fad fa-spinner text-progress fa-sm mr-1"></i>,
    },
    {
        id: 2,
        action: 'đã',
        name: 'có shipper nhận',
        classname: `text-picked`,
        icon: <i className="fad fa-box-full text-picked fa-sm mr-1"></i>,
    },
    {
        id: 3,
        action: 'đã',
        name: 'giao hàng thành công',
        classname: `text-done`,
        icon: <i className="fad fa-check-circle text-done fa-sm mr-1"></i>,
    },
    {
        id: 4,
        action: 'đã',
        name: 'bị hủy',
        classname: `text-cancelled`,
        icon: <i className="fad fa-times-circle text-cancelled fa-sm mr-1"></i>,
    },
];

function NotifySideRight(props) {
    const { currentUser } = useAuth();
    const [shipperInfor, setShipperInfor] = useState({});
    const [transactionInfor, setTransactionInfor] = useState({});
    const [dataModal, setDataModal] = useState([]);

    const shopInfo = {
        fullname: localStorage.getItem('fullName'),
        email: localStorage.getItem('email'),
        id: currentUser.uid,
    };

    const notification = useSelector((state) => state.notification);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [checkLoading, setCheckLoading] = useState(false);
    const [sortStatus, setSortStatus] = useState([]);
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const last72hrs = (dataTime) => {
        return dataTime >= moment().subtract(3, 'days').format('X');
    };

    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(async () => {
            if (notification) {
                const renderStatus = Object.values(notification).filter((data) => last72hrs(data.thoi_gian));
                await setSortStatus(renderStatus.sort((a, b) => (a.thoi_gian < b.thoi_gian ? 1 : -1)));
                await setItems(renderStatus.sort((a, b) => (a.thoi_gian < b.thoi_gian ? 1 : -1)).slice(0, 10));
            } else {
                setSortStatus([]);
            }
            setCheckLoading(true);

            setLoading(false);
        }, 800);

        return () => {
            clearTimeout(timer);
        };
    }, [checkLoading]);

    useEffect(() => {
        if (checkLoading) {
            const timer = setTimeout(async () => {
                if (notification) {
                    const renderStatus = Object.values(notification).filter((data) => last72hrs(data.thoi_gian));
                    await setSortStatus(renderStatus.sort((a, b) => (a.thoi_gian < b.thoi_gian ? 1 : -1)));
                    await setItems(renderStatus.sort((a, b) => (a.thoi_gian < b.thoi_gian ? 1 : -1)).slice(0, 10));
                } else {
                    setSortStatus([]);
                }
            }, 800);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [notification]);

    const handleOnClick = async () => {
        let index = items.length + 10;

        if (items.length >= sortStatus.length) {
            return;
        }
        setTimeout(() => {
            setItems(sortStatus.slice(0, index));
        }, 1500);
    };

    //lấy data để hiển thị modal khi bấm vào thông báo
    const handleIdPostClick = async (id) => {
        await fetchDataShipper(id, currentUser.uid, setDataModal, setTransactionInfor, setShipperInfor);
        setShowModal(true);
    };

    const handleShowOrder = () => {
        setShowModal(false);
    };

    return (
        <>
            <section
                className="card card-custom bgi-no-repeat gutter-b"
                style={{ backgroundPosition: 'right top', backgroundSize: '30% auto', backgroundImage: `url(${AbstractTwo})` }}
            >
                <div className="card-header card-notify">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="title">Thông báo trong ngày gần đây</span>
                    </h3>
                </div>
                <div className="card-body card-body--notify pt-2 px-5">
                    {/* Id chỉ làm cảnh =)), dựa vào data.status = [0, 1, 2, 3, 4] tương ứng vs độ dài mảng baseOnStatus */}
                    {loading && <SkeletonNotification />}
                    {!loading &&
                        items.map((data) => (
                            <>
                                <div className="noti-modal cursor-pointer" onClick={() => handleIdPostClick(data.id_post)}>
                                    <div className="py-1" key={`${data.id_post} ${data.status}`}>
                                        {baseOnStatus[data.status].icon}Đơn hàng <span className="text-id">#{data.id_post}</span> của bạn{' '}
                                        {baseOnStatus[data.status].action}{' '}
                                        <span className={baseOnStatus[data.status].classname}>{baseOnStatus[data.status].name}</span>.{' '}
                                        <span className="font-size-sm text-time">
                                            <Moment locale="vi" unix fromNow>
                                                {data.thoi_gian}
                                            </Moment>
                                        </span>{' '}
                                    </div>
                                </div>
                                <div className="separator separator-dashed my-2" />
                            </>
                        ))}
                    {!loading && sortStatus.length === 0 && (
                        <>
                            <div className="py-1">Bạn chưa có thông báo nào !</div>
                        </>
                    )}
                    {!loading && items.length !== sortStatus.length && sortStatus.length !== 0 && (
                        <>
                            <div className="text-center pt-2 pb-3 cursor-pointer" onClick={handleOnClick}>
                                Xem thêm
                            </div>
                        </>
                    )}
                    {!loading && items.length === sortStatus.length && sortStatus.length !== 0 && (
                        <>
                            <div className="text-center pt-2 pb-3">Bạn đã xem hết thông báo gần đây</div>
                        </>
                    )}
                </div>
            </section>
            {/* <OrderModal /> */}
            {showModal === true && (
                <OrderModal
                    modalShow={handleShowOrder}
                    shopInfo={shopInfo}
                    transactionInfor={transactionInfor}
                    shipperInfor={shipperInfor}
                    dataModal={dataModal}
                />
            )}
        </>
    );
}

export default NotifySideRight;
