import { dateToFromNowDaily } from 'convert/DateToFromNow';
import moment from 'moment';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Chat from '../Chat/Chat';
import GoogleMaps from '../Map/GoogleMaps';
import CustomRating from '../Rating';
import SkeletonShipper from '../Skeleton/SkeletonShipper';

OrderModal.propTypes = {};

function OrderModal(props) {
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
        <>
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
        </>
    );
}

export default OrderModal;
