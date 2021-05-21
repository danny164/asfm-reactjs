import React from 'react';
import Skeleton from 'react-loading-skeleton';

function SkeletonLoading() {
    return (
        <>
            <article className="order">
                <div className="d-flex align-items-start">
                    <span className="bullet bullet-bar bg-orange align-self-stretch height-fixed" />
                    <div className="d-flex flex-column flex-grow-1 ml-4">
                        <section className="card-info content">
                            <Skeleton duration={1} height={11} width={`35%`} />
                            <div className="my-3">
                                <Skeleton height={12} width={`80%`} />
                                <Skeleton height={12} width={`50%`} />
                                <Skeleton height={12} width={`60%`} />
                            </div>
                            <Skeleton height={11} width={`30%`} />
                            <div>
                                <Skeleton height={11} width={`20%`} />
                            </div>
                            <Skeleton height={11} width={`40%`} />
                        </section>
                    </div>
                </div>
                <div className="separator separator-dashed my-5" />
            </article>
        </>
    );
}

export default SkeletonLoading;
