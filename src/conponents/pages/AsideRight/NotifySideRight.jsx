import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import AbstractTwo from '../../../assets/media/abstract-2.svg';
NotifySideRight.propTypes = {
    Notification: propTypes.object,
};

NotifySideRight.defaultProps = {
    Notification: null,
};

function NotifySideRight(props) {
    const { Notification } = props;

    
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
            <div className="card-body pt-2 px-5">
                <div className="py-1">
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
                </div>
            </div>
        </section>
    );
}

export default NotifySideRight;
