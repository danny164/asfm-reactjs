import moment from 'moment';
import { useSnackbar } from 'notistack';
import random from 'randomstring';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AsideLeft from '../../components/pages/AsideLeft';
import AsideRight from '../../components/pages/AsideRight';
import MainHomePage from '../../components/pages/MainHomePage';
import { useAuth } from '../../context/AuthContext';
import { db, realtime } from '../../firebase';
import { updateNotification } from './Slice/notificationSlice';

function HomePage() {
    const { currentUser } = useAuth();

    const [id] = useState(currentUser.uid);

    const { enqueueSnackbar } = useSnackbar();

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
        receiveLat: 0,
        receiveLng: 0,
        shipLat: 0,
        shipLng: 0,
    });

    const dispatch = useDispatch();

    //fetch user infor
    useEffect(() => {
        async function fetchUserInfor() {
            try {
                await db
                    .collection('ShopProfile')
                    .doc(id)
                    .onSnapshot((doc) => {
                        if (doc.exists) {
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
    const last24hrs = (dataTime, time) => {
        if (time === 3) {
            return dataTime < moment().subtract(3, 'days').format('X');
        }
        return dataTime < moment().subtract(1, 'day').format('X');
    };

    const in24hrs = (dataTime) => {
        return dataTime > moment().subtract(1, 'day').format('X');
    };

    useEffect(() => {
        async function fetchOrder() {
            try {
                //Lọc những đơn đã đăng nhưng quá 1 ngày chưa ai chọn thì update lại thành hủy
                await realtime.ref('OrderStatus/' + id).once('value', (snapshot) => {
                    if (snapshot.val() !== null) {
                        const renderOldStatus = Object.values(snapshot.val()).filter(
                            (data) => data.status === '0' && last24hrs(data.thoi_gian, 1)
                        );

                        renderOldStatus.map((data) => {
                            handleDeleteOrder(
                                data.id_post,
                                'Đơn hàng trong 24 giờ tự động hủy vì không có shipper nhận !'
                            );
                        });

                        const renderStatus = Object.values(snapshot.val()).filter(
                            (data) => data.status !== '0' || (data.status === '0' && in24hrs(data.thoi_gian))
                        );
                    }
                });

                //Đọc các đơn lên để hiển thị
                await realtime.ref('OrderStatus/' + id).on('value', (snapshot) => {
                    if (snapshot.val() !== null) {
                        setData(snapshot.val());
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
        fetchOrder();
    }, []);

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                await realtime.ref('Notification/' + currentUser.uid).on('value', (snapshot) => {
                    if (snapshot.val() !== null) {
                        let oldNoti = Object.values(snapshot.val()).filter(
                            (data) => data.status === '0' && last24hrs(data.thoi_gian, 3)
                        );

                        // TODO: LỖi
                        // if (oldNoti.length !== 0) {
                        //     oldNoti.map((data) => {
                        //         realtime
                        //             .ref('Notification/' + currentUser.uid)
                        //             .orderByChild('id_post')
                        //             .equalTo(data.id_post)
                        //             .remove();
                        //     });
                        // }

                        const action = updateNotification(snapshot.val());
                        dispatch(action);
                    }
                });
            } catch (err) {
                console.log(err);
            }
        };
        fetchNotification();
    }, []);

    const idChat =
        moment().format('YYYYMMDD-HHmmssSSS') +
        random.generate({
            length: 3,
            charset: 'numeric',
        });

    // Hủy đơn
    async function handleDeleteOrder(id, reason) {
        try {
            realtime
                .ref('Notification/' + currentUser.uid)
                .push()
                .set({
                    id_post: id,
                    id_shop: currentUser.uid,
                    id_shipper: '',
                    status: '3',
                    thoi_gian: moment().format('X'),
                });

            realtime.ref('newsfeed/' + id).remove();
            await realtime.ref('Transaction/' + id).remove();
            // await realtime.ref('OrderStatus/' + currentUser.uid + '/' + id).remove();
            await realtime
                .ref('OrderStatus/' + currentUser.uid + '/' + id)
                .update({ status: '3', reason: reason, read: 0 });
            enqueueSnackbar(`Đơn #${id} đã bị hủy`, { variant: 'success' });
        } catch (e) {
            enqueueSnackbar(`Có lỗi xảy ra !`, { variant: 'error' });
        }
    }

    return (
        <>
            <div className="header-fixed sidebar-enabled bg">
                <div className="d-flex flex-row flex-column-fluid page">
                    <AsideLeft />
                    <MainHomePage datas={data} shopInfo={input} idShop={currentUser.uid} />
                    <AsideRight name={input.fullname} />
                </div>
            </div>
        </>
    );
}

export default HomePage;
