import React from 'react';
import Skeleton from 'react-loading-skeleton';

function SkeletonNotification() {
    return (
        <>
            <div className="py-1">
                <Skeleton height={18} duration={1} delay={1} width={`88%`} />
            </div>
            <div className="separator separator-dashed my-2" />
            <div className="py-1">
                <Skeleton height={18} duration={1} delay={1} width={`95%`} />
            </div>
            <div className="separator separator-dashed my-2" />
            <div className="py-1">
                <Skeleton height={18} duration={1} delay={1} width={`80%`} />
            </div>
            <div className="separator separator-dashed my-2" />
            <div className="py-1">
                <Skeleton height={18} duration={1} delay={1} width={`90%`} />
            </div>
            <div className="separator separator-dashed my-2" />
            <div className="py-1">
                <Skeleton height={18} duration={1} delay={1} width={`83%`} />
            </div>
            <div className="separator separator-dashed my-2" />
            <div className="py-1">
                <Skeleton height={18} duration={1} delay={1} width={`87%`} />
            </div>
            <div className="separator separator-dashed my-2" />
            <div className="py-1">
                <Skeleton height={18} duration={1} delay={1} width={`80%`} />
            </div>
            <div className="separator separator-dashed my-2" />
            <div className="py-1">
                <Skeleton height={18} duration={1} delay={1} width={`70%`} />
            </div>
            <div className="separator separator-dashed my-2" />
            <div className="py-1">
                <Skeleton height={18} duration={1} delay={1} width={`95%`} />
            </div>
            <div className="separator separator-dashed my-2" />
            <div className="py-1">
                <Skeleton height={18} duration={1} delay={1} width={`85%`} />
            </div>
            <div className="separator separator-dashed my-2" />
            <div className="text-center pt-2 pb-3">
                <Skeleton height={17} duration={1} delay={1} width={`40%`} />
            </div>
        </>
    );
}

export default SkeletonNotification;
