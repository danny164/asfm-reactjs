import moment from "moment";
import React from 'react';
import PropTypes from 'prop-types';

export const getDay = (day, setDays) => {
    let array = [];
    for (let i = 0; i < day; i++) {
        array.push(moment().subtract(i, 'day').format('DD/MM'));
    }
    setDays(array.reverse());
};

export const getLastDay = (day, setDays) => {
    let array = [];
    for (let i = 7; i < day; i++) {
        array.push(moment().subtract(i, 'day').format('DD/MM'));
    }
    setDays(array.reverse());
};


export const presentDataLineChart = (datas, days, setPresentData) => {
    let array = []
    if (days.length === 7) {
        array = [0, 0, 0, 0, 0, 0, 0]
    } else {
        array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
    //so sánh thời gian và lấy số đơn của ngày hôm đó.
    for (let i = 0; i < days.length; i++) {
        datas.map((data) => {
            if (moment.unix(data.thoi_gian).format('DD/MM') === days[i]) {
                array[i] = array[i] + 1
            }
        })
    }
    setPresentData(array)
}

export const lastDataLineChart = (datas, days, setLastData) => {
    let array = []

    if (days.length === 14) {
        array = [0, 0, 0, 0, 0, 0, 0]
    } else {
        array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
    for (let i = 7; i < days.length; i++) {
        datas.map((data) => {
            if (moment.unix(data.thoi_gian).format('DD/MM') === days[i]) {
                array[i] = array[i] + 1
            }
        })
    }
    setLastData(array)
}







LineChart.propTypes = {
    
};

function LineChart(props) {
    return (
        <div>
            
        </div>
    );
}

export default LineChart;