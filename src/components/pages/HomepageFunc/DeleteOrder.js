import { realtime } from '../../../firebase';
import React from 'react';
import moment from 'moment';

export async function handleDeleteOrder(id, reason, uid, enqueueSnackbar) {
    try {
        realtime
            .ref('Notification/' + uid)
            .push()
            .set({
                id_post: id,
                id_shop: uid,
                id_shipper: '',
                status: '3',
                thoi_gian: moment().format('X'),
            });

        realtime.ref('newsfeed/' + id).remove();
        await realtime.ref('Transaction/' + id).remove();
        // await realtime.ref('OrderStatus/' + uid + '/' + id).remove();
        await realtime.ref('OrderStatus/' + uid + '/' + id).update({ status: '3', reason: reason });
        enqueueSnackbar(`Đơn #${id} đã bị hủy`, { variant: 'success' });
    } catch (e) {
        enqueueSnackbar(`Có lỗi xảy ra !`, { variant: 'error' });
    }
}






function DeleteOrder(props) {
    return (
        <div>

        </div>
    );
}

export default DeleteOrder;