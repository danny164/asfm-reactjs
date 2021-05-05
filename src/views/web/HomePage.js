import moment from 'moment';
import React, { useEffect, useState } from 'react';
import AsideLeft from '../../conponents/pages/AsideLeft';
import AsideRight from '../../conponents/pages/AsideRight';
import MainHomePage from '../../conponents/pages/MainHomePage';
import { useAuth } from '../../context/AuthContext';
import { db, realtime } from '../../firebase';
import random from 'randomstring';

function HomePage() {
    const { currentUser } = useAuth();
    const now = moment().format('X');

    const [id] = useState(currentUser.uid);
    const [input, setInput] = useState({
        fullname: '',
        phone: '',
        address: '',
    });


    const [data, setData] = useState({
        id_post: '',
        id_shop: '',
        km: '',
        noi_giao: '',
        thoi_gian: '',
        phi_giao: '',
        phi_ung: '',
        status: '',
        ghi_chu: '',
    });

    const [notification, setNotification] = useState();

    //fetch user infor
    useEffect(() => {
        async function fetchUserInfor() {
            try {
                await db
                    .collection('ShopProfile')
                    .doc(id)
                    .onSnapshot((doc) => {
                        if (doc.exists) {
                            // localStorage.setItem('fullname', doc.data().fullname);
                            // localStorage.setItem('email', currentUser.email);
                            if (doc.data().role === '0') {
                                localStorage.setItem('role', doc.data().role);
                                window.location.reload();
                            } else {
                                localStorage.setItem('role', doc.data().role);
                                setInput(doc.data());
                            }
                        } else {
                            console.log('No such document!');
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserInfor();
    }, []);

    //fetch data post order
    useEffect(() => {
        async function fetchOrder() {
            try {
                await realtime.ref('OrderStatus/' + id).on('value', (snapshot) => {
                    if (snapshot !== null) {
                        setData(snapshot.val());
                        // console.log(snapshot.val());
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
        fetchOrder();
    }, []);

    //fetch notification  .orderByKey("thoi_gian").startAt(moment()
    // .subtract(1, 'day').format('X'))
    useEffect(() => {
        const fetchNotification = async () => {
            try {
                await realtime.ref('Notification/' + currentUser.uid).on('value', (snapshot) => {
                    if (snapshot !== null) {
                        setNotification(snapshot.val());
                        console.log(snapshot.val());
                    }
                });
            } catch (err) {
                console.log(err);
            }
        };

        async function updateNotification() {
            try {
                await realtime
                    .ref('Transaction/')
                    .orderByChild('id_shop')
                    .equalTo(id)
                    .on('child_changed', (snapshot) => {
                        if (snapshot !== null) {
                            pushNotification(snapshot.val());
                            console.log(snapshot.val());
                        }
                    });
            } catch (err) {
                console.log(err)
            }
        }

        updateNotification()
        fetchNotification();
    }, [])

    //hàm cập nhật những thay đổi về trạng thái đơn cho thông báo

    //hàm insert những thông báo mới vào bảng Notification.
    async function pushNotification(notify) {
        const notification = {
            id_post: notify.id_post,
            id_shop: currentUser.uid,
            id_shipper: notify.id_shipper,
            status: notify.status,
            thoi_gian: now,
        };

        const idNotify =
            moment().format('YYYYMMDD-HHmmssSSS') +
            random.generate({
                length: 3,
                charset: 'numeric',
            });

        try {
            await realtime.ref('Notification/' + currentUser.uid + '/' + idNotify).set(notification);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleDeleteOrder(id) {
        try {
            await realtime.ref('newsfeed/' + id).remove();
            await realtime.ref('Transaction/' + id).remove();
            await realtime.ref('OrderStatus/' + currentUser.uid + '/' + id).remove();
        } catch (e) {
            console.log(e);
        }
    }

    console.log(notification)

    return (
        <div className="header-fixed sidebar-enabled bg">
            <div className="d-flex flex-row flex-column-fluid page">
                <AsideLeft />
                <MainHomePage datas={data} DeleteOrder={handleDeleteOrder} shopInfo={input} idShop={currentUser.uid} />
                <AsideRight name={input.fullname} Notification={notification} />
            </div>
        </div>
    );
}

export default HomePage;
