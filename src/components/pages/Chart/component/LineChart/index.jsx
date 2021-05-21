import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import moment from 'moment';

LineChart.propTypes = {
    datas: PropTypes.array,
};

LineChart.defaultProps = {
    datas: [],
};

function LineChart(props) {
    const { datas } = props;
    const [label, setLabel] = useState();
    const [labels, setLabels] = useState();
    const [days, setDays] = useState();

    console.log(datas);

    const getDay = (day) => {
        const array = []
        for (const i = 1; i <= day; i++) {
            array.push(moment().subtract(i, 'day').format("dd/mm"))
        }
    };
    //1 tuân 20 đơn.
    const data = {
        labels: ['01/05', '02/05', '03/05', '04/05', '05/05', '06/05', '07/05'],
        datasets: [
            {
                label: 'Tuần trước',
                data: [12, 19, 3, 5, 2, 3, 17],
                fill: false,
                lineTension: 0.2,
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'Tuần này',
                data: [25, 10, 6, 9, 7, 25, 12],
                fill: false,
                lineTension: 0.2,
                backgroundColor: 'rgba(54, 162, 235, 1)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    const [sortByRange, setSortByRange] = useState('7');

    const handleSortByRange = (range) => {
        setSortByRange(range);
    };

    return (
        <div className="card card-custom card-stretch gutter-b">
            <div className="card-header h-auto border-0">
                <div className="card-title py-5">
                    <h3 className="card-label">
                        <span className="d-block title">Số lượng đơn của ngày, tuần, tháng</span>
                        <span className="d-block text-primary-2 mt-2 font-size-sm">Mô tả Line Chart !</span>
                    </h3>
                </div>
                <div className="card-toolbar">
                    <ul className="nav nav-pills">
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
            </div>
            <div className="card-body" style={{ position: 'relative' }}>
                <Line data={data} options={options} />
            </div>
        </div>
    );
}

export default React.memo(LineChart);
