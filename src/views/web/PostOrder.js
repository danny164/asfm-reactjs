import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import googleMapsApi from '../../api/googleMapsApi';
import AsideLeft from '../../conponents/pages/AsideLeft';
import AsideRight from '../../conponents/pages/AsideRight';
import MainPostOrder from '../../conponents/pages/MainPostOrder';
import { useAuth } from '../../context/AuthContext';
import { db, realtime } from '../../firebase';

function PostOrder(props) {
    const { currentUser } = useAuth();
    const history = useHistory();
    const [defaultAddressError, setDefaultAddressError] = useState();

    let tamung = '0';
    let address = '';

    const [userInfor, setUserInfor] = useState({
        fullname: '',
        phone: '',
        address: '',
        district: '',
        ward: '',
        detailAddress: '',
    });

    const fetchLngLat = async (startPoint, endPoint, dataPostOrder) => {
        let lngLatList = await googleMapsApi.getAll(startPoint, endPoint);

        try {
            //tao bảng newsfeed
            await realtime.ref('newsfeed/' + dataPostOrder.idPost).set({
                id_post: dataPostOrder.idPost,
                noi_giao: dataPostOrder.noi_giao,
                noi_nhan: address,
                ghi_chu: dataPostOrder.ghi_chu,
                km: lngLatList.data.routes[0].legs[0].distance.text,
                thoi_gian: dataPostOrder.thoi_gian,
                sdt_nguoi_nhan: dataPostOrder.sdt_nguoi_nhan,
                ten_nguoi_nhan: dataPostOrder.ten_nguoi_nhan,
                sdt_nguoi_gui: userInfor.phone,
                ten_nguoi_gui: userInfor.fullname,
                phi_giao: dataPostOrder.phi_giao,
                phi_ung: tamung,
                id_shop: currentUser.uid,
                status: '',
                receiveLng: lngLatList.data.routes[0].legs[0].start_location.lng,
                receiveLat: lngLatList.data.routes[0].legs[0].start_location.lat,
                shipLng: lngLatList.data.routes[0].legs[0].end_location.lng,
                shipLat: lngLatList.data.routes[0].legs[0].end_location.lat,
            });

            //tạo bảng orderstatus
            await realtime.ref('OrderStatus/' + currentUser.uid + '/' + dataPostOrder.idPost).set({
                id_post: dataPostOrder.idPost,
                id_shop: currentUser.uid,
                status: '0',
                noi_giao: dataPostOrder.noi_giao,
                noi_nhan: address,
                ghi_chu: dataPostOrder.ghi_chu,
                km: lngLatList.data.routes[0].legs[0].distance.text,
                thoi_gian: dataPostOrder.thoi_gian,
                sdt_nguoi_nhan: dataPostOrder.sdt_nguoi_nhan,
                ten_nguoi_nhan: dataPostOrder.ten_nguoi_nhan,
                sdt_nguoi_gui: userInfor.phone,
                ten_nguoi_gui: userInfor.fullname,
                phi_giao: dataPostOrder.phi_giao,
                phi_ung: tamung,
                ma_bi_mat: dataPostOrder.ma_bi_mat,
            });

            //tạo bảng transaction
            await realtime.ref('Transaction/' + dataPostOrder.idPost).set({
                id_post: dataPostOrder.idPost,
                id_shop: currentUser.uid,
                id_shipper: '',
                id_roomchat: dataPostOrder.id_roomchat,
                status: '0',
                ma_bi_mat: dataPostOrder.ma_bi_mat,
                thoi_gian: dataPostOrder.thoi_gian,
            });

            //tạo bảng thông báo
            await realtime
                .ref('Notification/' + currentUser.uid)
                .push()
                .set({
                    id_post: dataPostOrder.idPost,
                    id_shop: currentUser.uid,
                    id_shipper: '',
                    status: '0',
                    thoi_gian: dataPostOrder.thoi_gian,
                });

            //tạo bảng chatroom
            history.push('/home');
        } catch (error) {
            console.log(error);
        }
    };

    //post order function
    async function PostOrder(dataPostOrder, newAddress) {
        if (localStorage.getItem('role') === '2') {
            return alert('tài khoản của bạn tạm thời không được phép đăng đơn !');
        } else {
            if (newAddress.district !== '') {
                address = newAddress.address + ', ' + newAddress.ward + ', ' + newAddress.district + ', Thành phố Đà Nẵng';
            } else {
                if (userInfor.district === '' || userInfor.ward === '' || userInfor.detailAddress === '') {
                    setDefaultAddressError('Bạn chưa có địa chỉ mặc định, vui lòng chỉnh sửa thông tin cá nhân !');
                    return;
                }
                address = userInfor.address;
            }

            if (dataPostOrder.phi_ung !== '') {
                tamung = dataPostOrder.phi_ung;
            }

            fetchLngLat(address, dataPostOrder.noi_giao, dataPostOrder);
        }
    }

    useEffect(() => {
        async function fetchUserInfor() {
            try {
                await db
                    .collection('ShopProfile')
                    .doc(currentUser.uid)
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            setUserInfor(doc.data());
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

    return (
        <div className="header-fixed sidebar-enabled bg">
            <section className="d-flex flex-row flex-column-fluid page">
                <AsideLeft />
                <MainPostOrder postOrder={PostOrder} defaultAddressError={defaultAddressError} />
                <AsideRight name={userInfor.fullname} />
            </section>
        </div>
    );
}

export default PostOrder;
