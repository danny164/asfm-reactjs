import React from 'react';
import AbtractThree from '../../../assets/media/abstract-3.svg';
import Footer from '../../../conponents/common/Footer';
import HeaderMobile from '../../../conponents/common/HeaderMobile';
import AsideLeft from '../AsideLeft';
import ChartCard from './component/Card';
import LineChart from './component/LineChart';
import VerticalChart from './component/VerticalChart';
import './styles.scss';

function Chart(props) {
    const cards = [
        {
            id: 1,
            title: 'Đơn đang xử lý',
            subTitle: 'đang xử lý',
            col: 'col-xl-3',
            number: 15,
            total: '17%',
            percent: '17%',
            label: 'label-light-warning',
            processBarColor: 'bg-menu-progress',
            style: { backgroundPosition: 'right top', backgroundSize: '7rem 7rem', backgroundImage: `url(${AbtractThree})` },
        },
        {
            id: 2,
            title: 'Đơn đã nhận',
            subTitle: 'đã nhận',
            col: 'col-xl-3',
            number: 17,
            total: '25%',
            percent: '25%',
            label: 'label-light-info',
            processBarColor: 'bg-menu-picked',
            style: { backgroundPosition: 'right top', backgroundSize: '7rem 7rem', backgroundImage: `url(${AbtractThree})` },
        },
        {
            id: 3,
            title: 'Đơn hoàn thành',
            subTitle: 'hoàn thành',
            col: 'col-xl-3',
            number: 21,
            total: '35%',
            percent: '35%',
            label: 'label-light-success',
            processBarColor: 'bg-menu-completed',
            style: { backgroundPosition: 'right top', backgroundSize: '7rem 7rem', backgroundImage: `url(${AbtractThree})` },
        },
        {
            id: 4,
            title: 'Đơn bị hủy',
            subTitle: 'bị hủy',
            col: 'col-xl-3',
            number: 6,
            total: '23%',
            percent: '23%',
            label: 'label-light-danger',
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
                            <span className="label label-xl label-inprogress label-inline mr-3 py-4 flex-shrink-0 cursor-pointer">Ngày</span>
                            <span className="label label-xl label-light-success label-inline mr-3 py-4 flex-shrink-0 cursor-pointer">Tuần</span>
                            <span className="label label-xl label-picked label-inline mr-3 py-4 flex-shrink-0 cursor-pointer">Tháng</span>
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
                                    <LineChart />
                                </div>
                                <div className="col-xl-6">
                                    <VerticalChart />
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
