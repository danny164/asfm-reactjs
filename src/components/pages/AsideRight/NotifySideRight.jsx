import 'moment/locale/vi';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import AbstractTwo from '../../../assets/media/abstract-2.svg';
import './styles.scss';
import moment from 'moment';
import SkeletonNotification from '../Skeleton/SkeletonNotification';

function NotifySideRight(props) {
    const notification = useSelector((state) => state.notification);

    const [loading, setLoading] = useState(false);
    const [sortStatus, setSortStatus] = useState([]);
    const [items, setItems] = useState([]);

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

            setLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
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

    return (
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
                            <div className="separator separator-dashed my-2" />
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
                        </>
                    ))}
                {!loading && sortStatus.length === 0 && (
                    <>
                        <div className="separator separator-dashed my-2" />
                        <div className="py-1">Bạn chưa có thông báo nào !</div>
                    </>
                )}
                {!loading && items.length !== sortStatus.length && sortStatus.length !== 0 && (
                    <>
                        <div className="separator separator-dashed mt-2" />
                        <div className="text-center p-3 cursor-pointer" onClick={handleOnClick}>
                            Xem thêm
                        </div>
                    </>
                )}
                {!loading && items.length === sortStatus.length && sortStatus.length !== 0 && (
                    <>
                        <div className="separator separator-dashed mt-2" />
                        <div className="text-center p-3 cursor-pointer">Bạn đã xem hết thông báo gần đây</div>
                    </>
                )}
            </div>
        </section>
    );
}

export default NotifySideRight;
