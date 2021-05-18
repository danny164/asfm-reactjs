import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../assets/media/avatar.png';
import Footer from '../common/Footer';
import Header from '../common/Header';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import { uploadImage, getDownloadUrl } from '../../context/Upload';
import ProgressBar from 'react-bootstrap/ProgressBar';

EditProfile.propTypes = {
    user: PropTypes.object,
    edit: PropTypes.func,
};

EditProfile.defaultProps = {
    user: null,
    edit: null,
};

const dataList = {
    'Quận Cẩm Lệ': ['Phường Hòa An', 'Phường Hòa Phát', 'Phường Hòa Thọ Đông', 'Phường Hòa Thọ Tây', 'Phường Hòa Xuân', 'Phường Khuê Trung'],
    'Quận Hải Châu': [
        'Phường Bình Hiên',
        'Phường Bình Thuận',
        'Phường Hải Châu 1',
        'Phường Hải Châu 2',
        'Phường Hòa Cường Bắc',
        'Phường Hòa Cường Nam',
        'Phường Hòa Thuận Đông',
        'Phường Hòa Thuận Tây',
        'Phường Nam Dương',
        'Phường Phước Ninh',
        'Phường Thạch Thang',
        'Phường Thạnh Bình',
        'Phường Thuận Phước',
    ],
    'Quận Liên Chiểu': ['Phường Hòa Hiệp Bắc', 'Phường Hòa Hiệp Nam', 'Phường Hòa Khánh Bắc', 'Phường Hòa Khánh Nam', 'Phường Hòa Minh'],
    'Quận Ngũ Hành Sơn': ['Phường Hòa Hải', 'Phường Hòa Quý', 'Phường Khuê Mỹ', 'Phường Mỹ An'],
    'Quận Sơn Trà': [
        'Phường An Hải Bắc',
        'Phường An Hải Đông',
        'Phường An Hải Tây',
        'Phường Mân Thái',
        'Phường Nại Hiên Đông',
        'Phường Phước Mỹ',
        'Phường Thọ Quang',
    ],
    'Quận Thanh Khê': [
        'Phường An Khê',
        'Phường Chính Gián',
        'Phường Hòa Khê',
        'Phường Tam Thuận',
        'Phường Tân Chính',
        'Phường Thạc Gián',
        'Phường Thanh Khê Đông',
        'Phường Thanh Khê Tây',
        'Phường Vĩnh Trung',
        'Phường Xuân Hà',
    ],
    'Huyện Hòa Vang': [
        'Xã Hòa Bắc',
        'Xã Hòa Châu',
        'Xã Hòa Khương',
        'Xã Hòa Liên',
        'Xã Hòa Nhơn',
        'Xã Hòa Ninh',
        'Xã Hòa Phong',
        'Xã Hòa Phú',
        'Xã Hòa Phước',
        'Xã Hòa Sơn',
        'Xã Hòa Tiến',
    ],
};

