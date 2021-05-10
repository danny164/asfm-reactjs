import React, { useEffect, useState } from 'react';
import Footer from '../../conponents/common/Footer';
import HeaderMobile from '../../conponents/common/HeaderMobile';
import AsideLeft from '../../conponents/pages/AsideLeft';
import ShopList from './component/ShopList';
import ShipperList from './component/ShipperList';
import { db } from '../../firebase';
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
                    console.log(a);
                    setListShop(a);
                }
            });
        }
        fetchShipperList();
        fetchShopList();
    }, []);

    const bannedShop = async () => {
        // if (type === '2') {
        await db.collection('ShopProfile').where('id', '==', '20210510-142919964165').update({ role: '2' });
        return alert('Khóa thành công !');

        // if (type === '0') {
        //     await db.collection('ShopProfile').doc('ue0tQY1XjBYRqiV9mqscygDqc2w1').update({ role: '0' });
        // }
    };

    const bannedShipper = (type) => {};

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
                        <span className="label label-xl label-picked label-inline ml-3 py-4 flex-shrink-0 cursor-pointer" onClick={toShipperList}>
                            <button onClick={() => bannedShop()}>test</button>
                        </span>
                        {isShopList ? <ShopList listShop={listShop} /> : <ShipperList listShipper={listShipper} />}
                    </section>
                    <Footer />
                </main>
            </div>
        </div>
    );
}

export default AdminPanel;
