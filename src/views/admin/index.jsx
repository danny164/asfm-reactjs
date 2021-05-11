import React, { useEffect, useState } from 'react';
import Footer from '../../conponents/common/Footer';
import HeaderMobile from '../../conponents/common/HeaderMobile';
import AsideLeft from '../../conponents/pages/AsideLeft';
import { db } from '../../firebase';
import ShipperList from './component/ShipperList';
import ShopList from './component/ShopList';

function AdminPanel(props) {
    const [isShopList, setIsShopList] = useState(true);
    const [isShipperList, setIsShipperList] = useState(false);
    const [listShipper, setListShipper] = useState();
    const [listShop, setListShop] = useState();

    useEffect(() => {
        document.body.classList.add('bg');
    }, []);

    const toShipperList = () => {
        setIsShipperList(true);
        setIsShopList(false);
    };

    const toShopList = () => {
        setIsShopList(true);
        setIsShipperList(false);
    };

    useEffect(() => {
        async function fetchShipperList() {
            await db.collection('ProfileShipper').onSnapshot((querySnapshot) => {
                if (querySnapshot) {
                    const b = [];
                    querySnapshot.forEach((doc) => {
                        b.push(doc.data());
                    });
                    setListShipper(b);
                }
            });
        }
        async function fetchShopList() {
            await db.collection('ShopProfile').onSnapshot((querySnapshot) => {
                if (querySnapshot) {
                    const a = [];
                    querySnapshot.forEach((doc) => {
                        a.push(doc.data());
                    });
                    setListShop(a);
                }
            });
        }
        fetchShipperList();
        fetchShopList();
    }, []);

    const banned = async (selectedData) => {
        if (isShopList === true) {
            await selectedData.map((data) => {
                db.collection('ShopProfile').where('id', '==', data.id).update({ role: '2' });
            });
        } else {
            await selectedData.map((data) => {
                db.collection('ProfileShipper').doc(data.id).update({ role: '2' });
            });
        }
    };

    const permanentLock = async (selectedData) => {};

    return (
        <div className="header-fixed sidebar-enabled bg">
            <div className="d-flex flex-row flex-column-fluid page">
                <AsideLeft />
                <main className="d-flex flex-column flex-row-fluid wrapper min-vh-100">
                    <HeaderMobile />
                    <section className="card-body">
                        <div className="py-3 mb-3">
                            <span
                                className="label label-xl label-inprogress label-inline ml-3 py-4 flex-shrink-0 cursor-pointer"
                                onClick={toShopList}
                            >
                                Quản lý Shop
                            </span>
                            <span className="label label-xl label-picked label-inline ml-3 py-4 flex-shrink-0 cursor-pointer" onClick={toShipperList}>
                                Quản lý Shipper
                            </span>
                        </div>
                        {isShopList ? (
                            <ShopList listShop={listShop} banned={banned} permanentLock={permanentLock} />
                        ) : (
                            <ShipperList listShipper={listShipper} banned={banned} permanentLock={permanentLock} />
                        )}
                    </section>
                    <Footer />
                </main>
            </div>
        </div>
    );
}

export default AdminPanel;
