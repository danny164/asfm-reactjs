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
    // ! Danh sách Quận
    //////////////////////////////////////////////////////
    const districtList = () => {
        const items = [];

        for (const district in dataList) {
            items.push(<option value={district}>{district}</option>);
        }
        return items;
    };

    //////////////////////////////////////////////////////
    // ! Danh sách Phường
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
            .required('Vui lòng điền tên khách hàng')
            .max(50, 'Vượt quá ${max} kí tự được cho phép')
            .min(5, 'Tối thiểu ${min} kí tự'),
        phone: yup
            .string()
            .matches(/^[0-9\s]+$/, 'Định dạng không hợp lệ')
            .required('Vui lòng điền số điện thoại khách hàng'),
        shipFee: yup.string().required('Vui lòng nhập phí giao hàng bạn muốn trả'),
        tempFee: yup.string(),
        note: yup.string().max(100, 'Vượt quá ${max} kí tự được cho phép'),
        shipAddress: yup
            .string()
            .max(50, 'Vượt quá ${max} kí tự được cho phép')
            .min(5, 'Tối thiểu ${min} kí tự')
            .required('Vui lòng cung cấp số nhà, tên đường'),
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
                    setAddressReceiveError('Vui lòng cung cấp số nhà, tên đường !');
                }
                if (receiveAddressRef.current.value === '') {
                    setAddressReceiveError('Vui lòng cung cấp số nhà, tên đường !');
                }
                if (receiveWardRef.current.value === '') {
                    setWardReceiveError('Vui lòng chọn phường/xã !');
                }
                if (receiveDistrictRef.current.value === '') {
                    setDistrictReceiveError('Vui lòng chọn quận/huyện ');
                }
                if (shipDistrcitRef.current.value === '') {
                    setDistrictError('Vui lòng chọn quận/huyện  !');
                }
                if (shipWardRef.current.value === '') {
                    setWardError('Vui lòng chọn phường/xã  !');
                }
                return;
            }
            newAddress.district = receiveDistrictRef.current.value;
            newAddress.ward = receiveWardRef.current.value;
            newAddress.address = convertAddress(receiveAddressRef.current.value);
        }

        if (shipDistrcitRef.current.value === '' || shipWardRef.current.value === '') {
            if (shipDistrcitRef.current.value === '') {
                setDistrictError('Vui lòng chọn quận/huyện  !');
            }
            if (shipWardRef.current.value === '') {
                setWardError('Vui lòng chọn phường/xã  !');
            }
            return;
        }

        // console.log(convertString(customerRef.current.value).split('').length);

        if (convertString(customerRef.current.value).split('').length < 5) {
            return setFullnameError('Vui lòng kiểm tra lại tên khách hàng !');
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

        // Kiểm tra tiền < 10000
        if (parseInt(shipFee.split(' ').join('')) < 10000) {
            return enqueueSnackbar('Chi phí giao hàng tối thiểu phải 10,000đ trở lên !', { variant: 'info' });
        }

        const dataPostOrder = {
            idPost: idPost,
            noi_giao:
                convertAddress(shipAddressRef.current.value) +
                ', ' +
                shipWardRef.current.value +
                ', ' +
                shipDistrcitRef.current.value +
                ', Thành phố Đà Nẵng',
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
                            <Alert.Heading>Tài khoản của bạn tạm thời đang bị khóa</Alert.Heading>
                            <p>
                                <span className="mr-2">Lý do:</span>
                                <span>{localStorage.getItem('reason')}</span>
                            </p>
                            <hr />
                            <p className="mb-0">
                                <span className="mr-1">- Bạn sẽ không thể đăng đơn mới cho đến</span>
                                <span className="mr-1 font-weight-bold text-blue">
                                    {moment.unix(localStorage.getItem('lock_time')).format('HH:mm:ss, DD/MM/YYYY')}
                                </span>
                                <br />
                                <span>
                                    - Mọi vấn đề thắc mắc, kháng nghị vui lòng liên hệ qua email{' '}
                                    <a href="mailto:help@thenightowl.team">
                                        <span className="text-brown">help@thenightowl.team</span>
                                    </a>{' '}
                                    để được giải đáp !
                                </span>
                            </p>
                        </Alert>
                    )}
                    <div className="card card-custom card-sticky" id="on_page_sticky_card">
                        <form className="form" onSubmit={handleSubmit(onSubmit)}>
                            <header className="card-header py-3">
                                <div className="card-title align-items-start flex-column mb-2">
                                    <h3 className="card-label">Đăng đơn</h3>
                                    <span className="text-muted font-size-sm mt-1">
                                        Hãy tạo đơn mới ngay bây giờ nhé!
                                    </span>
                                </div>
                                <div className="card-toolbar align-self-center">
                                    <button type="submit" className="btn btn-chartjs mr-2">
                                        Đăng ngay
                                    </button>
                                    <button type="reset" className="btn btn-light mr-2">
                                        Làm lại
                                    </button>
                                </div>
                            </header>
                            {/* body card */}
                            <div className="card-body post-order">
                                {/* customer name */}
                                <div className="form-group row">
                                    <label htmlFor="fullname" className="col-xl-3 col-lg-4 col-form-label required">
                                        Khách hàng
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <input
                                            className={checkingFullname}
                                            type="text"
                                            {...register('fullname')}
                                            id="fullname"
                                            placeholder="Tên khách hàng"
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
                                        Số điện thoại
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <InputMask
                                            mask="9999 999 999"
                                            className={checkingPhone}
                                            type="text"
                                            {...register('phone')}
                                            id="phone_inputmask"
                                            placeholder="Số điện thoại"
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
                                        Chi phí giao hàng
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
                                                : 'Chi phí giao hàng tối thiểu 10,000 đ, tối đa 999,000 đ và là bội số của 1,000 đ'}
                                        </span>
                                    </div>
                                </div>
                                {/* temp fee */}
                                <div className="form-group row">
                                    <label htmlFor="temp" className="col-xl-3 col-lg-4 col-form-label">
                                        Tạm ứng
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
                                            Giá trị tạm ứng tối đa là 999,000đ và là bội số của 1,000 đ
                                        </span>
                                    </div>
                                </div>
                                <div className="separator separator-dashed my-5" />
                                <div className="form-group row">
                                    <label htmlFor="note" className="col-xl-3 col-lg-4 col-form-label">
                                        Ghi chú
                                    </label>
                                    <div className="col-xl-9 col-lg-8 input-group">
                                        <div className="input-group">
                                            <textarea
                                                className={checkingNote}
                                                id="note_maxlength"
                                                rows={3}
                                                {...register('note')}
                                                placeholder="Viết ghi chú cho shipper"
                                                ref={noteRef}
                                            />
                                        </div>
                                        <span className="form-text text-chartjs">{errors.note?.message}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-xl-3 col-lg-4" />
                                    <div className="col-xl-9 col-lg-8">
                                        <h5 className="font-weight-normal mt-0 mb-6">Địa chỉ lấy hàng mặc định</h5>
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
                                            <h5 className="font-weight-normal mt-10 mb-6">Thay đổi địa chỉ lấy hàng</h5>
                                        </div>
                                    </div>
                                    {/* Tỉnh/Thành phố */}
                                    <div className="form-group row">
                                        <label htmlFor="city" className="col-xl-3 col-lg-4 col-form-label">
                                            Tỉnh/Thành phố
                                        </label>
                                        <div className="col-xl-9 col-lg-8">
                                            <input
                                                className="form-control form-control-lg form-control-solid"
                                                type="text"
                                                id="city"
                                                defaultValue="Thành phố Đà Nẵng"
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    {/* Huyện */}
                                    <div className="form-group row">
                                        <label htmlFor="district" className="col-xl-3 col-lg-4 col-form-label required">
                                            Quận/Huyện
                                        </label>
                                        <div className="col-xl-9 col-lg-8">
                                            <select
                                                className="form-control form-control-lg"
                                                id="district"
                                                value={districtReceive}
                                                ref={receiveDistrictRef}
                                                onChange={handleDistrictReceiveChange}
                                            >
                                                <option value="">Chọn Quận/Huyện</option>
                                                {districtList()}
                                            </select>
                                            <span className="form-text text-chartjs">
                                                {districtReceiveError && districtReceiveError}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Xã */}
                                    <div className="form-group row">
                                        <label htmlFor="ward" className="col-xl-3 col-lg-4 col-form-label required">
                                            Phường/Xã
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
                                                <option value="">Chọn Phường/Xã</option>
                                                {wardReceiveList()}
                                            </select>
                                            <span className="form-text text-chartjs">
                                                {wardReceiveError && wardReceiveError}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Địa chỉ */}
                                    <div className="form-group row">
                                        <label htmlFor="address" className="col-xl-3 col-lg-4 col-form-label required">
                                            Địa chỉ
                                        </label>
                                        <div className="col-xl-9 col-lg-8">
                                            <input
                                                className={checkingShopAddress}
                                                type="text"
                                                // {...register('shipAddress')}
                                                maxLength={50}
                                                id="address"
                                                placeholder="Số nhà, tên đường"
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
                                        <h5 className="font-weight-normal mt-10 mb-6">Địa chỉ giao hàng tới</h5>
                                    </div>
                                </div>
                                {/* Tỉnh/Thành phố */}
                                <div className="form-group row">
                                    <label htmlFor="city" className="col-xl-3 col-lg-4 col-form-label">
                                        Tỉnh/Thành phố
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <input
                                            className="form-control form-control-lg form-control-solid"
                                            type="text"
                                            id="city"
                                            defaultValue="Thành phố Đà Nẵng"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                {/* Huyện */}
                                <div className="form-group row">
                                    <label htmlFor="district" className="col-xl-3 col-lg-4 col-form-label required">
                                        Quận/Huyện
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <select
                                            className="form-control form-control-lg"
                                            id="district"
                                            value={district}
                                            onChange={handleDistrictChange}
                                            ref={shipDistrcitRef}
                                        >
                                            <option value="">Chọn Quận/Huyện</option>
                                            {districtList()}
                                        </select>
                                        <span className="form-text text-chartjs">{districtError && districtError}</span>
                                    </div>
                                </div>
                                {/* Xã */}
                                <div className="form-group row">
                                    <label htmlFor="ward" className="col-xl-3 col-lg-4 col-form-label required">
                                        Phường/Xã
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
                                            <option value="">Chọn Phường/Xã</option>
                                            {wardList()}
                                        </select>
                                        <span className="form-text text-chartjs">{wardError && wardError}</span>
                                    </div>
                                </div>
                                {/* Địa chỉ */}
                                <div className="form-group row">
                                    <label htmlFor="address" className="col-xl-3 col-lg-4 col-form-label required">
                                        Địa chỉ
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <input
                                            className={checkingShipAddress}
                                            type="text"
                                            {...register('shipAddress')}
                                            maxLength={50}
                                            id="address"
                                            placeholder="Số nhà, tên đường"
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
