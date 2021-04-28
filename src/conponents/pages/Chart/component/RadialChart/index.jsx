import React from 'react';

function RadialChart(props) {
    return (
        <div className="card card-custom card-stretch gutter-b">
            <div className="card-header h-auto border-0">
                <div className="card-title py-5">
                    <h3 className="card-label">
                        <span className="d-block title">Biểu đồ RadialChart</span>
                        <span className="d-block text-time mt-2 font-size-sm">Mô tả biểu đồ RadialChart !</span>
                    </h3>
                </div>
                <div></div>
            </div>
            <div className="card-body" style={{ position: 'relative' }}>
                Thả data ở đây !
            </div>
        </div>
    );
}

RadialChart.propTypes = {};

export default RadialChart;
