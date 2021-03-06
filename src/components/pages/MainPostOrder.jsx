import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { convertAddress } from 'convert/Address';
import { convertString } from 'convert/String';
import { dataList } from 'data/dataList';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import random from 'randomstring';
import React, { useRef, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Expand from 'react-expand-animated';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import * as yup from 'yup';
import Footer from '../common/Footer';
import Header from '../common/Header';
import FeeRec from './ShipFeeRecommend/FeeRec';

MainPostOrder.propTypes = {
    postOrder: PropTypes.func,
    defaultAddressError: PropTypes.string,
};

MainPostOrder.defaultProps = {
    postOrder: null,
    defaultAddressError: '',
};

//////////////////////////////////////////////////////
const reverseString = (value) => {
    // 000 20 => 00020 => 20 + ' 000'
    const input = parseInt(value.split(' ').join('')); // 20

    if (input === 0 || isNaN(input)) return '0';

    return input + ' 000';
};

const convertNewPrice = (value) => {
    const input = value / 1000 + ' 000'; // 20 000
    return input;
};

function MainPostOrder(props) {
    //////////////////////////////////////////////////////
    const { postOrder, defaultAddressError } = props;
    const [show, setShow] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const [receiveAddress, setReceiveAddress] = useState(false);
    const [km, setKm] = useState();
    ////////////////////////////////////////////////////
    const dateTime = moment().format('X');
    //////////////////////////////////////////////////////
    const idPost =
        moment().format('YYYYMMDD-HHmmssSSS') +
        random.generate({
            length: 3,
            charset: 'numeric',
        });

    const idChat =
        moment().format('YYYYMMDD-HHmmssSSS') +
        random.generate({
            length: 3,
            charset: 'numeric',
        });

    //////////////////////////////////////////////////////
    const customerRef = useRef();
    const numberRef = useRef();
    const shipFeeRef = useRef();
    const depositFeeRef = useRef();
    const noteRef = useRef();
    const shipDistrcitRef = useRef();
    const shipWardRef = useRef();
    const shipAddressRef = useRef();
    const receiveDistrictRef = useRef();
    const receiveWardRef = useRef();
    const receiveAddressRef = useRef();

    //////////////////////////////////////////////////////
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [districtReceive, setDistrictReceive] = useState('');
    const [wardReceive, setWardReceive] = useState('');
    const [fullnameError, setFullnameError] = useState('');
    const [addressReceiveError, setAddressReceiveError] = useState();
    const [districtReceiveError, setDistrictReceiveError] = useState();
    const [wardReceiveError, setWardReceiveError] = useState();
    const [districtError, setDistrictError] = useState();
    const [wardError, setWardError] = useState();
    //////////////////////////////////////////////////////

    //////////////////////////////////////////////////////
    // ! Danh s??ch Qu???n
    //////////////////////////////////////////////////////
    const districtList = () => {
        const items = [];

        for (const district in dataList) {
            items.push(<option value={district}>{district}</option>);
        }
        return items;
    };

    //////////////////////////////////////////////////////
    // ! Danh s??ch Ph?????ng
    //////////////////////////////////////////////////////
    const wardList = () => {
        if (!district) return;
        const items = [];
        Object.values(dataList[district]).map((data, index) => {
            items.push(
                <option key={index} value={data}>
                    {data}
                </option>
            );
        });
        return items;
    };

    const wardReceiveList = () => {
        if (!districtReceive) return;
        const items = [];
        Object.values(dataList[districtReceive]).map((data, index) => {
            items.push(
                <option key={index} value={data}>
                    {data}
                </option>
            );
        });
        return items;
    };
    //////////////////////////////////////////////////////
    // ! Reset old selection
    //////////////////////////////////////////////////////
    const handleDistrictChange = (e) => {
        if (e.target.value || e.target.value === '') {
            setDistrict(e.target.value);
            setDistrictError('');
            setWard('');
        }
    };

    const handleDistrictReceiveChange = (e) => {
        if (e.target.value || e.target.value === '') {
            setDistrictReceive(e.target.value);
            setDistrictReceiveError('');
            setWardReceive('');
        }
    };
    //////////////////////////////////////////////////////

    const schema = yup.object().shape({
        fullname: yup
            .string()
            .required('Vui l??ng ??i???n t??n kh??ch h??ng')
            .max(50, 'V?????t qu?? ${max} k?? t??? ???????c cho ph??p')
            .min(5, 'T???i thi???u ${min} k?? t???'),
        phone: yup
            .string()
            .matches(/^[0-9\s]+$/, '?????nh d???ng kh??ng h???p l???')
            .required('Vui l??ng ??i???n s??? ??i???n tho???i kh??ch h??ng'),
        shipFee: yup.string().required('Vui l??ng nh???p ph?? giao h??ng b???n mu???n tr???'),
        tempFee: yup.string(),
        note: yup.string().max(100, 'V?????t qu?? ${max} k?? t??? ???????c cho ph??p'),
        shipAddress: yup
            .string()
            .max(50, 'V?????t qu?? ${max} k?? t??? ???????c cho ph??p')
            .min(5, 'T???i thi???u ${min} k?? t???')
            .required('Vui l??ng cung c???p s??? nh??, t??n ???????ng'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const checkingFullname = `form-control form-control-lg ${errors.fullname || fullnameError ? 'is-invalid' : ''}`;
    const checkingPhone = `form-control form-control-lg ${errors.phone ? 'is-invalid' : ''}`;
    const checkingShipFee = `form-control form-control-lg ${errors.shipFee ? 'is-invalid' : ''}`;
    const checkingTempFee = `form-control form-control-lg ${errors.tempFee ? 'is-invalid' : ''}`;
    const checkingNote = `form-control form-control-lg ${errors.note ? 'is-invalid' : ''}`;
    const checkingShopAddress = `form-control form-control-lg ${addressReceiveError ? 'is-invalid' : ''}`;
    const checkingShipAddress = `form-control form-control-lg ${errors.shipAddress ? 'is-invalid' : ''}`;

    ///////////////////////////////////////////////////
    // Handle submitForm
    const onSubmit = async (newPrice, notChange) => {
        const newAddress = { district: '', ward: '', address: '' };
        if (receiveAddress !== false) {
            if (
                receiveAddressRef.current.value === '' ||
                receiveWardRef.current.value === '' ||
                receiveDistrictRef.current.value === '' ||
                shipDistrcitRef.current.value === '' ||
                shipWardRef.current.value === ''
            ) {
                if (convertAddress(receiveAddressRef.current.value).split('').length < 5) {
                    setAddressReceiveError('Vui l??ng cung c???p s??? nh??, t??n ???????ng !');
                }
                if (receiveAddressRef.current.value === '') {
                    setAddressReceiveError('Vui l??ng cung c???p s??? nh??, t??n ???????ng !');
                }
                if (receiveWardRef.current.value === '') {
                    setWardReceiveError('Vui l??ng ch???n ph?????ng/x?? !');
                }
                if (receiveDistrictRef.current.value === '') {
                    setDistrictReceiveError('Vui l??ng ch???n qu???n/huy???n ');
                }
                if (shipDistrcitRef.current.value === '') {
                    setDistrictError('Vui l??ng ch???n qu???n/huy???n  !');
                }
                if (shipWardRef.current.value === '') {
                    setWardError('Vui l??ng ch???n ph?????ng/x??  !');
                }
                return;
            }
            newAddress.district = receiveDistrictRef.current.value;
            newAddress.ward = receiveWardRef.current.value;
            newAddress.address = convertAddress(receiveAddressRef.current.value);
        }

        if (shipDistrcitRef.current.value === '' || shipWardRef.current.value === '') {
            if (shipDistrcitRef.current.value === '') {
                setDistrictError('Vui l??ng ch???n qu???n/huy???n  !');
            }
            if (shipWardRef.current.value === '') {
                setWardError('Vui l??ng ch???n ph?????ng/x??  !');
            }
            return;
        }

        // console.log(convertString(customerRef.current.value).split('').length);

        if (convertString(customerRef.current.value).split('').length < 5) {
            return setFullnameError('Vui l??ng ki???m tra l???i t??n kh??ch h??ng !');
        }

        let code = random.generate({
            length: 4,
            charset: 'numeric',
        });

        //
        let shipFee = 0;

        if (Number.isInteger(newPrice) && newPrice !== 0) {
            shipFee = convertNewPrice(newPrice);
        } else {
            shipFee = reverseString(shipFeeRef.current.value); // 10 000
        }

        // Ki???m tra ti???n < 10000
        if (parseInt(shipFee.split(' ').join('')) < 10000) {
            return enqueueSnackbar('Chi ph?? giao h??ng t???i thi???u ph???i 10,000?? tr??? l??n !', { variant: 'info' });
        }

        const dataPostOrder = {
            idPost: idPost,
            noi_giao:
                convertAddress(shipAddressRef.current.value) +
                ', ' +
                shipWardRef.current.value +
                ', ' +
                shipDistrcitRef.current.value +
                ', Th??nh ph??? ???? N???ng',
            ghi_chu: noteRef.current.value,
            thoi_gian: dateTime,
            sdt_nguoi_nhan: numberRef.current.value,
            ten_nguoi_nhan: convertString(customerRef.current.value),
            phi_giao: shipFee,
            phi_ung: reverseString(depositFeeRef.current.value),
            id_roomchat: idChat,
            ma_bi_mat: code,
        };

        if (postOrder) {
            const check = await postOrder(dataPostOrder, newAddress, notChange);
            if (check !== 0) {
                setKm(check);
                setShow(true);
            }
        }
    };

    const handleDefaultAddressChange = (e) => {
        if (e.target.checked === true) {
            setReceiveAddress(false);
        } else {
            setReceiveAddress(true);
        }
    };

    const onHandleClose = () => {
        setShow(false);
    };

    return (
        <main className="d-flex flex-column flex-row-fluid wrapper">
            <Header />

            <section className="content d-flex flex-column flex-column-fluid">
                {/* core content */}
                <div className="core d-flex flex-column flex-row-fluid container">
                    {localStorage.getItem('role') === '2' && (
                        <Alert className="d-block alert alert-custom alert-light-secondary mb-5">
                            <Alert.Heading>T??i kho???n c???a b???n t???m th???i ??ang b??? kh??a</Alert.Heading>
                            <p>
                                <span className="mr-2">L?? do:</span>
                                <span>{localStorage.getItem('reason')}</span>
                            </p>
                            <hr />
                            <p className="mb-0">
                                <span className="mr-1">- B???n s??? kh??ng th??? ????ng ????n m???i cho ?????n</span>
                                <span className="mr-1 font-weight-bold text-blue">
                                    {moment.unix(localStorage.getItem('lock_time')).format('HH:mm:ss, DD/MM/YYYY')}
                                </span>
                                <br />
                                <span>
                                    - M???i v???n ????? th???c m???c, kh??ng ngh??? vui l??ng li??n h??? qua email{' '}
                                    <a href="mailto:help@thenightowl.team">
                                        <span className="text-brown">help@thenightowl.team</span>
                                    </a>{' '}
                                    ????? ???????c gi???i ????p !
                                </span>
                            </p>
                        </Alert>
                    )}
                    <div className="card card-custom card-sticky" id="on_page_sticky_card">
                        <form className="form" onSubmit={handleSubmit(onSubmit)}>
                            <header className="card-header py-3">
                                <div className="card-title align-items-start flex-column mb-2">
                                    <h3 className="card-label">????ng ????n</h3>
                                    <span className="text-muted font-size-sm mt-1">
                                        H??y t???o ????n m???i ngay b??y gi??? nh??!
                                    </span>
                                </div>
                                <div className="card-toolbar align-self-center">
                                    <button type="submit" className="btn btn-chartjs mr-2">
                                        ????ng ngay
                                    </button>
                                    <button type="reset" className="btn btn-light mr-2">
                                        L??m l???i
                                    </button>
                                </div>
                            </header>
                            {/* body card */}
                            <div className="card-body post-order">
                                {/* customer name */}
                                <div className="form-group row">
                                    <label htmlFor="fullname" className="col-xl-3 col-lg-4 col-form-label required">
                                        Kh??ch h??ng
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <input
                                            className={checkingFullname}
                                            type="text"
                                            {...register('fullname')}
                                            id="fullname"
                                            placeholder="T??n kh??ch h??ng"
                                            ref={customerRef}
                                        />
                                        <span className="form-text text-chartjs">{errors.fullname?.message}</span>
                                    </div>
                                </div>
                                {/* phone number */}
                                <div className="form-group row">
                                    <label
                                        htmlFor="phone_inputmask"
                                        className="col-xl-3 col-lg-4 col-form-label required"
                                    >
                                        S??? ??i???n tho???i
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <InputMask
                                            mask="9999 999 999"
                                            className={checkingPhone}
                                            type="text"
                                            {...register('phone')}
                                            id="phone_inputmask"
                                            placeholder="S??? ??i???n tho???i"
                                            ref={numberRef}
                                        />
                                        <span className="form-text text-chartjs">{errors.phone?.message}</span>
                                    </div>
                                </div>
                                {/* ship fee */}
                                <div className="form-group row">
                                    <label
                                        htmlFor="ship_inputmask"
                                        className="col-xl-3 col-lg-4 col-form-label required"
                                    >
                                        Chi ph?? giao h??ng
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <div className="input-group">
                                            <InputMask
                                                mask="000 999"
                                                maskChar=""
                                                type="text"
                                                className={checkingShipFee + ` rtl`}
                                                {...register('shipFee')}
                                                id="ship_inputmask"
                                                placeholder={0}
                                                ref={shipFeeRef}
                                                dir="rtl"
                                            />

                                            <div className="input-group-append">
                                                <span className="input-group-text">VND</span>
                                            </div>
                                        </div>
                                        <span
                                            className={classNames({
                                                'form-text': true,
                                                'text-chartjs': errors.shipFee?.message,
                                                'text-muted': !errors.shipFee?.message,
                                            })}
                                        >
                                            {errors.shipFee?.message
                                                ? errors.shipFee?.message
                                                : 'Chi ph?? giao h??ng t???i thi???u 10,000 ??, t???i ??a 999,000 ?? v?? l?? b???i s??? c???a 1,000 ??'}
                                        </span>
                                    </div>
                                </div>
                                {/* temp fee */}
                                <div className="form-group row">
                                    <label htmlFor="temp" className="col-xl-3 col-lg-4 col-form-label">
                                        T???m ???ng
                                    </label>
                                    <div className="col-xl-9 col-lg-8 input-group">
                                        <div className="input-group">
                                            <InputMask
                                                mask="000 999"
                                                maskChar=""
                                                className={checkingTempFee + `rtl`}
                                                {...register('tempFee')}
                                                id="temp_inputmask"
                                                placeholder={0}
                                                ref={depositFeeRef}
                                                dir="rtl"
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">VND</span>
                                            </div>
                                        </div>
                                        <span className="form-text text-muted">
                                            Gi?? tr??? t???m ???ng t???i ??a l?? 999,000?? v?? l?? b???i s??? c???a 1,000 ??
                                        </span>
                                    </div>
                                </div>
                                <div className="separator separator-dashed my-5" />
                                <div className="form-group row">
                                    <label htmlFor="note" className="col-xl-3 col-lg-4 col-form-label">
                                        Ghi ch??
                                    </label>
                                    <div className="col-xl-9 col-lg-8 input-group">
                                        <div className="input-group">
                                            <textarea
                                                className={checkingNote}
                                                id="note_maxlength"
                                                rows={3}
                                                {...register('note')}
                                                placeholder="Vi???t ghi ch?? cho shipper"
                                                ref={noteRef}
                                            />
                                        </div>
                                        <span className="form-text text-chartjs">{errors.note?.message}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-xl-3 col-lg-4" />
                                    <div className="col-xl-9 col-lg-8">
                                        <h5 className="font-weight-normal mt-0 mb-6">?????a ch??? l???y h??ng m???c ?????nh</h5>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-4 col-form-label"></label>
                                    <div className="col-xl-9 col-lg-8">
                                        <span className="switch switch-sm">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    defaultChecked="checked"
                                                    name="select"
                                                    onChange={handleDefaultAddressChange}
                                                />
                                                <span />
                                            </label>
                                        </span>
                                        <span className="form-text text-chartjs">
                                            {defaultAddressError && defaultAddressError}
                                        </span>
                                    </div>
                                </div>

                                <Expand open={receiveAddress}>
                                    <div className="row">
                                        <label className="col-xl-3 col-lg-4" />
                                        <div className="col-xl-9 col-lg-8">
                                            <h5 className="font-weight-normal mt-10 mb-6">Thay ?????i ?????a ch??? l???y h??ng</h5>
                                        </div>
                                    </div>
                                    {/* T???nh/Th??nh ph??? */}
                                    <div className="form-group row">
                                        <label htmlFor="city" className="col-xl-3 col-lg-4 col-form-label">
                                            T???nh/Th??nh ph???
                                        </label>
                                        <div className="col-xl-9 col-lg-8">
                                            <input
                                                className="form-control form-control-lg form-control-solid"
                                                type="text"
                                                id="city"
                                                defaultValue="Th??nh ph??? ???? N???ng"
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    {/* Huy???n */}
                                    <div className="form-group row">
                                        <label htmlFor="district" className="col-xl-3 col-lg-4 col-form-label required">
                                            Qu???n/Huy???n
                                        </label>
                                        <div className="col-xl-9 col-lg-8">
                                            <select
                                                className="form-control form-control-lg"
                                                id="district"
                                                value={districtReceive}
                                                ref={receiveDistrictRef}
                                                onChange={handleDistrictReceiveChange}
                                            >
                                                <option value="">Ch???n Qu???n/Huy???n</option>
                                                {districtList()}
                                            </select>
                                            <span className="form-text text-chartjs">
                                                {districtReceiveError && districtReceiveError}
                                            </span>
                                        </div>
                                    </div>

                                    {/* X?? */}
                                    <div className="form-group row">
                                        <label htmlFor="ward" className="col-xl-3 col-lg-4 col-form-label required">
                                            Ph?????ng/X??
                                        </label>
                                        <div className="col-xl-9 col-lg-8">
                                            <select
                                                className="form-control form-control-lg"
                                                id="ward"
                                                value={wardReceive}
                                                ref={receiveWardRef}
                                                onChange={(e) => {
                                                    setWardReceive(e.target.value);
                                                    setWardReceiveError('');
                                                }}
                                            >
                                                <option value="">Ch???n Ph?????ng/X??</option>
                                                {wardReceiveList()}
                                            </select>
                                            <span className="form-text text-chartjs">
                                                {wardReceiveError && wardReceiveError}
                                            </span>
                                        </div>
                                    </div>

                                    {/* ?????a ch??? */}
                                    <div className="form-group row">
                                        <label htmlFor="address" className="col-xl-3 col-lg-4 col-form-label required">
                                            ?????a ch???
                                        </label>
                                        <div className="col-xl-9 col-lg-8">
                                            <input
                                                className={checkingShopAddress}
                                                type="text"
                                                // {...register('shipAddress')}
                                                maxLength={50}
                                                id="address"
                                                placeholder="S??? nh??, t??n ???????ng"
                                                onChange={() => {
                                                    setAddressReceiveError('');
                                                }}
                                                ref={receiveAddressRef}
                                            />
                                            <span className="form-text text-chartjs">
                                                {addressReceiveError && addressReceiveError}
                                            </span>
                                        </div>
                                    </div>
                                </Expand>

                                <div className="row">
                                    <label className="col-xl-3 col-lg-4" />
                                    <div className="col-xl-9 col-lg-8">
                                        <h5 className="font-weight-normal mt-10 mb-6">?????a ch??? giao h??ng t???i</h5>
                                    </div>
                                </div>
                                {/* T???nh/Th??nh ph??? */}
                                <div className="form-group row">
                                    <label htmlFor="city" className="col-xl-3 col-lg-4 col-form-label">
                                        T???nh/Th??nh ph???
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <input
                                            className="form-control form-control-lg form-control-solid"
                                            type="text"
                                            id="city"
                                            defaultValue="Th??nh ph??? ???? N???ng"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                {/* Huy???n */}
                                <div className="form-group row">
                                    <label htmlFor="district" className="col-xl-3 col-lg-4 col-form-label required">
                                        Qu???n/Huy???n
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <select
                                            className="form-control form-control-lg"
                                            id="district"
                                            value={district}
                                            onChange={handleDistrictChange}
                                            ref={shipDistrcitRef}
                                        >
                                            <option value="">Ch???n Qu???n/Huy???n</option>
                                            {districtList()}
                                        </select>
                                        <span className="form-text text-chartjs">{districtError && districtError}</span>
                                    </div>
                                </div>
                                {/* X?? */}
                                <div className="form-group row">
                                    <label htmlFor="ward" className="col-xl-3 col-lg-4 col-form-label required">
                                        Ph?????ng/X??
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <select
                                            className="form-control form-control-lg"
                                            id="ward"
                                            value={ward}
                                            onChange={(e) => {
                                                setWard(e.target.value);
                                                setWardError('');
                                            }}
                                            ref={shipWardRef}
                                        >
                                            <option value="">Ch???n Ph?????ng/X??</option>
                                            {wardList()}
                                        </select>
                                        <span className="form-text text-chartjs">{wardError && wardError}</span>
                                    </div>
                                </div>
                                {/* ?????a ch??? */}
                                <div className="form-group row">
                                    <label htmlFor="address" className="col-xl-3 col-lg-4 col-form-label required">
                                        ?????a ch???
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <input
                                            className={checkingShipAddress}
                                            type="text"
                                            {...register('shipAddress')}
                                            maxLength={50}
                                            id="address"
                                            placeholder="S??? nh??, t??n ???????ng"
                                            ref={shipAddressRef}
                                        />
                                        <span className="form-text text-chartjs">{errors.shipAddress?.message}</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <FeeRec km={km} show={show} onHandleClose={onHandleClose} onSubmit={onSubmit} />

            <Footer />
        </main>
    );
}

export default MainPostOrder;
