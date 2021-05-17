import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

FeeRec.propTypes = {
    km: PropTypes.number,
    show: PropTypes.bool,
    onHandleClose: PropTypes.func,
};

FeeRec.defaultProps = {
    km: 0,
    show: false,
    onHandleClose: null,
};
function FeeRec(props) {
    const { show, onHandleClose } = props;

    const handleClose = () => {
        if (!onHandleClose) return;
        onHandleClose(false);
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi phí giao hàng có vẻ chưa ổn?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-5">
                        Dựa theo khoảng cách <span className="text-primary-2 font-weight-bold">7.4km</span> của đơn hàng, chúng tôi có đề xuất lại cho
                        bạn các mức giá sau
                    </div>
                    <div className="d-flex justify-content-around">
                        <button type="button" class="btn btn-light">
                            10,000
                        </button>
                        <button type="button" class="btn label-active">
                            20,000
                        </button>
                        <button type="button" class="btn btn-light">
                            30,000
                        </button>
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
                    <Button variant="secondary">Tôi vẫn muốn giữ nguyên</Button>
                    <Button variant="light-danger">Thay đổi</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FeeRec;
