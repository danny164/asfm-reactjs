import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import { realtime } from '../../../firebase';

import PropTypes from 'prop-types';
import ChatModal from '.';

Chat.propTypes = {
    showChat: PropTypes.bool,
    onHandleCloseChat: PropTypes.func,
    shopInfo: PropTypes.object,
    shipperName: PropTypes.string,
    idRoom: PropTypes.string,
    idShop: PropTypes.string,
};

Chat.defaultProps = {
    showChat: false,
    onHandleCloseChat: null,
    shopInfo: null,
    shipperName: '',
    idRoom: '',
    idShop: '',
};

function Chat(props) {
    const { shopInfo, showChat, onHandleCloseChat, shipperName, idRoom, idShop } = props;
    const [chats, setChats] = useState([]);
    const [newchat, setNewchat] = useState({ id: shopInfo.id, imgmessage: '', message: '', timemessage: '', isseen: '', name: '' });

    useEffect(() => {
        const fetchData = async () => {
            idRoom &&
                realtime.ref('Chatroom/' + idRoom).on('value', (resp) => {
                    setChats([]);
                    setChats(snapshotToArray(resp));
                    console.log(chats);
                });
        };
        fetchData();
    }, [newchat, idRoom]);

    const snapshotToArray = (snapshot) => {
        const returnArr = [];
        snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });
        return returnArr;
    };

    const submitMessage = (newestChat) => {
        // setNewchat(newestChat)
        const chat = newestChat;
        chat.id = idShop;
        chat.name = shopInfo.fullname;
        chat.timemessage = Moment(new Date()).format('HH:mm');
        const newMessage = realtime.ref('Chatroom/' + idRoom).push();
        newMessage.set(chat);
        setNewchat({ ...newchat, message: '', name: '', timemessage: '', isseen: '', imgmessage: '' });
    };

    return (
        <div>
            <ChatModal
                showChat={showChat}
                onHandleCloseChat={onHandleCloseChat}
                submitMessage={submitMessage}
                chats={chats}
                shipperName={shipperName}
                shopInfo={shopInfo}
                idShop={idShop}
            />
        </div>
    );
}

export default Chat;