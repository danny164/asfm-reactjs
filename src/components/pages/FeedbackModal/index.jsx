import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function FeedbackModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Gửi khiếu nại / phản hồi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form">
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label>ID đơn hàng</label>
                                    <input
                                        type="text"
                                        value="#123456"
                                        className="form-control form-control-solid form-control-lg"
                                        placeholder="Id đơn hàng"
                                        disabled
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Loại phản hồi</label>
                                    <div className="checkbox-inline">
                                        <label className="checkbox checkbox-success">
                                            <input type="checkbox" defaultChecked="checked" name="checkbox" />
                                            <span />
                                            Khiếu nại
                                        </label>
                                        <label className="checkbox checkbox-success">
                                            <input type="checkbox" name="checkbox" />
                                            <span />
                                            Góp ý
                                        </label>
                                        <label className="checkbox checkbox-success">
                                            <input type="checkbox" name="checkbox" />
                                            <span />
                                            Khác
                                        </label>
                                    </div>
                                    <span className="form-text text-muted">Có thể chọn được nhiều mục</span>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleTextarea">Ý kiến của bạn</label>
                                    <textarea
                                        className="form-control form-control-solid form-control-lg"
                                        id="exampleTextarea"
                                        rows={3}
                                        defaultValue={''}
                                    />
                                    <span className="form-text text-muted">
                                        Thông tin sẽ được giữ bí mật để nâng cao và cải thiện chất lượng dịch vụ
                                    </span>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="chartjs" onClick={handleClose}>
                        Gửi phản hồi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

FeedbackModal.propTypes = {};

export default FeedbackModal;
