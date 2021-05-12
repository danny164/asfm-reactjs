import 'flatpickr/dist/themes/airbnb.css';
import { Vietnamese } from 'flatpickr/dist/l10n/vn';
import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Flatpickr from 'react-flatpickr';
import Footer from '../../conponents/common/Footer';
import HeaderMobile from '../../conponents/common/HeaderMobile';
import AsideLeft from '../../conponents/pages/AsideLeft';
import { db } from '../../firebase';
import ShipperList from './component/ShipperList';
import ShopList from './component/ShopList';
import './styles.scss';
import moment from 'moment';

function AdminPanel(props) {
    const [isShopList, setIsShopList] = useState(true);
    const [isShipperList, setIsShipperList] = useState(false);
    const [listShipper, setListShipper] = useState();
    const [listShop, setListShop] = useState();
    const [flexible, setFlexible] = useState(false);
    const [date, setDate] = useState(new Date());
    const [selectedData, setSelectedData] = useState([]);

    const [lockTime, setLockTime] = useState();

    const [show, setShow] = useState(false);

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

    const timeChange = (e) => {
        setFlexible(true);
    };

    const timeFixed = (e) => {
        setFlexible(false);
        convertLockTime(e.target.value)
    };

    const convertLockTime = (type) => {

        
    };

    const getSelected = (selected) => {
        setSelectedData(selected);
    };

    console.log(selectedData);

    return (
        <div className="header-fixed sidebar-enabled bg">
            <div className="d-flex flex-row flex-column-fluid page">
                <AsideLeft />
                <main className="d-flex flex-column flex-row-fluid wrapper min-vh-100">
                    <HeaderMobile />
                    <section className="card-body">
                        <div className="card-body__action py-3">
                            <div className="mb-3">
                                <button type="button" className="btn btn-sm btn-light-primary ml-3" onClick={toShopList}>
                                    Quản lý Shop
                                </button>
                                <button type="button" className="btn btn-sm btn-light-primary ml-3" onClick={toShipperList}>
                                    Quản lý Shipper
                                </button>
                            </div>
                            <div className="mb-3">
                                <button type="button" className="btn btn-sm btn-light-success ml-3">
                                    Mở khóa
                                </button>
                                <button type="button" className="btn btn-sm btn-light-danger ml-3" onClick={() => setShow(true)}>
                                    Khóa tài khoản
                                </button>
                            </div>
                        </div>

                        <Modal
                            show={show}
                            onHide={() => {
                                setShow(false);
                                setFlexible(false);
                            }}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Bạn muốn khóa bao lâu ? </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form className="form">
                                    <div className="form-group row">
                                        <label className="col-3 col-form-label">Thời gian</label>
                                        <div className="col-9 col-form-label">
                                            <div className="radio-inline">
                                                <label className="radio radio-danger">
                                                    <input type="radio" name="lock-time" value="1" onClick={timeFixed} />
                                                    <span />
                                                    24 giờ
                                                </label>
                                                <label className="radio radio-danger">
                                                    <input type="radio" name="lock-time" value="3" onClick={timeFixed} />
                                                    <span />3 ngày
                                                </label>
                                                <label className="radio radio-danger">
                                                    <input type="radio" name="lock-time" value="7" onClick={timeFixed} />
                                                    <span />1 tuần
                                                </label>
                                                <label className="radio radio-danger">
                                                    <input type="radio" name="lock-time" onClick={timeChange} />
                                                    <span />
                                                    Tùy chỉnh
                                                </label>
                                            </div>
                                            {flexible === true && (
                                                <>
                                                    <Flatpickr
                                                        className="form-control datetimepicker-input mt-3"
                                                        options={{
                                                            enableTime: true,
                                                            time_24hr: true,
                                                            minDate: 'today',
                                                            locale: Vietnamese,
                                                        }}
                                                        placeholder="Chọn ngày và giờ"
                                                        value={date}
                                                        onChange={(date) => {
                                                            setDate(date);
                                                        }}
                                                    />

                                                    <span className="form-text text-muted">* Tùy chọn thời gian bạn muốn khóa </span>
                                                </>
                                            )}
                                            <div className="radio-inline mt-3">
                                                <label className="radio radio-danger text-chartjs">
                                                    <input type="radio" name="lock-time" />
                                                    <span />
                                                    Khóa vĩnh viễn
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col col-form-label">
                                            <div className="form-group mb-1">
                                                <label htmlFor="reason-text">
                                                    Lý do khóa <span className="text-danger">*</span>
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    name="reason-text"
                                                    rows={3}
                                                    placeholder="Vi phạm chính sách sử dụng !"
                                                />
                                            </div>
                                            <span className="form-text text-muted">* Có thể để trống nội dung, nội dung khóa sẽ là mặc định</span>
                                        </div>
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="secondary btn-sm"
                                    onClick={() => {
                                        setShow(false);
                                        setFlexible(false);
                                    }}
                                >
                                    Đóng
                                </Button>
                                <Button variant="chartjs btn-sm">Khóa tài khoản</Button>
                            </Modal.Footer>
                        </Modal>
                        {isShopList ? (
                            <ShopList listShop={listShop} getSelected={getSelected} />
                        ) : (
                            <ShipperList listShipper={listShipper} getSelected={getSelected} />
                        )}
                    </section>
                    <Footer />
                </main>
            </div>
        </div>
    );
}

export default AdminPanel;
