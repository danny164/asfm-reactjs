import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


export const presentDataVerticalChart = (datas, days, setPresentData) => {
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
                array[i] = array[i] + parseInt((data.phi_ung).replace(" ", ''))
            }
        })
    }
    setPresentData(array)
}



export const lastDataVerticalChart = (datas, days, setLastData) => {
    let array = []

    if (days.length === 7) {
        array = [0, 0, 0, 0, 0, 0, 0]
    } else {
        array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
    for (let i = 7; i < days.length; i++) {
        datas.map((data) => {
            if (moment.unix(data.thoi_gian).format('DD/MM') === days[i]) {
                array[i] = array[i] + parseInt((data.phi_ung).replace(" ", ''))
            }
        })
    }
    setLastData(array)
}





function VerticalChart(props) {
    return (
        <div>

        </div>
    );
}

export default VerticalChart;