import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './styles.scss';

ChatModal.propTypes = {
    showChat: PropTypes.bool,
    onHandleCloseChat: PropTypes.func,
    submitMessage: PropTypes.func,
    chats: PropTypes.array,
    shopName: PropTypes.string,
    idShop: PropTypes.string,
    shipperInfor: PropTypes.object,
};

ChatModal.defaultProps = {
    showChat: false,
    onHandleCloseChat: null,
    submitMessage: null,
    chats: [],
    shopName: '',
    idShop: '',
    shipperInfor: null,
};

function ChatModal(props) {
    const { showChat, onHandleCloseChat, chats, submitMessage, idShop, shipperInfor } = props;

    const [newchat, setNewchat] = useState({
        id: '',
        imgmessage: '',
        message: '',
        timemessage: '',
        isseen: '0',
        name: '',
    });

    const handleCloseChat = () => {
        if (!onHandleCloseChat) return;
        onHandleCloseChat(false);
    };

    const onChange = (e) => {
        e.persist();
        setNewchat({ ...newchat, message: e.target.value });
    };

    const handleSubmitMessage = (e) => {
        e.preventDefault();
        if (submitMessage) {
            submitMessage(newchat);
        }
        setNewchat({
            ...newchat,
            message: '',
            timemessage: '',
            isseen: '0',
            imgmessage: '',
            name: '',
        });
    };

    ///////////////////////////////////////////////
    // ! Check ID
    const checkingID = (id) => {
        if (id === idShop) return 'chat-item you-message';
        return 'chat-item other-message';
    };

    ///////////////////////////////////////////////
    // ! Scroll to bottom and point to user view
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView();
    };

    useEffect(() => {
        scrollToBottom();
    }, [chats, showChat]);

    return (
        <Modal size="lg" show={showChat} onHide={handleCloseChat} backdropClassName="modal-backdrop__chat" className="modal-chat">
            <Modal.Header>
                <Modal.Title>Chat với {shipperInfor.fullname}</Modal.Title>
                <Button variant="secondary" onClick={handleCloseChat}>
                    Đóng
                </Button>
            </Modal.Header>
            <Modal.Body className="chat">
                <section className="chat-module">
                    <div className="chat-intro">
                        <div className="avatar-shipper">
                            <img src={shipperInfor.avatar} alt="Avatar Shipper" />
                        </div>

                        <span className="shipper-name">{shipperInfor.fullname}</span>
                        <span className="note">Hãy trò chuyện với shipper để trao đổi thêm nhé</span>
                    </div>
                    <div className="chat-body">
                        {chats &&
                            chats.map((item, idx) => (
                                <div key={idx} className={checkingID(item.id)}>
                                    <div className="chat-content">
                                        {item.id !== idShop && <img class="shipper-info" src={shipperInfor.avatar} alt="The Night Owl" />}
                                        {item.imgmessage !== '' ? (
                                            <div className="message-image">
                                                <img src={item.imgmessage} alt="" />
                                            </div>
                                        ) : (
                                            <div className="message-text">{item.message}</div>
                                        )}
                                        <div className="message-time">{item.timemessage}</div>
                                    </div>
                                </div>
                            ))}
                        <div ref={messagesEndRef} />
                    </div>
                </section>
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-start">
                <div className="chat-input">
                    <form className="chat-form" onSubmit={handleSubmitMessage}>
                        <div className="form-group mb-1">
                            <input
                                className="form-control"
                                id="chat-text-area"
                                placeholder="Nhập nội dung tin nhắn..."
                                value={newchat.message}
                                onChange={onChange}
                            ></input>

                            {/* <div className="chat-icon-group">
                                <span className="btn-icon">
                                    <i className="fad fa-image"></i>
                                </span>
                            </div> */}
                        </div>
                    </form>
                    <div className="chat-icon-action">
                        <i className="fad fa-paper-plane" onClick={handleSubmitMessage}></i>
                    </div>
                    {/* <span className="form-text text-chartjs"></span> */}
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ChatModal;
