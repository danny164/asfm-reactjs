import React from 'react';
import AbtractThree from '../../../assets/media/abstract-3.svg';
import Footer from '../../../conponents/common/Footer';
import HeaderMobile from '../../../conponents/common/HeaderMobile';
import AsideLeft from '../AsideLeft';
import ChartCard from './component/Card';
import LineChart from './component/LineChart';
import RadialChart from './component/RadialChart';
import './styles.scss';

function Chart(props) {
    const cards = [
        {
            id: 1,
            title: 'Đơn đang xử lý',
            subTitle: 'đang xử lý',
            col: 'col-xl-3',
            total: '17%',
            percent: '17%',
            processBarColor: 'bg-menu-progress',
            style: { backgroundPosition: 'right top', backgroundSize: '7rem 7rem', backgroundImage: `url(${AbtractThree})` },
        },
        {
            id: 2,
            title: 'Đơn đã nhận',
            subTitle: 'đã nhận',
            col: 'col-xl-3',
            total: '25%',
            percent: '25%',
            processBarColor: 'bg-menu-picked',
            style: { backgroundPosition: 'right top', backgroundSize: '7rem 7rem', backgroundImage: `url(${AbtractThree})` },
        },
        {
            id: 3,
            title: 'Đơn hoàn thành',
            subTitle: 'hoàn thành',
            col: 'col-xl-3',
            total: '35%',
            percent: '35%',
            processBarColor: 'bg-menu-completed',
            style: { backgroundPosition: 'right top', backgroundSize: '7rem 7rem', backgroundImage: `url(${AbtractThree})` },
        },
        {
            id: 4,
            title: 'Đơn bị hủy',
            subTitle: 'bị hủy',
            col: 'col-xl-3',
            total: '23%',
            percent: '23%',
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
