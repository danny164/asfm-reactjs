import { useAuth } from 'context/AuthContext';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import random from 'randomstring';
import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { realtime } from '../../../firebase';
import './styles.scss';

FeedbackModal.propTypes = {
    id_post: PropTypes.string,
};

FeedbackModal.defaultProps = {
    id_post: '',
};
function FeedbackModal(props) {
    const { id_post } = props;

    const [show, setShow] = useState(false);
    const [typeReport, setTypeReport] = useState('0');
    const contentRef = useRef();

    const { enqueueSnackbar } = useSnackbar();

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
                fullname: localStorage.getItem('fullname'),
                email: localStorage.getItem('email'),
                id_post: id_post,
                status: '0',
                by: '0',
                admin: '',
                time: moment().format('X'),
            });

            await realtime.ref('OrderStatus/' + currentUser.uid + '/' + id_post).update({
                statusReport: 1,
            });

            enqueueSnackbar('Bạn đã báo cáo thành công', { variant: 'success' });

            handleClose();
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <Button variant="sm btn-light flex-shrink-0" onClick={handleShow}>
                Báo cáo đơn
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdropClassName="modal-backdrop__feedback"
                className="modal-feedback"
            >
                <Modal.Header>
                    <Modal.Title>Báo cáo đơn</Modal.Title>
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
                                    <label>Loại báo cáo</label>
                                    <div className="checkbox-inline">
                                        <label className="checkbox checkbox-success">
                                            <input
                                                type="radio"
                                                defaultChecked="checked"
                                                name="checkbox"
                                                onClick={() => setTypeReport('0')}
                                            />
                                            <span />
                                            Khiếu nại
                                        </label>
                                        <label className="checkbox checkbox-success">
                                            <input type="radio" name="checkbox" onClick={() => setTypeReport('1')} />
                                            <span />
                                            Góp ý
                                        </label>
                                        <label className="checkbox checkbox-success">
                                            <input type="radio" name="checkbox" onClick={() => setTypeReport('2')} />
                                            <span />
                                            Khác
                                        </label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleTextarea">Ý kiến của bạn</label>
                                    <textarea
                                        className="form-control form-control-lg"
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
