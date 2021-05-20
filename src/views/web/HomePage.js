import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AsideLeft from '../../conponents/pages/AsideLeft';
import AsideRight from '../../conponents/pages/AsideRight';
import MainHomePage from '../../conponents/pages/MainHomePage';
import { useAuth } from '../../context/AuthContext';
import { db, realtime } from '../../firebase';
import { updateNotification } from './Slice/notificationSlice';
import random from 'randomstring';

function HomePage() {
    const { currentUser } = useAuth();

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
    const last24hrs = (dataTime) => {
        return dataTime < moment().subtract(1, 'day').format('X');
    };

    useEffect(() => {
        async function fetchOrder() {
            try {
                //Lọc những đơn đã đăng nhưng quá 1 ngày chưa ai chọn thì update lại thành hủy
                await realtime.ref('OrderStatus/' + id).once('value', (snapshot) => {
                    if (snapshot !== null) {
                        const renderStatus = Object.values(snapshot.val()).filter(
                            (data) => (data.status === '0') && last24hrs(data.thoi_gian)
                        );

                        renderStatus.map((data) => {
                            handleDeleteOrder(data.id_post, "Đơn hàng bị hủy vì trong 24 giờ chưa có shipper nhận !")
                        })
                    }
                });

                //Đọc các đơn lên để hiển thị
                await realtime.ref('OrderStatus/' + id).on('value', (snapshot) => {
                    if (snapshot !== null) {
                        setData(snapshot.val())
                    }
                })
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
                    if (snapshot !== null) {
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

    const rePostOrder = async (dataPostOrder) => {
        if (localStorage.getItem('role') === '2') {
            return alert('tài khoản của bạn tạm thời không được phép đăng đơn !');
        }

        try {
            //tao bảng newsfeed
            realtime.ref('newsfeed/' + dataPostOrder.id_post).set({
                id_post: dataPostOrder.id_post,
                noi_giao: dataPostOrder.noi_giao,
                noi_nhan: dataPostOrder.noi_nhan,
                ghi_chu: dataPostOrder.ghi_chu,
                km: dataPostOrder.km,
                thoi_gian: dataPostOrder.thoi_gian,
                sdt_nguoi_nhan: dataPostOrder.sdt_nguoi_nhan,
                ten_nguoi_nhan: dataPostOrder.ten_nguoi_nhan,
                sdt_nguoi_gui: dataPostOrder.sdt_nguoi_gui,
                ten_nguoi_gui: dataPostOrder.ten_nguoi_gui,
                phi_giao: dataPostOrder.phi_giao,
                phi_ung: dataPostOrder.phi_ung,
                id_shop: currentUser.uid,
                status: '',
            });

            //tạo bảng transaction
            realtime.ref('Transaction/' + dataPostOrder.id_post).set({
                id_post: dataPostOrder.id_post,
                id_shop: currentUser.uid,
                id_shipper: '',
                id_roomchat: idChat,
                status: '0',
                ma_bi_mat: dataPostOrder.ma_bi_mat,
                thoi_gian: moment().format("X"),
                receiveLng: dataPostOrder.receiveLng,
                receiveLat: dataPostOrder.receiveLat,
                shipLng: dataPostOrder.shipLng,
                shipLat: dataPostOrder.shipLat,
                time_estimate: dataPostOrder.time_estimate
            });

            //tạo bảng thông báo
            realtime
                .ref('Notification/' + currentUser.uid)
                .push()
                .set({
                    id_post: dataPostOrder.id_post,
                    id_shop: currentUser.uid,
                    id_shipper: '',
                    status: '0',
                    thoi_gian: moment().format("X"),
                });

            //tạo bảng orderstatus
            await realtime.ref('OrderStatus/' + currentUser.uid + '/' + dataPostOrder.id_post).update({
                status: '0',
                thoi_gian: moment().format("X")
            })

        } catch (error) {
            console.log(error);
        }
    }

    //Hủy đơn 
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
                })

            realtime.ref('newsfeed/' + id).remove();
            await realtime.ref('Transaction/' + id).remove();
            // await realtime.ref('OrderStatus/' + currentUser.uid + '/' + id).remove();
            await realtime.ref('OrderStatus/' + currentUser.uid + '/' + id).update({ status: "3", reason: reason });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className="header-fixed sidebar-enabled bg">
                <div className="d-flex flex-row flex-column-fluid page">
                    <AsideLeft />
                    <MainHomePage datas={data} deleteOrder={handleDeleteOrder} shopInfo={input} idShop={currentUser.uid} rePostOrder={rePostOrder} />
                    <AsideRight name={input.fullname} />
                </div>
            </div>
        </>
    );
}

export default HomePage;
