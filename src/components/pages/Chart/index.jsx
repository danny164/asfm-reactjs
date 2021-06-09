import React, { useEffect, useState } from 'react';
import AbtractThree from '../../../assets/media/abstract-3.svg';
import Footer from '../../common/Footer';
import HeaderMobile from '../../common/HeaderMobile';
import { useAuth } from '../../../context/AuthContext';
import { realtime } from '../../../firebase';
import AsideLeft from '../AsideLeft';
import ChartCard from './component/Card';
import LineChart from './component/LineChart';
import VerticalChart from './component/VerticalChart';
import './styles.scss';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { changeFilter } from 'components/common/filterSlice';

var lastStatus = [];
function Chart(props) {
    const { currentUser } = useAuth();

    const [sortByRange, setSortByRange] = useState('1');

    let percent1 = 0;
    let percent2 = 0;
    let percent3 = 0;
    let percent4 = 0;

    let percentS1 = 0;
    let percentS2 = 0;
    let percentS3 = 0;
    let percentS4 = 0;
    let totalOrder = 1;

    const [data, setData] = useState([]);
    const [data3, setData3] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeFilter('all'));

        const fetchOrder = async () => {
            try {
                await realtime.ref('OrderStatus/' + currentUser.uid).on('value', (snapshot) => {
                    if (snapshot.val() !== null) {
                        setData(snapshotToArray(snapshot));
                        setData3(snapshotToArray(snapshot).filter((data) => data.status === '3'));
                    }
                });
            } catch (err) {
                console.log(err);
            }
        };
        fetchOrder();
    }, []);

    const snapshotToArray = (snapshot) => {
        const returnArr = [];
        snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });
        return returnArr;
    };

    const last24hrs = (sortByRange, dataTime) => {
        if (sortByRange === '7') {
            return dataTime >= moment().subtract(7, 'days').format('X');
        }
        if (sortByRange === '30') {
            return dataTime >= moment().subtract(1, 'month').format('X');
        }
        return dataTime >= moment().subtract(1, 'day').format('X');
    };

    const setPercent = (data) => {
        if (data === '0') {
            percent1 = percent1 + 1;
        }

        if (data === '1') {
            percent2 = percent2 + 1;
        }

        if (data === '2') {
            percent3 = percent3 + 1;
        }

        if (data === '3') {
            percent4 = percent4 + 1;
        }
    };

    if (data.length !== 0) {
        lastStatus = data.filter((data) => last24hrs(sortByRange, data.thoi_gian));
        lastStatus.map((data) => {
            setPercent(data.status);
        });
        totalOrder = lastStatus.length;
    }

    percentS1 = Math.round((percent1 / totalOrder) * 100);
    percentS2 = Math.round((percent2 / totalOrder) * 100);
    percentS3 = Math.round((percent3 / totalOrder) * 100);
    percentS4 = Math.round((percent4 / totalOrder) * 100);

    const cards = [
        {
            id: 1,
            title: 'Đơn đang xử lý',
            subTitle: 'đang xử lý',
            col: 'col-xl-3',
            total: percentS1.toString() + '%',
            percent: percentS1.toString() + '%',
            number: percent1,
            label: 'label-light-warning',
            processBarColor: 'bg-menu-progress',
            style: { backgroundPosition: 'right top', backgroundSize: '7rem 7rem', backgroundImage: `url(${AbtractThree})` },
        },
        {
            id: 2,
            title: 'Đơn đã nhận',
            subTitle: 'đã nhận',
            col: 'col-xl-3',
            total: percentS2.toString() + '%',
            percent: percentS2.toString() + '%',
            number: percent2,
            label: 'label-light-info',
            processBarColor: 'bg-menu-picked',
            style: { backgroundPosition: 'right top', backgroundSize: '7rem 7rem', backgroundImage: `url(${AbtractThree})` },
        },
        {
            id: 3,
            title: 'Đơn hoàn thành',
            subTitle: 'hoàn thành',
            col: 'col-xl-3',
            total: percentS3.toString() + '%',
            percent: percentS3.toString() + '%',
            number: percent3,
            label: 'label-light-success',
            processBarColor: 'bg-menu-completed',
            style: { backgroundPosition: 'right top', backgroundSize: '7rem 7rem', backgroundImage: `url(${AbtractThree})` },
        },
        {
            id: 4,
            title: 'Đơn bị hủy',
            subTitle: 'bị hủy',
            col: 'col-xl-3',
            total: percentS4.toString() + '%',
            percent: percentS4.toString() + '%',
            number: percent4,
            label: 'label-light-danger',
            processBarColor: 'bg-menu-canceled',
            style: { backgroundPosition: 'right top', backgroundSize: '7rem 7rem', backgroundImage: `url(${AbtractThree})` },
        },
    ];

    const handleSortByRange = (range) => {
        setSortByRange(range);
    };

    return (
        <div className="header-fixed sidebar-enabled bg">
            <div className="d-flex flex-row flex-column-fluid page">
                <AsideLeft />
                <main className="d-flex flex-column flex-row-fluid wrapper">
                    <HeaderMobile />

                    <section className="card-body d-flex flex-row justify-content-between align-items-center">
                        <div className="card-toolbar py-3 mb-3">
                            <ul className="nav nav-pills flex-row-reverse">
                                <li className="nav-item">
                                    <div
                                        className={`nav-link btn py-2 px-4 ${sortByRange === '30' ? 'active' : 'btn-outline-secondary'}`}
                                        onClick={() => handleSortByRange('30')}
                                    >
                                        <span className="nav-text">Tháng</span>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div
                                        className={`nav-link btn py-2 px-4 ${sortByRange === '7' ? 'active' : 'btn-outline-secondary'}`}
                                        onClick={() => handleSortByRange('7')}
                                    >
                                        <span className="nav-text">Tuần</span>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div
                                        className={`nav-link btn py-2 px-4 ${sortByRange === '1' ? 'active' : 'btn-outline-secondary'}`}
                                        onClick={() => handleSortByRange('1')}
                                    >
                                        <span className="nav-text">Ngày</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <div className="d-flex flex-column-fluid">
                        <div className="container-fluid">
                            <div className="row">
                                {cards.map((card) => (
                                    <div key={card.id} className={card.col}>
                                        <ChartCard
                                            title={card.title}
                                            subTitle={card.subTitle}
                                            number={card.number}
                                            total={card.total}
                                            percent={card.percent}
                                            labelCustom={card.label}
                                            processBarColor={card.processBarColor}
                                            style={card.style}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="row">
                                <div className="col-xl-6">
                                    <LineChart datas={data3} />
                                </div>
                                <div className="col-xl-6">
                                    <VerticalChart datas={data3} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer />
                </main>
            </div>
        </div>
    );
}

Chart.propTypes = {};

export default Chart;
