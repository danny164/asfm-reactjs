import { changeFilter } from 'components/common/filterSlice';
import { Vietnamese } from 'flatpickr/dist/l10n/vn';
import 'flatpickr/dist/themes/airbnb.css';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Expand from 'react-expand-animated';
import Flatpickr from 'react-flatpickr';
import { useDispatch } from 'react-redux';
import Footer from '../../components/common/Footer';
import HeaderMobile from '../../components/common/HeaderMobile';
import AsideLeft from '../../components/pages/AsideLeft';
import { db } from '../../firebase';
import ShipperList from './component/ShipperList';
import ShopList from './component/ShopList';
import './styles.scss';

function AdminPanel(props) {
    const [isShopList, setIsShopList] = useState(true);
    const [isShipperList, setIsShipperList] = useState(false);
    const [listShipper, setListShipper] = useState();
    const [listShop, setListShop] = useState();

    const [flexible, setFlexible] = useState(false);
    const [date, setDate] = useState(moment().add(1, 'days').format('X'));
    const [selectedData, setSelectedData] = useState([]);

    const [toggledClearRows, setToggledClearRows] = useState(false);

    const [show, setShow] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const noteRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        document.body.classList.add('bg');
        dispatch(changeFilter('all'));
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

    const locked = async () => {
        let reason = '';
        if (noteRef.current.value === '') {
            reason = 'Vi phạm chính sách sử dụng !';
        } else {
            reason = noteRef.current.value;
        }

        if (selectedData.length === 0) {
            return enqueueSnackbar('Bạn chưa chọn người dùng nào !', {
                variant: 'info',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                },
            });
        }

        if (isShopList === true) {
            if (date > '4129589471') {
                await selectedData.map((data) => {
                    db.collection('ShopProfile').doc(data.uid).update({ role: '0', reason: reason, lock_time: date });
                });
            } else {
                await selectedData.map((data) => {
                    db.collection('ShopProfile').doc(data.uid).update({ role: '2', lock_time: date, reason: reason });
                });
            }
        } else {
            if (date > '4129589471') {
                await selectedData.map((data) => {
                    db.collection('ProfileShipper').doc(data.id).update({ role: '0', reason: reason, lock_time: date });
                });
            } else {
                await selectedData.map((data) => {
                    db.collection('ProfileShipper').doc(data.id).update({ role: '2', lock_time: date, reason: reason });
                });
            }
        }

        setToggledClearRows(true);
        setToggledClearRows(false);
        setShow(false);

        return enqueueSnackbar('Thao tác thành công', {
            variant: 'success',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
        });
    };

    const unLocked = async () => {
        if (selectedData.length === 0) {
            return enqueueSnackbar('Bạn chưa chọn người dùng nào !', {
                variant: 'info',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                },
            });
        }

        if (isShopList === true) {
            await selectedData.map((data) => {
                db.collection('ShopProfile').doc(data.uid).update({ role: '1', lock_time: '', reason: '' });
            });
        } else {
            await selectedData.map((data) => {
                db.collection('ProfileShipper').doc(data.id).update({ role: '1', lock_time: '', reason: '' });
            });
        }

        setToggledClearRows(true);
        setToggledClearRows(false);
        setShow(false);

        return enqueueSnackbar('Thao tác thành công', {
            variant: 'success',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
        });
    };

    // custom time with datetimepicker
    const timeChange = (e) => {
        setFlexible(true);
        setDate(moment().add(14, 'days').format('X'));
    };

    // fixed time 1, 3, 7 ngày
    const timeFixed = (e) => {
        setFlexible(false);
        convertLockTime(e.target.value);
        console.log(e.target.value);
    };

    // set 0 to lock forever, others to lock temporary
    const convertLockTime = (type) => {
        if (type === '0') {
            setDate(moment().add(100, 'years').format('X'));
        } else {
            setDate(moment().add(type, 'days').format('X'));
        }
    };

    const getSelected = (selected) => {
        setSelectedData(selected);
    };

    return (
        <div className="header-fixed sidebar-enabled bg">
            <div className="d-flex flex-row flex-column-fluid page">
                <AsideLeft />
                <main className="d-flex flex-column flex-row-fluid wrapper min-vh-100">
                    <HeaderMobile />
                    <section className="card-body">
                        <div className="card-body__action py-3">
                            <div className="mb-3">
                                <button type="button" className="btn btn-sm btn-light ml-3" onClick={toShopList}>
                                    Quản lý Shop
                                </button>
                                <button type="button" className="btn btn-sm btn-light ml-3" onClick={toShipperList}>
                                    Quản lý Shipper
                                </button>
                                <button type="button" className="btn btn-sm btn-light ml-3">
                                    Quản lý Tất cả các đơn
                                </button>
                                <button type="button" className="btn btn-sm btn-light ml-3">
                                    Quản lý Khiếu nại đơn
                                </button>
                                <button type="button" className="btn btn-sm btn-light ml-3">
                                    Quản lý Chất lượng dịch vụ
                                </button>
                            </div>
                            <div className="mb-3">
                                <button type="button" className="btn btn-sm btn-light-success ml-3" onClick={unLocked}>
                                    Mở khóa
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-light-danger ml-3"
                                    onClick={() => {
                                        setShow(true);
                                        setDate(moment().add(1, 'days').format('X'));
                                    }}
                                >
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
                                                    <input type="radio" name="lock-time" defaultChecked="checked" value="1" onClick={timeFixed} />
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
                                            {
                                                <Expand open={flexible}>
                                                    <>
                                                        <Flatpickr
                                                            className="form-control datetimepicker-input mt-3"
                                                            options={{
                                                                enableTime: true,
                                                                time_24hr: true,
                                                                minDate: 'today',
                                                                locale: Vietnamese,
                                                            }}
                                                            defaultValue={moment().add(14, 'days').format('YYYY-MM-DD HH:mm')}
                                                            placeholder="Chọn ngày và giờ"
                                                            onChange={(date) => {
                                                                setDate(moment(date[0]).format('X'));
                                                            }}
                                                        />
                                                        <span className="form-text text-muted">* Tùy chọn thời gian bạn muốn khóa </span>
                                                    </>
                                                </Expand>
                                            }
                                            <div className="radio-inline mt-3">
                                                <label className="radio radio-danger text-chartjs">
                                                    <input type="radio" name="lock-time" value="0" onClick={timeFixed} />
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
                                                    ref={noteRef}
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
                                <Button variant="chartjs btn-sm" onClick={locked}>
                                    Khóa tài khoản
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        {isShopList ? (
                            <ShopList listShop={listShop} getSelected={getSelected} toggledClearRows={toggledClearRows} />
                        ) : (
                            <ShipperList listShipper={listShipper} getSelected={getSelected} toggledClearRows={toggledClearRows} />
                        )}
                    </section>
                    <Footer />
                </main>
            </div>
        </div>
    );
}

export default AdminPanel;
