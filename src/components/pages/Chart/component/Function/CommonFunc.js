import moment from 'moment';
import React from 'react';

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





function CommonFunc(props) {
    return (
        <div>

        </div>
    );
}

export default CommonFunc;