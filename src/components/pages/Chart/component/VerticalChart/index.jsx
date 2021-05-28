import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { presentDataVerticalChart, lastDataVerticalChart } from '../Function/VerticalChart';
import { getDay, getLastDay } from '../Function/CommonFunc';

VerticalChart.propTypes = {
    datas: PropTypes.array,
};

VerticalChart.defaultProps = {
    datas: [],
};

function VerticalChart(props) {
    const { datas } = props;

    const [days, setDays] = useState([]);
    const [lastDays, setLastDays] = useState([]);
    const [sortByRange, setSortByRange] = useState(7);
    const [presentData, setPresentData] = useState([]);
    const [lastData, setLastData] = useState([]);
    const [note, setNote] = useState('Tuần');

    useEffect(() => {
        getDay(sortByRange, setDays);
        getLastDay(sortByRange + 7, setLastDays);
    }, [datas, sortByRange]);

    useEffect(() => {
        if (days.length !== 0) {
            presentDataVerticalChart(datas, days, setPresentData);
        }
    }, [days]);

    useEffect(() => {
        if (lastDays.length !== 0) {
            lastDataVerticalChart(datas, lastDays, setLastData);
        }
    }, [lastDays]);

    const data = {
        labels: days,
        datasets: [
            {
                label: `${note} trước`,
                data: lastData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: `${note} này`,
                data: presentData,
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

    const handleSortByRange = (range) => {
        setSortByRange(range);
        if (range === 30) setNote('Tháng');
        else setNote('Tuần');
    };

    return (
        <div className="card card-custom card-stretch gutter-b">
            <div className="card-header h-auto border-0">
                <div className="card-title py-5">
                    <h3 className="card-label">
                        <span className="d-block title">Tổng thu nhập dựa trên số tiền tạm ứng</span>
                        <span className="d-block text-chartjs mt-2 font-size-sm">{`${days[0]} - ${days[6]}`}</span>
                    </h3>
                </div>
                <div className="card-toolbar">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <div
                                className={`nav-link btn py-2 px-4 ${
                                    sortByRange === 30 ? 'active' : 'btn-outline-secondary'
                                }`}
                                onClick={() => handleSortByRange(30)}
                            >
                                <span className="nav-text">Tháng</span>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div
                                className={`nav-link btn py-2 px-4 ${
                                    sortByRange === 7 ? 'active' : 'btn-outline-secondary'
                                }`}
                                onClick={() => handleSortByRange(7)}
                            >
                                <span className="nav-text">Tuần</span>
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
