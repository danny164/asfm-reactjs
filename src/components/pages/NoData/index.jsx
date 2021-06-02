import React from 'react';
import NoDataFound from 'assets/media/no_data_found.png';

function NoData(props) {
    return (
        <div className="text-center mt-3">
            <span>
                <img src={NoDataFound} width="150" alt="No data found" />
            </span>
            <div className="font-weight-bold text-chartjs mt-3">Không dữ liệu được tìm thấy !</div>
        </div>
    );
}

NoData.propTypes = {};

export default NoData;
