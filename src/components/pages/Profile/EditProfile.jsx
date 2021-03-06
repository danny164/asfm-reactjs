import { yupResolver } from '@hookform/resolvers/yup';
import Avatar from 'assets/media/avatar.png';
import { getDownloadUrl, uploadImage } from 'context/Upload';
import { convertAddress } from 'convert/Address';
import { convertString } from 'convert/String';
import { dataList } from 'data/dataList';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { useHistory } from 'react-router';
import * as yup from 'yup';

EditProfile.propTypes = {
    user: PropTypes.object,
    edit: PropTypes.func,
};

EditProfile.defaultProps = {
    user: null,
    edit: null,
};

var save = '';
function EditProfile(props) {
    const { user, edit } = props;

    const history = useHistory();

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

    const { enqueueSnackbar } = useSnackbar();

    //get image
    useEffect(() => {
        try {
            getDownloadUrl(user.uid).then((url) => !!url && setImageUrl(url));
        } catch (err) {
            console.log(err);
        }
    }, []);

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

    useEffect(() => {
        if (uploadProgress === 100) {
            enqueueSnackbar('Upload avatar th??nh c??ng !', { variant: 'success' });
        }
    }, [uploadProgress]);

    //////////////////////////////////////////////////////
    const [district, setDistrict] = useState();
    const [ward, setWard] = useState();

    //////////////////////////////////////////////////////
    // ! Danh s??ch Qu???n
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
    // ! Danh s??ch Ph?????ng
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
        fullname: yup.string().max(50, 'V?????t qu?? ${max} k?? t??? ???????c cho ph??p').min(5, 'T???i thi???u ${min} k?? t???'),
        phone: yup.string().matches(/^[0-9\s]+$/, '?????nh d???ng kh??ng h???p l???'),
        address: yup.string().max(50, 'V?????t qu?? ${max} k?? t??? ???????c cho ph??p').min(5, 'T???i thi???u ${min} k?? t???'),
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
            setFullNameEmpty('Vui l??ng nh???p h??? v?? t??n c???a b???n !');
            setAddressEmpty('Vui l??ng cung c???p s??? nh??, t??n ???????ng !');
            return setPhoneEmpty('Vui l??ng ??i???n s??? ??i???n tho???i c???a b???n !');
        }

        if (convertString(fullNameRef.current.value).split('').length < 5) {
            return setFullNameEmpty('Vui l??ng nh???p h??? v?? t??n c???a b???n !');
        }

        if (phoneRef.current.value === '') {
            return setPhoneEmpty('Vui l??ng ??i???n s??? ??i???n tho???i c???a b???n !');
        }

        if (convertAddress(addressRef.current.value).split('').length < 5) {
            return setAddressEmpty('Vui l??ng cung c???p s??? nh??, t??n ???????ng !');
        }

        await edit(
            convertString(fullNameRef.current.value),
            phoneRef.current.value,
            convertAddress(addressRef.current.value) +
                ', ' +
                wardRef.current.value +
                ', ' +
                districtRef.current.value +
                ', Th??nh ph??? ???? N???ng',
            districtRef.current.value,
            wardRef.current.value,
            convertAddress(addressRef.current.value)
        );

        enqueueSnackbar('C???p nh???t th??nh c??ng', { variant: 'success' });
        history.push('/profile');
    };

    const checkingFullname = `form-control form-control-lg ${errors.fullname ? 'is-invalid' : ''}`;
    const checkingPhone = `form-control form-control-lg ${errors.phone ? 'is-invalid' : ''}`;
    const checkingAddress = `form-control form-control-lg ${errors.address ? 'is-invalid' : ''}`;

    return (
        <>
            <div className="core d-flex flex-column flex-row-fluid container">
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="card card-custom">
                        <header className="card-header py-3">
                            <div className="card-title align-items-start flex-column">
                                <h3 className="card-label">Th??ng tin c?? nh??n</h3>
                                <span className="text-muted font-size-sm mt-1">C???p nh???t th??ng tin c?? nh??n c???a b???n</span>
                            </div>
                            <div className="card-toolbar">
                                <button type="submit" className="btn btn-chartjs mr-2">
                                    L??u thay ?????i
                                </button>
                            </div>
                        </header>
                        <div className="card-body">
                            {/* avatar */}
                            <div className="form-group row">
                                <label className="col-xl-3 col-lg-4 col-form-label">???nh ?????i di???n</label>
                                <div className="col-xl-9 col-lg-8">
                                    <div
                                        className="image-input image-input-outline"
                                        id="profile_avatar"
                                        style={{
                                            backgroundImage: `url(${
                                                (imageUrl === '' ? localStorage.getItem('imageUrl') : imageUrl) ||
                                                Avatar
                                            })`,
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
                                        <span className="form-text text-muted">
                                            ?????nh d???ng cho ph??p: png, jpg, jpeg.
                                        </span>
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
                                        className="form-control form-control-lg form-control-solid"
                                        type="email"
                                        id="email"
                                        placeholder="?????a ch??? email"
                                        defaultValue={user.email}
                                        readOnly
                                    />
                                </div>
                            </div>
                            {/* full name */}
                            <div className="form-group row">
                                <label htmlFor="fullname" className="col-xl-3 col-lg-4 col-form-label">
                                    H??? v?? t??n
                                </label>
                                <div className="col-xl-9 col-lg-8">
                                    <input
                                        className={checkingFullname}
                                        type="text"
                                        id="fullname"
                                        placeholder="Vui l??ng nh???p h??? v?? t??n c???a b???n"
                                        defaultValue={user.input.fullname}
                                        {...register('fullname')}
                                        ref={fullNameRef}
                                    />
                                    <span className="form-text text-chartjs">{errors.fullname?.message}</span>
                                    <span className="form-text text-chartjs">
                                        {fullNameEmpty !== '' && fullNameEmpty}
                                    </span>
                                </div>
                            </div>
                            <div className="separator separator-dashed my-5" />
                            {/* phone number */}
                            <div className="form-group row">
                                <label htmlFor="phone" className="col-xl-3 col-lg-4 col-form-label">
                                    S??? ??i???n tho???i
                                </label>
                                <div className="col-xl-9 col-lg-8">
                                    <InputMask
                                        mask="9999 999 999"
                                        className={checkingPhone}
                                        type="text"
                                        id="phone"
                                        placeholder="S??? ??i???n tho???i c???a b???n"
                                        defaultValue={user.input.phone}
                                        {...register('phone')}
                                        ref={phoneRef}
                                    />
                                    <span className="form-text text-chartjs">{errors.phone?.message}</span>{' '}
                                    <span className="form-text text-chartjs">{phoneEmpty !== '' && phoneEmpty}</span>
                                </div>
                            </div>
                            <div className="row">
                                <label className="col-xl-3 col-lg-4" />
                                <div className="col-xl-9 col-lg-8">
                                    <h5 className="font-weight-normal mt-10 mb-6">?????a ch???</h5>
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
                                <label htmlFor="district" className="col-xl-3 col-lg-4 col-form-label">
                                    Qu???n/Huy???n
                                </label>
                                <div className="col-xl-9 col-lg-8">
                                    <select
                                        className="form-control form-control-lg"
                                        id="district"
                                        onClick={handleDistrictChange}
                                        ref={districtRef}
                                    >
                                        <option value="">Ch???n Qu???n/Huy???n</option>
                                        {districtList()}
                                    </select>
                                    <span className="form-text text-chartjs"></span>
                                </div>
                            </div>

                            {/* X?? */}
                            <div className="form-group row">
                                <label htmlFor="ward" className="col-xl-3 col-lg-4 col-form-label">
                                    Ph?????ng/X??
                                </label>
                                <div className="col-xl-9 col-lg-8">
                                    <select
                                        className="form-control form-control-lg"
                                        id="ward"
                                        onClick={(e) => setWard(e.target.value)}
                                        ref={wardRef}
                                    >
                                        <option value="">Ch???n Ph?????ng/X??</option>
                                        {wardList()}
                                    </select>
                                    <span className="form-text text-chartjs"></span>
                                </div>
                            </div>

                            {/* ?????a ch??? */}
                            <div className="form-group row">
                                <label htmlFor="address" className="col-xl-3 col-lg-4 col-form-label">
                                    ?????a ch???
                                </label>
                                <div className="col-xl-9 col-lg-8">
                                    <input
                                        className={checkingAddress}
                                        type="text"
                                        defaultValue={user.input.detailAddress}
                                        {...register('address')}
                                        maxLength={50}
                                        id="address"
                                        placeholder="S??? nh??, t??n ???????ng"
                                        ref={addressRef}
                                    />
                                    <span className="form-text text-chartjs">{errors.address?.message}</span>
                                    <span className="form-text text-chartjs">
                                        {addressEmpty !== '' && addressEmpty}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditProfile;
