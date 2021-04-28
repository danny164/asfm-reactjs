import React, { useEffect } from 'react';
import Footer from '../../conponents/common/Footer';
import HeaderMobile from '../../conponents/common/HeaderMobile';
import AsideLeft from '../../conponents/pages/AsideLeft';
import ShopList from './component/ShopList';

function AdminPanel(props) {
    useEffect(() => {
        document.body.classList.add('bg');
    }, []);

    return (
        <div className="header-fixed sidebar-enabled bg">
            <div className="d-flex flex-row flex-column-fluid page">
                <AsideLeft />
                <main className="d-flex flex-column flex-row-fluid wrapper min-vh-100">
                    <HeaderMobile />
                    <section className="card-body">
                        <div className="py-3 mb-3">
                            <span className="label label-xl label-inprogress label-inline ml-3 py-4 flex-shrink-0 cursor-pointer">Quản lý Shop</span>
                            <span className="label label-xl label-picked label-inline ml-3 py-4 flex-shrink-0 cursor-pointer">Quản lý Shipper</span>
                        </div>
                        <ShopList />
                    </section>
                    <Footer />
                </main>
            </div>
        </div>
    );
}

AdminPanel.propTypes = {};

export default AdminPanel;
