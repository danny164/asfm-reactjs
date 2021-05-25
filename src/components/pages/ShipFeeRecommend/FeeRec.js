import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import classnames from 'classnames';

FeeRec.propTypes = {
    km: PropTypes.number,
    show: PropTypes.bool,
    onHandleClose: PropTypes.func,
    onSubmit: PropTypes.func,
};

FeeRec.defaultProps = {
    km: 6,
    show: false,
    onHandleClose: null,
    onSubmit: null,
};

function FeeRec(props) {
    const { show, onHandleClose, km, onSubmit } = props;
    const [feeRec, setFeeRec] = useState();
    const [newPrice, setNewPrice] = useState(0);

    const handleClose = () => {
        if (!onHandleClose) return;
        onHandleClose(false);
    };

    function shipFeeRec(km) {
        let fee = [];
        console.log(km);
        const price = Math.round(5 * (km / 1000));
        fee.push(price * 1000);
        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                if (price % 10 < 5) {
                    fee.push(price * 1000 + (5 - (price % 10)) * 1000);
                } else {
                    fee.push(price * 1000 + (10 - (price % 10)) * 1000);
                }
            } else {
                if (price % 10 < 5) {
                    fee.push(price * 1000 + (5 - (price % 10)) * 1000 + i * 5000);
                } else {
                    fee.push(price * 1000 + (10 - (price % 10)) * 1000 + i * 5000);
                }
            }
        }
        setFeeRec(fee);
        console.log(fee);
    }

    useEffect(() => {
        if (km) {
            shipFeeRec(km);
        }
    }, [km]);

    const handleClick = (type) => {
        if (type === '1') {
            if (newPrice === 0) {
                return alert('Vui lòng chọn giá tiền mới !');
            } else {
                if (onSubmit) {
                    onSubmit(newPrice);
                }
            }
        } else {
            onSubmit(0, 1);
        }
    };

    const convertPrice = (value) => {
        const output = value / 1000 + ',000 đ';
        return output;
    };

    
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi phí giao hàng có vẻ chưa ổn?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-5">
                        Dựa theo khoảng cách <span className="text-primary-2 font-weight-bold">{`${km / 1000} km`} </span> của đơn hàng, chúng tôi có đề xuất lại
                        cho bạn các mức giá sau
                    </div>
                    <div className="d-flex justify-content-around">
                        {feeRec &&
                            feeRec.map((data) => (
                                <button
                                    key={data.key}
                                    type="button"
                                    className={classnames({ btn: true, 'btn-light': data !== newPrice, 'label-active': data === newPrice })}
                                    onClick={() => setNewPrice(data)}
                                >
                                    {convertPrice(data)}
                                </button>
                            ))}
                    </div>
                    <div className="separator separator-dashed my-5" />
                    <div className="d-flex">
                        <span className="label label-xl label-inline label-inprogress label-rounded mr-2">Lưu ý:</span>
                        <p>
                            - Mức giá trên chỉ mang tính chất tham khảo
                            <br />- Bạn có thể <span className="text-primary-2">giữ nguyên</span> mức giá cũ <span className="text-muted">hoặc</span>
                            <br />- <span className="text-chartjs">Thay đổi</span> để tăng khả năng nhận đơn hơn
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClick('0')}>
                        Tôi vẫn muốn giữ nguyên
                    </Button>
                    <Button variant="light-danger" onClick={() => handleClick('1')}>
                        Thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FeeRec;
