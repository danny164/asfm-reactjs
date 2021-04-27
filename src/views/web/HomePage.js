import moment from 'moment';
import React, { useEffect, useState } from 'react';
import AsideLeft from '../../conponents/pages/AsideLeft';
import AsideRight from '../../conponents/pages/AsideRight';
import MainHomePage from '../../conponents/pages/MainHomePage';
import { useAuth } from '../../context/AuthContext';
import { db, realtime } from '../../firebase';

function HomePage() {
    const { currentUser } = useAuth();

    const [id] = useState(currentUser.uid);
    const [input, setInput] = useState({
        fullname: '',
        phone: '',
        address: '',
    });

    const [data, setData] = useState([]);

    const [notification, setNotification] = useState({
        id_post: '',
        id_roomchat: '',
        id_shipper: '',
        id_shop: '',
        status: '',
    });

    // ! delay loading chờ lấy thông tin
    const [loading, setLoading] = useState(false);

    const [filteredStatus, setFilteredStatus] = useState('all');
    const [titleStatus, setTitleStatus] = useState('gần đây');

    const [sortByRange, setSortByRange] = useState('1');
    const [subTitleStatus, setSubTitleStatus] = useState('trong ngày');

    /////////////////////////////////////////////////////////
    // ! Lọc theo sự kiện click trên header
    const handleFilterStatus = (status) => {
        setFilteredStatus(status);
    };

    useEffect(() => {
        filteredStatus === 'all' && setTitleStatus('gần đây');
        filteredStatus === '0' && setTitleStatus('đang xử lý');
        filteredStatus === '1' && setTitleStatus('đã nhận');
        filteredStatus === '2' && setTitleStatus('hoàn thành');
        filteredStatus === '3' && setTitleStatus('bị hủy');
    }, [filteredStatus]);

    // * Lọc theo phạm vi, trả về kết quả theo ngày, tháng, tuần cho lastStatus []
    const last24hrs = (sortByRange, dataTime) => {
        if (sortByRange === '7') {
            return dataTime >= moment().subtract(7, 'days').format('X');
        }
        if (sortByRange === '30') return dataTime >= moment().subtract(1, 'month').format('X');
        return dataTime >= moment().subtract(1, 'day').format('X');
    };

    // * Khi Sort by Range thay đổi, thì Title cũng cần update theo
    useEffect(() => {
        if (sortByRange === '1') setSubTitleStatus('trong ngày');
        if (sortByRange === '7') setSubTitleStatus('trong tuần');
        if (sortByRange === '30') setSubTitleStatus('trong tháng');
    }, [sortByRange]);

    // * Nhận loại sort từ sự kiện click
    const handleSortByRange = (range) => {
        setSortByRange(range);
    };
    //fetch user infor
    useEffect(() => {
        async function fetchUserInfor() {
            try {
                await db
                    .collection('ShopProfile')
                    .doc(id)
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            localStorage.setItem('fullname', doc.data().fullname);
                            setInput(doc.data());
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
        setLoading(true);
        async function fetchOrder() {
            try {
                await realtime.ref('OrderStatus/' + id).on('value', (snapshot) => {
                    if (snapshot.val() !== null) {
                        const renderStatus = Object.values(snapshot.val()).filter(
                            (data) => filteredStatus === 'all' || filteredStatus === data.status
                        );
                        const lastStatus = Object.values(renderStatus).filter((data) => last24hrs(sortByRange, data.thoi_gian));
                        const sortStatus = lastStatus.sort((a, b) => (a.thoi_gian < b.thoi_gian ? 1 : -1));

                        setData(sortStatus);
                        console.log(filteredStatus, sortByRange);
                        console.log('render status');
                        console.log(renderStatus);
                        console.log('last status');
                        console.log(lastStatus);
                        console.log('sort status');
                        console.log(sortStatus);
                    } else {
                        setData([]);
                    }
                });

                realtime
                    .ref('Transaction/')
                    .orderByChild('id_shop')
                    .equalTo(id)
                    .once('value')
                    .then((snapshot) => {
                        setNotification(snapshot.val());
                        console.log(snapshot.val());
                    });
            } catch (error) {
                console.log(error);
            }
        }

        const timer = setTimeout(() => {
            fetchOrder();
            console.log('data');
            console.log(data);
            setLoading(false);
        }, 2000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    async function handleDeleteOrder(id) {
        try {
            await realtime.ref('newsfeed/' + id).remove();
            await realtime.ref('Transaction/' + id).remove();
            await realtime.ref('OrderStatus/' + currentUser.uid + '/' + id).remove();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="header-fixed sidebar-enabled bg">
            <div className="d-flex flex-row flex-column-fluid page">
                <AsideLeft />
                <MainHomePage
                    data={data}
                    loading={loading}
                    onFilteredStatus={handleFilterStatus}
                    onSortByRange={handleSortByRange}
                    titleStatus={titleStatus}
                    subTitleStatus={subTitleStatus}
                    deleteOrder={handleDeleteOrder}
                    shopInfo={input}
                    idShop={currentUser.uid}
                    notification={notification}
                    filteredStatus={filteredStatus}
                    sortByRange={sortByRange}
                />
                <AsideRight name={input.fullname} />
            </div>
        </div>
    );
}

export default HomePage;
