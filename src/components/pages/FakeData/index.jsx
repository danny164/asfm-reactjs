import googleMapsApi from 'api/googleMapsApi';
import { useAuth } from 'context/AuthContext';
import moment from 'moment';
import random from 'randomstring';
import React from 'react';
import { Link } from 'react-router-dom';
import { realtime } from '../../../firebase';
import { name, noi_giao, noi_nhan, phi_giao, phi_ung, phone } from './data';
import { useSnackbar } from 'notistack';

FakeData.propTypes = {};

const randomNumber = (number) => {
    return random.generate({
        length: 4,
        charset: 'numeric',
    });
};

const randomIdPost = () => {
    return (
        moment().format('YYYYMMDD-HHmmssSSS') +
        random.generate({
            length: 3,
            charset: 'numeric',
        })
    );
};

const randomIdChat = () => {
    return (
        moment().format('YYYYMMDD-HHmmssSSS') +
        random.generate({
            length: 3,
            charset: 'numeric',
        })
    );
};

function FakeData(props) {
    const { currentUser } = useAuth();

    const { enqueueSnackbar } = useSnackbar();

    async function PostOrder() {
        const dataPostOrder = {
            idPost: randomIdPost(),
            noi_nhan: noi_nhan[Math.floor(Math.random() * 69)],
            noi_giao: noi_giao[Math.floor(Math.random() * 45)],
            ghi_chu: 'Dữ liệu được Fake ngẫu nhiên !',
            thoi_gian: moment().format('X'),
            phone: phone[Math.floor(Math.random() * 30)],
            ten_nguoi_gui: name[Math.floor(Math.random() * 50)],
            ten_nguoi_nhan: name[Math.floor(Math.random() * 50)],
            phi_giao: phi_giao[Math.floor(Math.random() * 30)],
            phi_ung: phi_ung[Math.floor(Math.random() * 30)],
            id_roomchat: randomIdChat(),
            ma_bi_mat: random.generate({
                length: 4,
                charset: 'numeric',
            }),
        };

        let lngLatList = await googleMapsApi.getAll(dataPostOrder.noi_nhan, dataPostOrder.noi_giao);

        try {
            //tao bảng newsfeed
            realtime.ref('newsfeed/' + dataPostOrder.idPost).set({
                id_post: dataPostOrder.idPost,
                noi_giao: dataPostOrder.noi_giao,
                noi_nhan: dataPostOrder.noi_nhan,
                ghi_chu: dataPostOrder.ghi_chu,
                km: lngLatList.data.routes[0].legs[0].distance.text,
                thoi_gian: dataPostOrder.thoi_gian,
                sdt_nguoi_nhan: dataPostOrder.phone,
                ten_nguoi_nhan: dataPostOrder.ten_nguoi_nhan,
                sdt_nguoi_gui: dataPostOrder.phone,
                ten_nguoi_gui: dataPostOrder.ten_nguoi_gui,
                phi_giao: dataPostOrder.phi_giao,
                phi_ung: dataPostOrder.phi_ung,
                id_shop: currentUser.uid,
                status: '',
                receiveLng: `${lngLatList.data.routes[0].legs[0].start_location.lng}`,
                receiveLat: `${lngLatList.data.routes[0].legs[0].start_location.lat}`,
                shipLng: `${lngLatList.data.routes[0].legs[0].end_location.lng}`,
                shipLat: `${lngLatList.data.routes[0].legs[0].end_location.lat}`,
                time_estimate: `${lngLatList.data.routes[0].legs[0].duration.value}`,
            });

            //tạo bảng transaction
            realtime.ref('Transaction/' + dataPostOrder.idPost).set({
                id_post: dataPostOrder.idPost,
                id_shop: currentUser.uid,
                id_shipper: '',
                id_roomchat: dataPostOrder.id_roomchat,
                status: '0',
                ma_bi_mat: dataPostOrder.ma_bi_mat,
                thoi_gian: dataPostOrder.thoi_gian,
            });

            //tạo bảng thông báo
            realtime
                .ref('Notification/' + currentUser.uid)
                .push()
                .set({
                    id_post: dataPostOrder.idPost,
                    id_shop: currentUser.uid,
                    id_shipper: '',
                    status: '0',
                    thoi_gian: dataPostOrder.thoi_gian,
                });

            //tạo bảng orderstatus
            await realtime.ref('OrderStatus/' + currentUser.uid + '/' + dataPostOrder.idPost).set({
                id_post: dataPostOrder.idPost,
                id_shop: currentUser.uid,
                status: '0',
                picked_time: '',
                completed_time: '',
                noi_giao: dataPostOrder.noi_giao,
                noi_nhan: dataPostOrder.noi_nhan,
                ghi_chu: dataPostOrder.ghi_chu,
                km: lngLatList.data.routes[0].legs[0].distance.text,
                thoi_gian: dataPostOrder.thoi_gian,
                sdt_nguoi_nhan: dataPostOrder.phone,
                ten_nguoi_nhan: dataPostOrder.ten_nguoi_nhan,
                sdt_nguoi_gui: dataPostOrder.phone,
                ten_nguoi_gui: dataPostOrder.ten_nguoi_gui,
                phi_giao: dataPostOrder.phi_giao,
                phi_ung: dataPostOrder.phi_ung,
                ma_bi_mat: dataPostOrder.ma_bi_mat,
                receiveLng: lngLatList.data.routes[0].legs[0].start_location.lng,
                receiveLat: lngLatList.data.routes[0].legs[0].start_location.lat,
                shipLng: lngLatList.data.routes[0].legs[0].end_location.lng,
                shipLat: lngLatList.data.routes[0].legs[0].end_location.lat,
                time_estimate: lngLatList.data.routes[0].legs[0].duration.value,
                read: 0,
            });
        } catch (error) {
            console.log(error);
        }
    }

    const fakeData = async () => {
        enqueueSnackbar('Bắt đầu tiền trình tạo đơn', { variant: 'info' });

        const interval = setInterval(() => {
            PostOrder();
        }, 2000);

        const timer = setTimeout(() => {
            clearInterval(interval);
            enqueueSnackbar('Tiến trình hoàn tất', { variant: 'success' });
        }, 11000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    };

    return (
        <li className="nav-item mb-2">
            <span className="nav-link btn btn-icon btn-lg btn-borderless" onClick={fakeData}>
                <i className="fad fa-robot"></i>
            </span>
        </li>
    );
}

export default FakeData;
