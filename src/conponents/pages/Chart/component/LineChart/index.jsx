import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

function LineChart(props) {
    return (
        <div className="card card-custom card-stretch gutter-b">
            <div className="card-header h-auto border-0">
                <div className="card-title py-5">
                    <h3 className="card-label">
                        <span className="d-block title">Biểu đồ LineChart</span>
                        <span className="d-block text-time mt-2 font-size-sm">Mô tả biểu đồ LineChart !</span>
                    </h3>
                </div>
                <div></div>
            </div>
            <div className="card-body" style={{ position: 'relative' }}>
                Thêm biểu đồ vào chỗ này !
            </div>
        </div>
    );
}

LineChart.propTypes = {};

export default LineChart;
