import React from 'react';
import { realtime, db } from '../../../firebase';

export const fetchDataShipper = async (idPost, uid, setDataModal, setTransactionInfor, setShipperInfor) => {
    try {
        await realtime.ref('Transaction/' + idPost).on('value', (snapshot) => {
            /* kiểm tra lần đầu nếu chưa có dataModel thì k chạy setDataModal 
            và kiểm tra nếu có thay đổi status thì mới set k thì thôi */
            if (snapshot.val() !== null) {
                realtime
                    .ref('OrderStatus/' + uid)
                    .orderByChild('id_post')
                    .equalTo(idPost)
                    .once('value')
                    .then((snapshot) => {
                        setDataModal(snapshotToObject(snapshot));
                    });

                setTransactionInfor(snapshot.val());
                if (snapshot.val().id_roomchat === null) {
                    setTransactionInfor({ id_post: '', id_roomchat: '', id_shipper: '', id_shop: '', status: '' });
                }

                if (snapshot.val().id_shipper !== '') {
                    db.collection('ProfileShipper')
                        .doc(snapshot.val().id_shipper)
                        .get()
                        .then((doc) => {
                            if (doc.exists) {
                                setShipperInfor(doc.data());
                            } else {
                                console.log('Không fetch được dữ liệu !');
                            }
                        });
                } else {
                    setShipperInfor({
                        id_post: '',
                        id_roomchat: '',
                        id_shipper: '',
                        id_shop: '',
                    });
                }
            } else {
                setTransactionInfor({
                    id_post: '',
                    id_roomchat: '',
                    id_shipper: '',
                    id_shop: '',
                    status: '',
                });
                realtime
                    .ref('OrderStatus/' + uid)
                    .orderByChild('id_post')
                    .equalTo(idPost)
                    .once('value')
                    .then((snapshot) => {
                        setDataModal(snapshotToObject(snapshot));
                    });
            }
        });
        console.log("ta chạy xong rồi ")
    } catch (error) {
        console.log(error);
    }
}


// * Lấy key và value trong object lồng { id : { key: value}}
const snapshotToObject = (snapshot) => {
    let box = {};
    snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;
        box = item;
    });
    return box;
};






function DataShipper(props) {
    return (
        <div>

        </div>
    );
}

export default DataShipper;