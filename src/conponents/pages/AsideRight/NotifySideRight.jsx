import React from 'react';
import PropTypes from 'prop-types';
import AbstractTwo from '../../../assets/media/abstract-2.svg';
import './styles.scss';
import moment from 'moment';

NotifySideRight.propTypes = {
    Notification: PropTypes.array,
};

NotifySideRight.defaultProps = {
    Notification: [],
};

function NotifySideRight(props) {
    const { Notification } = props;

    const baseOnStatus = [
        {
            id: 1,
            name: 'được xử lý',
            classname: `font-weight-bold text-warning`,
        },
        {
            id: 2,
            name: 'được xác nhận',
            classname: `font-weight-bold text-purple`,
        },
        {
            id: 3,
            name: 'giao thành công',
            classname: `font-weight-bold text-primary-2`,
        },
        {
            id: 4,
            name: 'bị hủy',
            classname: `font-weight-bold text-chartjs`,
        },
    ];

    // const dateToFromNowDaily = (date) => {
    //     const convertDate = moment.unix(date);

    //     return moment(convertDate).relativeTime(null, {
    //         future: 'in %s',
    //         past: '%s ago',
    //         s: 'a few seconds',
    //         ss: '%d seconds',
    //         m: 'a minute',
    //         mm: '%d minutes',
    //         h: 'an hour',
    //         hh: '%d hours',
    //         d: 'a day',
    //         dd: '%d days',
    //         w: 'a week',
    //         ww: '%d weeks',
    //         M: 'a month',
    //         MM: '%d months',
    //         y: 'a year',
    //         yy: '%d years',
    //     });
    // };

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
                                Đơn hàng <span className="font-weight-bold menu-in-progress">#{data.id_post}</span> đã{' '}
                                <span className={baseOnStatus[data.status].classname}>{baseOnStatus[data.status].name}</span>.{' '}
                                <span className="font-size-sm text-time">{moment.unix(data.thoi_gian).fromNow()}</span>
                            </div>
                        </>
                    ))}

                {/* <div className="py-1">
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
                    <span className="font-weight-bold text-chartjs">bị hủy</span>. <span className="font-size-sm text-time">5 phút trước</span>
                </div> */}
            </div>
        </section>
    );
}

export default NotifySideRight;
