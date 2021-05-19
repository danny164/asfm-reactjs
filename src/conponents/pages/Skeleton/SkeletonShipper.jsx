import React from 'react';
import Skeleton from 'react-loading-skeleton';

import PropTypes from 'prop-types';

SkeletonShipper.propTypes = {
    status: PropTypes.string,
};
SkeletonShipper.defaultProps = {
    status: '',
};

function SkeletonShipper(props) {
    const { status } = props;
    return (
        <>
            <div className="separator separator-dashed my-5" />

            <p className="font-weight-bold">{status === '0' ? 'Chờ shipper nhận đơn bạn nhé !' : 'Người nhận đơn:'} </p>

            <div className="d-flex justify-content-between align-items-center">
                <div className="shipper-info">
                    <Skeleton circle={true} height={40} width={40} />

                    <div className="align-self-center">
                        <Skeleton height={11} width={120} /> <br />
                        <Skeleton height={11} width={70} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SkeletonShipper;
