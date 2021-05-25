import { useAuth } from 'context/AuthContext';
import React from 'react';
import { useSnackbar } from 'notistack';
import { realtime } from '../../../firebase';
import moment from 'moment';
import random from 'randomstring';

function RePostOrder(props) {
    return <div></div>;
}

export default RePostOrder;

export const RePostOrderr = async (dataPostOrder, uid, enqueueSnackbar) => {
    const idChat =
        moment().format('YYYYMMDD-HHmmssSSS') +
        random.generate({
            length: 3,
            charset: 'numeric',
        });

    if (localStorage.getItem('role') === '2') {
        enqueueSnackbar('Tài khoản của bạn tạm thời không được phép đăng đơn !', { variant: 'warning' });
        return 0;
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
            id_shop: uid,
            status: '',
        });

        //tạo bảng transaction
        realtime.ref('Transaction/' + dataPostOrder.id_post).set({
            id_post: dataPostOrder.id_post,
            id_shop: uid,
            id_shipper: '',
            id_roomchat: idChat,
            status: '0',
            ma_bi_mat: dataPostOrder.ma_bi_mat,
            thoi_gian: moment().format('X'),
            receiveLng: dataPostOrder.receiveLng,
            receiveLat: dataPostOrder.receiveLat,
            shipLng: dataPostOrder.shipLng,
            shipLat: dataPostOrder.shipLat,
            time_estimate: dataPostOrder.time_estimate,
        });

        //tạo bảng thông báo
        realtime
            .ref('Notification/' + uid)
            .push()
            .set({
                id_post: dataPostOrder.id_post,
                id_shop: uid,
                id_shipper: '',
                status: '0',
                thoi_gian: moment().format('X'),
            });

        //tạo bảng orderstatus
        await realtime.ref('OrderStatus/' + uid + '/' + dataPostOrder.id_post).update({
            status: '0',
            thoi_gian: moment().format('X'),
        });

        enqueueSnackbar(`Đơn #${dataPostOrder.id_post} đã được đăng lại`, { variant: 'success' });
    } catch (error) {
        console.log(error);
    }
};
