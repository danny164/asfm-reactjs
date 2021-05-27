import { useAuth } from 'context/AuthContext';
import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { realtime } from '../../../firebase';
import PropTypes from 'prop-types';
import moment from 'moment';
import random from 'randomstring';

FeedbackModal.propTypes = {
    id_post: PropTypes.string,
};

FeedbackModal.defaultProps = {
    id_post: '',
};
function FeedbackModal(props) {
    const { id_post } = props;

    const [show, setShow] = useState(false);
    const [typeReport, setTypeReport] = useState('khiếu nại');
    const contentRef = useRef();

    const { currentUser } = useAuth();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async () => {
        let idReport =
            moment().format('YYYYMMDD-HHmmssSSS') +
            random.generate({
                length: 3,
                charset: 'numeric',
            });
        try {
            await realtime.ref('report/' + currentUser.uid + '/' + idReport).set({
                id_report: idReport,
                type: typeReport,
                content: contentRef.current.value,
                fullName: localStorage.getItem('fullname'),
                email: localStorage.getItem('email'),
                id_post: id_post,
                status: '0',
                time: moment().format('X'),
            });

            await realtime.ref('OrderStatus/' + currentUser.uid + '/' + id_post).update({
                statusReport: 1
            })
            
            handleClose();
        } catch (err) {
            console.log(err);
        }
    };
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
                                        value={id_post}
                                        className="form-control form-control-solid form-control-lg"
                                        placeholder="Id đơn hàng"
                                        disabled
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Loại phản hồi</label>
                                    <div className="checkbox-inline">
                                        <label className="checkbox checkbox-success">
                                            <input type="radio" defaultChecked="checked" name="checkbox" onClick={() => setTypeReport('khiếu nại')} />
                                            <span />
                                            Khiếu nại
                                        </label>
                                        <label className="checkbox checkbox-success">
                                            <input type="radio" name="checkbox" onClick={() => setTypeReport('góp ý')} />
                                            <span />
                                            Góp ý
                                        </label>
                                        <label className="checkbox checkbox-success">
                                            <input type="radio" name="checkbox" onClick={() => setTypeReport('khác')} />
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
                                        ref={contentRef}
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
                    <Button variant="chartjs" onClick={handleSubmit}>
                        Gửi phản hồi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

FeedbackModal.propTypes = {};

export default FeedbackModal;
