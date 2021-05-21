import React from 'react';
import Skeleton from 'react-loading-skeleton';

function SkeletonSortLength() {
    return (
        <>
            <span className="ml-2">
                <Skeleton height={16} width={16} circle={true} />
            </span>
        </>
    );
}

export default SkeletonSortLength;
