import React from 'react';
import Skeleton from 'react-loading-skeleton';

function SkeletonMailBox(props) {
    return (
        <>
            <article
                className="mb-5"
                style={{
                    padding: '10px',
                    borderRadius: '6px',
                    color: 'rgb(57, 58, 52)',
                    backgroundColor: 'rgba(246, 248, 250)',
                    overflow: 'auto',
                }}
            >
                <div className="d-flex align-items-start">
                    <span className="bullet bullet-bar bg-orange align-self-stretch height-mailbox" />
                    <div className="d-flex flex-column flex-grow-1 ml-4">
                        <header>
                            <Skeleton duration={1} height={12} width={`35%`} />
                        </header>
                        <section className="card-info content mt-2">
                            <div className="mb-4 mt-2">
                                <Skeleton height={12} width={`70%`} />
                            </div>
                            <div className="mb-1 mt-2">
                                <Skeleton height={12} width={`30%`} />
                            </div>
                            <div className="mb-2 mt-3">
                                <Skeleton height={12} width={`40%`} />
                            </div>
                            <Skeleton height={12} width={`55%`} />
                        </section>
                    </div>
                </div>
                <div className="separator separator-dashed my-2" />
                <div className="text-brown">
                    <Skeleton height={12} width={`40%`} />
                </div>
            </article>
        </>
    );
}

export default SkeletonMailBox;
