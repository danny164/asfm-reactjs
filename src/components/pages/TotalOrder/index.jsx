import Footer from 'components/common/Footer';
import HeaderMobile from 'components/common/HeaderMobile';
import React from 'react';
import AsideLeft from '../AsideLeft';

function TotalOrder(props) {
    return (
        <>
            <div className="header-fixed sidebar-enabled bg">
                <div className="d-flex flex-row flex-column-fluid page">
                    <AsideLeft />
                    <main className="d-flex flex-column flex-row-fluid wrapper min-vh-100">
                        <HeaderMobile />
                        <section className="card-body">
                            <div className="card-body__action py-3">
                                <div className="mb-3">
                                    <button type="button" className="btn btn-sm btn-light ml-3">
                                        Quản lý đơn
                                    </button>
                                </div>
                                <div className="mb-3">
                                    <button type="button" className="btn btn-sm btn-light-success ml-3">
                                        Hủy đơn
                                    </button>
                                    <button type="button" className="btn btn-sm btn-light-danger ml-3">
                                        Xóa đơn
                                    </button>
                                </div>
                            </div>
                        </section>
                        <Footer />
                    </main>
                </div>
            </div>
        </>
    );
}

TotalOrder.propTypes = {};

export default TotalOrder;
