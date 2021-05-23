import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

VerticalChart.propTypes = {
    datas: PropTypes.array,
};

VerticalChart.defaultProps = {
    datas: [],
};

function VerticalChart(props) {
    const { datas } = props;
    const [label, setLabel] = useState();
    const [labels, setLabels] = useState();

    const data = {
        labels: ['01/05', '02/05', '03/05', '04/05', '05/05', '06/05', '07/05'],
        datasets: [
            {
                label: 'Tuần trước',
                data: [12, 19, 3, 5, 2, 3, 28],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Tuần này',
                data: [21, 10, 42, 25, 6, 17, 30],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
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
                        <span className="d-block title">Chi phí giao hàng ngày, tuần, Tháng</span>
                        <span className="d-block text-chartjs mt-2 font-size-sm">Mô tả Vertical Chart !</span>
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
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}

export default React.memo(VerticalChart);
