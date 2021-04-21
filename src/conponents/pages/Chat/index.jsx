import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './styles.scss';
import Avatar from '../../../assets/media/avatar.png';

function ChatModal(props) {
    const { showChat, onHandleCloseChat } = props;

    const handleCloseChat = () => {
        if (!onHandleCloseChat) return;
        onHandleCloseChat(false);
    };

    return (
        <Modal size="lg" show={showChat} onHide={handleCloseChat} backdropClassName="modal-backdrop__chat" className="modal-chat">
            <Modal.Header>
                <Modal.Title>Chat với ?</Modal.Title>
                <Button variant="secondary" onClick={handleCloseChat}>
                    Đóng
                </Button>
            </Modal.Header>
            <Modal.Body className="chat">
                <section className="chat-module">
                    <div className="chat-intro">
                        <div className="avatar-shipper">
                            <img src={Avatar} alt="Avatar Shipper" />
                        </div>

                        <span className="shipper-name">Nguyễn Văn Quỳnh</span>
                        <span className="note">Hãy trò chuyện với shipper để trao đổi thêm nhé</span>
                    </div>
                    <div className="chat-body">
                        <div className="chat-item other-message">
                            <div className="chat-content">
                                <img src={Avatar} alt="The Night Owl" />
                                <div className="message-text">Tao nghĩ dòng này đủ dài để hiển thị nội dung tín mập địt đéo thể tả đc</div>
                                <div className="message-time">12 Aug</div>
                            </div>
                        </div>
                        <div className="chat-item you-message">
                            <div className="chat-content">
                                <div className="message-text">Ok then</div>
                                <div className="message-time">
                                    12 Aug
                                    <span className="ml-2">
                                        <i className="fad fa-check-circle fa-sm pallette-primary"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-start">
                <div className="chat-input">
                    <form className="chat-form">
                        <div className="form-group mb-1">
                            <textarea className="form-control" id="chat-text-area" cols="100" rows="2"></textarea>

                            <div className="chat-icon-group">
                                <span className="btn-icon">
                                    <i className="fad fa-image"></i>
                                </span>
                            </div>
                        </div>
                    </form>
                    <div className="chat-icon-action">
                        <i className="fad fa-paper-plane"></i>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

ChatModal.propTypes = {
    showChat: PropTypes.bool,
    onHandleCloseChat: PropTypes.func,
};

ChatModal.defaultProps = {
    showChat: false,
    onHandleCloseChat: null,
};

export default ChatModal;