var save = '';
function EditProfile(props) {
    const { user, edit } = props;

    const fullNameRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();
    const wardRef = useRef();
    const districtRef = useRef();

    const fileInput = useRef(null);
    const [imageUrl, setImageUrl] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [fullNameEmpty, setFullNameEmpty] = useState();
    const [phoneEmpty, setPhoneEmpty] = useState();
    const [addressEmpty, setAddressEmpty] = useState();

    useEffect(() => {
        getDownloadUrl(user.uid).then((url) => {
            !!url && setImageUrl(url);
        });
    }, [user.uid]);

    const fileChange = async (files) => {
        if (files.length === 0) return;

        const ref = await uploadImage(user.uid, files[0], updateProgress);
        const downloadUrl = await ref.getDownloadURL();
        setImageUrl(downloadUrl);
    };

    const updateProgress = (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
    };

    //////////////////////////////////////////////////////
    const [district, setDistrict] = useState();
    const [ward, setWard] = useState();

    //////////////////////////////////////////////////////
    // ! Danh sách Quận
    //////////////////////////////////////////////////////
    const districtList = () => {
        const items = [];

        for (const district in dataList) {
            if (user.input.district) {
                if (user.input.district === district) {
                    save = user.input.district;
                    items.push(
                        <option selected="selected" value={district}>
                            {district}
                        </option>
                    );
                } else {
                    items.push(<option value={district}>{district}</option>);
                }
            } else {
                items.push(<option value={district}>{district}</option>);
            }
        }
        return items;
    };

    //////////////////////////////////////////////////////
    // ! Danh sách Phường
    //////////////////////////////////////////////////////
    const wardList = () => {
        const items = [];
        if (user.input.district) {
            if (save === user.input.district) {
                Object.values(dataList[save]).map((data, index) => {
                    if (user.input.ward === data) {
                        items.push(
                            <option selected="selected" key={index} value={data}>
                                {data}
                            </option>
                        );
                    } else {
                        items.push(
                            <option key={index} value={data}>
                                {data}
                            </option>
                        );
                    }
                });
            } else {
                if (!district) return;
                else {
                    Object.values(dataList[district]).map((data, index) => {
                        items.push(
                            <option key={index} value={data}>
                                {data}
                            </option>
                        );
                    });
                }
            }
        } else {
            if (!district) return;
            else {
                Object.values(dataList[district]).map((data, index) => {
                    items.push(
                        <option key={index} value={data}>
                            {data}
                        </option>
                    );
                });
            }
        }
        return items;
    };

    //////////////////////////////////////////////////////
    // ! Reset old selection
    //////////////////////////////////////////////////////
    const handleDistrictChange = (e) => {
        user.input.district = ' ';
        if (e.target.value || e.target.value === '') {
            setDistrict(e.target.value);
            setWard('');
        }
    };

    //////////////////////////////////////////////////////

    const schema = yup.object().shape({
        fullname: yup.string().max(50, 'Vượt quá ${max} kí tự được cho phép').min(5, 'Tối thiểu ${min} kí tự'),
        phone: yup.string().matches(/^[0-9\s]+$/, 'Định dạng không hợp lệ'),
        address: yup.string().max(50, 'Vượt quá ${max} kí tự được cho phép'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    ////////////////////////////////////
    const onSubmit = async (e) => {
        if (fullNameRef.current.value === '' && phoneRef.current.value === '' && addressRef.current.value === '') {
            setFullNameEmpty('Vui lòng nhập họ và tên của bạn !');
            setAddressEmpty('Vui lòng cung cấp số nhà, tên đường !');
            return setPhoneEmpty('Vui lòng điền số điện thoại của bạn !');
        }

        if (fullNameRef.current.value === '') {
            return setFullNameEmpty('Vui lòng nhập họ và tên của bạn !');
        }

        if (phoneRef.current.value === '') {
            return setPhoneEmpty('Vui lòng điền số điện thoại của bạn !');
        }

        if (addressRef.current.value === '') {
            return setAddressEmpty('Vui lòng cung cấp số nhà, tên đường !');
        }

        await edit(
            fullNameRef.current.value,
            phoneRef.current.value,
            addressRef.current.value + ', ' + wardRef.current.value + ', ' + districtRef.current.value + ', Thành phố Đà Nẵng',
            districtRef.current.value,
            wardRef.current.value,
            addressRef.current.value
        );
    };

    const checkingFullname = `form-control form-control-lg ${errors.fullname ? 'is-invalid' : ''}`;
    const checkingPhone = `form-control form-control-lg ${errors.phone ? 'is-invalid' : ''}`;
    const checkingAddress = `form-control form-control-lg ${errors.address ? 'is-invalid' : ''}`;

    return (
        <main className="d-flex flex-column flex-row-fluid wrapper">
            <Header />
            <section className="content d-flex flex-column flex-column-fluid">
                {/* subheader */}
                <div className="subheader py-2 py-lg-6 subheader-transparent">
                    <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                        {/* wrap breadcrumb */}
                        <div className="d-flex align-items-center flex-wrap mr-1">
                            <div className="d-flex align-items-baseline flex-wrap mr-5">
                                <h5 className="text-dark font-weight-bold my-1 mr-5">Cài đặt tài khoản</h5>
                                {/* breadcrumb */}
                                <ul className="breadcrumb font-weight-bold p-0 my-2 font-size-sm">
                                    <li className="breadcrumb-item">
                                        <Link to="/home" className="text-muted">
                                            Trang chủ
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        <Link to="/profile" className="text-muted">
                                            Xem hồ sơ
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* end wrap breadcrumb */}
                        {/* tool bars */}
                        {/* <div class="d-flex align-items-center">
                        </div> */}
                    </div>
                </div>
                <div className="core d-flex flex-column flex-row-fluid container">
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="card card-custom">
                            <header className="card-header py-3">
                                <div className="card-title align-items-start flex-column">
                                    <h3 className="card-label">Thông tin cá nhân</h3>
                                    <span className="text-muted font-size-sm mt-1">Cập nhật thông tin cá nhân của bạn</span>
                                </div>
                                <div className="card-toolbar">
                                    <button type="submit" className="btn btn-chartjs mr-2">
                                        Lưu thay đổi
                                    </button>
                                </div>
                            </header>
                            <div className="card-body">
                                {/* avatar */}
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-4 col-form-label">Ảnh đại diện</label>
                                    <div className="col-xl-9 col-lg-8">
                                        <div
                                            className="image-input image-input-outline"
                                            id="profile_avatar"
                                            style={{
                                                backgroundImage: `url(${(imageUrl === '' ? localStorage.getItem('imageUrl') : imageUrl) || Avatar})`,
                                            }}
                                        >
                                            <div className="image-input-wrapper" />

                                            <label
                                                className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                                                data-action="change"
                                                data-toggle="tooltip"
                                                data-original-title="Change avatar"
                                            >
                                                <i className="fa fa-pen icon-sm text-muted" />
                                                <input
                                                    type="file"
                                                    name="profile_avatar"
                                                    accept=".png, .jpg, .jpeg"
                                                    ref={fileInput}
                                                    onChange={(e) => fileChange(e.target.files)}
                                                />
                                            </label>
                                        </div>
                                        <div>
                                            <ProgressBar
                                                animated
                                                striped
                                                variant="success"
                                                now={uploadProgress}
                                                style={{ width: '120px', height: '4px' }}
                                            />
                                            <span className="form-text text-muted">Định dạng cho phép: png, jpg, jpeg.</span>
                                        </div>
                                    </div>
                                </div>
                                {/* email */}
                                <div className="form-group row">
                                    <label htmlFor="email" className="col-xl-3 col-lg-4 col-form-label">
                                        Email
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <input
                                            className="form-control form-control-lg"
                                            type="email"
                                            id="email"
                                            placeholder="Địa chỉ email"
                                            defaultValue={user.email}
                                            readOnly
                                        />
                                        {/* <span class="form-text text-muted">Some help content goes here</span> */}
                                    </div>
                                </div>
                                {/* full name */}
                                <div className="form-group row">
                                    <label htmlFor="fullname" className="col-xl-3 col-lg-4 col-form-label">
                                        Họ và tên
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <input
                                            className={checkingFullname}
                                            type="text"
                                            id="fullname"
                                            placeholder="Vui lòng nhập họ và tên của bạn"
                                            defaultValue={user.input.fullname}
                                            {...register('fullname')}
                                            ref={fullNameRef}
                                        />
                                        <span className="form-text text-muted text-chartjs">{errors.fullname?.message}</span>
                                        <span className="form-text text-muted text-chartjs">{fullNameEmpty !== '' && fullNameEmpty}</span>
                                    </div>
                                </div>
                                <div className="separator separator-dashed my-5" />
                                {/* phone number */}
                                <div className="form-group row">
                                    <label htmlFor="phone" className="col-xl-3 col-lg-4 col-form-label">
                                        Số điện thoại
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <InputMask
                                            mask="9999 999 999"
                                            className={checkingPhone}
                                            type="text"
                                            id="phone"
                                            placeholder="Số điện thoại của bạn"
                                            defaultValue={user.input.phone}
                                            {...register('phone')}
                                            ref={phoneRef}
                                        />
                                        <span className="form-text text-muted text-chartjs">{errors.phone?.message}</span>{' '}
                                        <span className="form-text text-muted text-chartjs">{phoneEmpty !== '' && phoneEmpty}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="col-xl-3 col-lg-4" />
                                    <div className="col-xl-9 col-lg-8">
                                        <h5 className="font-weight-normal mt-10 mb-6">Địa chỉ</h5>
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
                                    <label htmlFor="district" className="col-xl-3 col-lg-4 col-form-label">
                                        Quận/Huyện
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <select
                                            className="form-control form-control-lg"
                                            id="district"
                                            onClick={handleDistrictChange}
                                            ref={districtRef}
                                        >
                                            <option value="">Chọn Quận/Huyện</option>
                                            {districtList()}
                                        </select>
                                        <span className="form-text text-muted text-chartjs"></span>
                                    </div>
                                </div>

                                {/* Xã */}
                                <div className="form-group row">
                                    <label htmlFor="ward" className="col-xl-3 col-lg-4 col-form-label">
                                        Phường/Xã
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <select
                                            className="form-control form-control-lg"
                                            id="ward"
                                            onClick={(e) => setWard(e.target.value)}
                                            ref={wardRef}
                                        >
                                            <option value="">Chọn Phường/Xã</option>
                                            {wardList()}
                                        </select>
                                        <span className="form-text text-muted text-chartjs"></span>
                                    </div>
                                </div>

                                {/* Địa chỉ */}
                                <div className="form-group row">
                                    <label htmlFor="address" className="col-xl-3 col-lg-4 col-form-label">
                                        Địa chỉ
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <input
                                            className={checkingAddress}
                                            type="text"
                                            defaultValue={user.input.detailAddress}
                                            {...register('address')}
                                            maxLength={50}
                                            id="address"
                                            placeholder="Số nhà, tên đường"
                                            ref={addressRef}
                                        />
                                        <span className="form-text text-muted text-chartjs">{errors.address?.message}</span>
                                        <span className="form-text text-muted text-chartjs">{addressEmpty !== '' && addressEmpty}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default EditProfile;
