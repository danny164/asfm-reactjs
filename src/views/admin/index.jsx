import { changeFilter } from 'components/common/filterSlice';
import { dateToFromNowDaily } from 'convert/DateToFromNow';
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
import { handleDeleteOrder } from '../../components/pages/HomepageFunc/DeleteOrder';
import { db, realtime } from '../../firebase';
import Service from './component/QualityService';
import Report from './component/ReportService';
import ShipperList from './component/ShipperList';
import ShopList from './component/ShopList';
import TotalOrder from './component/TotalOrder';
import './styles.scss';

function AdminPanel(props) {
    const [isShopList, setIsShopList] = useState(true);
    const [isShipperList, setIsShipperList] = useState(false);
    const [isTotalOrder, setIsTotalOrder] = useState(false);
    const [isReport, setIsReport] = useState(false);
    const [isService, setIsService] = useState(false);

    const [listShipper, setListShipper] = useState();
    const [listShop, setListShop] = useState();
    const [reportData, setReportData] = useState();
    const [flexible, setFlexible] = useState(false);
    const [date, setDate] = useState(moment().add(1, 'days').format('X'));
    const [selectedData, setSelectedData] = useState([]);
    const [serviceData, setServiceData] = useState();
    const [orderData, setOrderData] = useState();

    const [toggledClearRows, setToggledClearRows] = useState(false);

    const [show, setShow] = useState(false);
    const [showRespone, setShowRespone] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const noteRef = useRef();
    const reportRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        document.body.classList.add('bg');
        dispatch(changeFilter('all'));
    }, []);

    const toShopList = () => {
        setIsShopList(true);
        setIsShipperList(false);
        setIsTotalOrder(false);
        setIsReport(false);
        setIsService(false);
    };

    const toShipperList = () => {
        setIsShipperList(true);
        setIsShopList(false);
        setIsTotalOrder(false);
        setIsReport(false);
        setIsService(false);
    };

    const toTotalOrder = () => {
        setIsTotalOrder(true);
        setIsShipperList(false);
        setIsShopList(false);
        setIsReport(false);
        setIsService(false);
    };

    const toReport = () => {
        setIsReport(true);
        setIsTotalOrder(false);
        setIsShipperList(false);
        setIsShopList(false);
        setIsService(false);
    };
    const toService = () => {
        setIsService(true);
        setIsReport(false);
        setIsTotalOrder(false);
        setIsShipperList(false);
        setIsShopList(false);
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

        async function fetchService() {
            await realtime.ref('service/').on('value', (snapshot) => {
                if (snapshot.val() !== null) {
                    const a = [];

                    Object.values(snapshot.val()).map((data) => {
                        a.push(data);
                    });

                    setServiceData(a.sort((a, b) => (a.time < b.time ? 1 : -1)));
                }
            });
        }

        async function fetchAllOrder() {
            await realtime.ref('OrderStatus/').on('value', (snapshot) => {
                if (snapshot.val() !== null) {
                    const a = [];

                    Object.values(snapshot.val()).map((data) => {
                        Object.values(data).map((datas) => {
                            a.push(datas);
                        });
                    });

                    setOrderData(a.sort((a, b) => (a.thoi_gian < b.thoi_gian ? 1 : -1)));
                }
            });
        }

        async function fetchReport() {
            await realtime.ref('report/').on('value', (snapshot) => {
                if (snapshot.val() !== null) {
                    let a = [];

                    Object.values(snapshot.val()).map((data) => {
                        Object.values(data).map((datas) => {
                            a.push(datas);
                        });
                    });
                    a = a.filter((data) => data.status === '0');
                    setReportData(a.sort((a, b) => (a.time < b.time ? 1 : -1)));
                }
            });
        }
        fetchAllOrder();
        fetchService();
        fetchReport();
        fetchShipperList();
        fetchShopList();
    }, []);

    const locked = async () => {
        let reason = '';
        if (noteRef.current.value === '') {
            reason = 'Vi ph???m ch??nh s??ch s??? d???ng !';
        } else {
            reason = noteRef.current.value;
        }

        if (selectedData.length === 0) {
            return enqueueSnackbar('B???n ch??a ch???n ng?????i d??ng n??o !', {
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

        return enqueueSnackbar('Thao t??c th??nh c??ng', {
            variant: 'success',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
        });
    };

    const unLocked = async () => {
        if (selectedData.length === 0) {
            return enqueueSnackbar('B???n ch??a ch???n ng?????i d??ng n??o !', {
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

        return enqueueSnackbar('Thao t??c th??nh c??ng', {
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

    // fixed time 1, 3, 7 ng??y
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

    const ReportResponse = async () => {
        let response = '';

        if (reportRef.current.value === '') {
            response = '???? x??? l?? !';
        } else {
            response = reportRef.current.value;
        }

        try {
            await realtime
                .ref('report/' + selectedData[0].id_user + '/' + selectedData[0].id_report)
                .update({ admin: response, status: '1', response_time: moment().format('X'), read: 0 });
            setShowRespone(false);
            setToggledClearRows(true);
            setToggledClearRows(false);
        } catch (err) {
            console.log(err);
        }
    };
    // console.log(selectedData);

    //cancel order function
    const CancelOrder = async () => {
        if (selectedData.length === 0) {
            return enqueueSnackbar('B???n ch??a ch???n ????n n??o ????? h???y !', { variant: 'info' });
        }

        let reason = '????n h??ng b??? h???y b???i qu???n tr??? h??? th???ng !';

        await selectedData.map((data) => {
            handleDeleteOrder(data.id_post, reason, data.id_shop, enqueueSnackbar);
            try {
                realtime
                    .ref('received_order_status/' + data.id_shipper + '/' + data.id_post)
                    .update({ status: '3', thoi_gian: `${moment().format('X')}` });
            } catch (err) {
                console.log(err);
            }
        });
        setToggledClearRows(true);
        setToggledClearRows(false);
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
                                    Qu???n l?? Shop
                                </button>
                                <button type="button" className="btn btn-sm btn-light ml-3" onClick={toShipperList}>
                                    Qu???n l?? Shipper
                                </button>
                                <button type="button" className="btn btn-sm btn-light ml-3" onClick={toTotalOrder}>
                                    Qu???n l?? T???t c??? c??c ????n
                                </button>
                                <button type="button" className="btn btn-sm btn-light ml-3" onClick={toReport}>
                                    Qu???n l?? Khi???u n???i ????n
                                </button>
                                <button type="button" className="btn btn-sm btn-light ml-3" onClick={toService}>
                                    Qu???n l?? Ch???t l?????ng d???ch v???
                                </button>
                            </div>
                            <div className="mb-3">
                                {(isShopList || isShipperList) && (
                                    <>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-light-success ml-3"
                                            onClick={unLocked}
                                        >
                                            M??? kh??a
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-light-danger ml-3"
                                            onClick={() => {
                                                setShow(true);
                                                setDate(moment().add(1, 'days').format('X'));
                                            }}
                                        >
                                            Kh??a t??i kho???n
                                        </button>
                                    </>
                                )}
                                {isTotalOrder && (
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-light-danger ml-3"
                                        onClick={CancelOrder}
                                    >
                                        H???y ????n
                                    </button>
                                )}
                                {isReport && (
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-light-danger ml-3"
                                        onClick={() => {
                                            if (selectedData.length === 0) {
                                                return enqueueSnackbar('B???n ch??a ch???n report ????? ph???n h???i !', {
                                                    variant: 'info',
                                                });
                                            }
                                            setShowRespone(true);
                                        }}
                                    >
                                        Ph???n h???i
                                    </button>
                                )}
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
                                <Modal.Title>B???n mu???n kh??a bao l??u ? </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form className="form">
                                    <div className="form-group row">
                                        <label className="col-3 col-form-label">Th???i gian</label>
                                        <div className="col-9 col-form-label">
                                            <div className="radio-inline">
                                                <label className="radio radio-danger">
                                                    <input
                                                        type="radio"
                                                        name="lock-time"
                                                        defaultChecked="checked"
                                                        value="1"
                                                        onClick={timeFixed}
                                                    />
                                                    <span />
                                                    24 gi???
                                                </label>
                                                <label className="radio radio-danger">
                                                    <input
                                                        type="radio"
                                                        name="lock-time"
                                                        value="3"
                                                        onClick={timeFixed}
                                                    />
                                                    <span />3 ng??y
                                                </label>
                                                <label className="radio radio-danger">
                                                    <input
                                                        type="radio"
                                                        name="lock-time"
                                                        value="7"
                                                        onClick={timeFixed}
                                                    />
                                                    <span />1 tu???n
                                                </label>
                                                <label className="radio radio-danger">
                                                    <input type="radio" name="lock-time" onClick={timeChange} />
                                                    <span />
                                                    T??y ch???nh
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
                                                            defaultValue={moment()
                                                                .add(14, 'days')
                                                                .format('YYYY-MM-DD HH:mm')}
                                                            placeholder="Ch???n ng??y v?? gi???"
                                                            onChange={(date) => {
                                                                setDate(moment(date[0]).format('X'));
                                                            }}
                                                        />
                                                        <span className="form-text text-muted">
                                                            * T??y ch???n th???i gian b???n mu???n kh??a{' '}
                                                        </span>
                                                    </>
                                                </Expand>
                                            }
                                            <div className="radio-inline mt-3">
                                                <label className="radio radio-danger text-chartjs">
                                                    <input
                                                        type="radio"
                                                        name="lock-time"
                                                        value="0"
                                                        onClick={timeFixed}
                                                    />
                                                    <span />
                                                    Kh??a v??nh vi???n
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col col-form-label">
                                            <div className="form-group mb-1">
                                                <label htmlFor="reason-text">
                                                    L?? do kh??a <span className="text-danger">*</span>
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    name="reason-text"
                                                    rows={3}
                                                    placeholder="Vi ph???m ch??nh s??ch s??? d???ng !"
                                                    ref={noteRef}
                                                />
                                            </div>
                                            <span className="form-text text-muted">
                                                * C?? th??? ????? tr???ng n???i dung, n???i dung kh??a s??? l?? m???c ?????nh
                                            </span>
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
                                    ????ng
                                </Button>
                                <Button variant="chartjs btn-sm" onClick={locked}>
                                    Kh??a t??i kho???n
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal
                            show={showRespone}
                            onHide={() => {
                                setShowRespone(false);
                            }}
                        >
                            <Modal.Header>
                                <Modal.Title>Ph???n h???i b??o c??o</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedData[0] && (
                                    <>
                                        <div className="d-flex align-items-start">
                                            <span className="bullet bullet-bar bg-orange align-self-stretch" />
                                            <div className="d-flex flex-column flex-grow-1 ml-4">
                                                <header className="card-title content">
                                                    <span>{`#${selectedData[0].id_report}`}</span>
                                                    <span className="flex-shrink-0">
                                                        {dateToFromNowDaily(selectedData[0].time)}
                                                    </span>
                                                </header>
                                                <section className="card-info content">
                                                    <div className="mb-3">
                                                        <p>
                                                            <span className="font-weight-bold text-chartjs mr-1">
                                                                Lo???i:
                                                            </span>
                                                            <span className="font-weight-bold">
                                                                {selectedData[0].type === '0'
                                                                    ? 'Khi???u n???i'
                                                                    : 'G??p ??' && selectedData[0].type === '2' && 'Kh??c'}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className="font-weight-bold text-primary-2 mr-1">
                                                                M?? ????n h??ng:
                                                            </span>
                                                            <span className="text-brown">
                                                                {`#${selectedData[0].id_post}`}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <span className="delivery">N???i dung:</span>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <p className="mb-0 pl-0">{selectedData[0].content}</p>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                        <div className="separator separator-dashed my-2" />
                                        <div className="form-group">
                                            <label htmlFor="reply" className="font-weight-bold text-brown">
                                                Ph???n h???i
                                            </label>
                                            <textarea
                                                className="form-control form-control-lg"
                                                id="reply"
                                                rows={3}
                                                placeholder="???? x??? l?? !"
                                                ref={reportRef}
                                            />
                                            <span className="form-text text-muted">
                                                C?? th??? ????? tr???ng n???i dung s??? l?? m???c ?????nh
                                            </span>
                                        </div>
                                    </>
                                )}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="secondary btn-sm"
                                    onClick={() => {
                                        setShowRespone(false);
                                    }}
                                >
                                    ????ng
                                </Button>
                                <Button variant="chartjs btn-sm" onClick={ReportResponse}>
                                    G???i ph???n h???i
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        {isShopList && (
                            <ShopList
                                listShop={listShop}
                                getSelected={getSelected}
                                toggledClearRows={toggledClearRows}
                            />
                        )}
                        {isShipperList && (
                            <ShipperList
                                listShipper={listShipper}
                                getSelected={getSelected}
                                toggledClearRows={toggledClearRows}
                            />
                        )}
                        {isTotalOrder && (
                            <TotalOrder
                                orderData={orderData}
                                getSelected={getSelected}
                                toggledClearRows={toggledClearRows}
                            />
                        )}
                        {isReport && (
                            <Report
                                reportData={reportData}
                                getSelected={getSelected}
                                toggledClearRows={toggledClearRows}
                            />
                        )}
                        {isService && (
                            <Service
                                serviceData={serviceData}
                                getSelected={getSelected}
                                toggledClearRows={toggledClearRows}
                            />
                        )}
                    </section>
                    <Footer />
                </main>
            </div>
        </div>
    );
}

export default AdminPanel;
