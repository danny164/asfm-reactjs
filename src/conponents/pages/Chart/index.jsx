import React, { useEffect, useState } from 'react';
import AbtractThree from '../../../assets/media/abstract-3.svg';
import Footer from '../../common/Footer';
import HeaderMobile from '../../common/HeaderMobile';
import { useAuth } from '../../../context/AuthContext';
import { realtime } from '../../../firebase';
import AsideLeft from '../AsideLeft';
import ChartCard from './component/Card';
import LineChart from './component/LineChart';
import RadialChart from './component/RadialChart';
import './styles.scss';

function Chart(props) {
    const { currentUser } = useAuth();

    let percent1 = 0;
    let percent2 = 0;
    let percent3 = 0;
    let percent4 = 0;

    let percentS1 = 0;
    let percentS2 = 0;
    let percentS3 = 0;
    let percentS4 = 0;
    let totalOrder = 0;

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                await realtime.ref('OrderStatus/' + currentUser.uid).on('value', (snapshot) => {
                    if (snapshot !== null) {
                        setData(snapshotToArray(snapshot));
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

    if (data !== []) {
        data.map((data) => {
            setPercent(data.status);
        });
        totalOrder = data.length;
    }

    percentS1 = Math.round((percent1 / totalOrder) * 100);
    percentS2 = Math.round((percent2 / totalOrder) * 100);
    percentS3 = Math.round((percent3 / totalOrder) * 100);
    percentS4 = 100 - (percentS1 + percentS2 + percentS3);

    const cards = [
        {
            id: 1,
            title: 'Đơn đang xử lý',
            subTitle: 'đang xử lý',
            col: 'col-xl-3',
            total: percentS1.toString() + '%',
            percent: percentS1.toString() + '%',
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
            processBarColor: 'bg-menu-canceled',
            style: { backgroundPosition: 'right top', backgroundSize: '7rem 7rem', backgroundImage: `url(${AbtractThree})` },
        },
    ];

    return (
        <div className="header-fixed sidebar-enabled bg">
            <div className="d-flex flex-row flex-column-fluid page">
                <AsideLeft />
                <main className="d-flex flex-column flex-row-fluid wrapper">
                    <HeaderMobile />

                    <section className="card-body">
                        <div className="py-3 mb-3">
                            <span className="label label-xl label-inprogress label-inline mr-3 py-4 flex-shrink-0 cursor-pointer">Chart 1</span>
                            <span className="label label-xl label-picked label-inline mr-3 py-4 flex-shrink-0 cursor-pointer">Chart 2</span>
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
                                            total={card.total}
                                            percent={card.percent}
                                            processBarColor={card.processBarColor}
                                            style={card.style}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="row">
                                <div className="col-xl-6">
                                    <RadialChart />
                                </div>
                                <div className="col-xl-6">
                                    <LineChart />
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
