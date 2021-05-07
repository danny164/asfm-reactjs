import React from 'react';
import PropTypes from 'prop-types';
import AbstractTwo from '../../../assets/media/abstract-2.svg';
import './styles.scss';
import 'moment/locale/vi';
import Moment from 'react-moment';

NotifySideRight.propTypes = {
    Notification: PropTypes.object,
};

NotifySideRight.defaultProps = {
    Notification: null,
};

function NotifySideRight(props) {
    const { Notification } = props;

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
                {Notification &&
                    Object.values(Notification).map((data) => (
                        <>
                            <div className="separator separator-dashed my-2" />
                            <div className="py-1" key={`${data.id_post} ${data.status}`}>
                                {baseOnStatus[data.status].icon}Đơn hàng <span className="text-id">#{data.id_post}</span>{' '}
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
            </div>
        </section>
    );
}

export default NotifySideRight;
