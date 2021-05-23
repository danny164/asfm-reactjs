import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'assets/media/avatar.png';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

InfoProfile.propTypes = {
    imageUrl: PropTypes.string,
    user: PropTypes.object,
};
InfoProfile.propTypes = {
    imageUrl: '',
    user: null,
};

function InfoProfile(props) {
    const { imageUrl, user } = props;
    const { url } = useRouteMatch();
    return (
        <>
            <div className="core d-flex flex-column flex-row-fluid container">
                <form className="form">
                    <div className="card card-custom">
                        <header className="card-header py-3">
                            <div className="card-title align-items-start flex-column">
                                <h3 className="card-label">Thông tin cá nhân</h3>
                                <span className="text-muted font-size-sm mt-1">Cập nhật thông tin cá nhân của bạn</span>
                            </div>
                            <div className="card-toolbar">
                                <Link to={`${url}/edit`} className="btn btn-chartjs mr-2">
                                    Chỉnh sửa
                                </Link>
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
                                        placeholder="(trống)"
                                        value={user.email}
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
                                        className="form-control form-control-lg form-control-solid"
                                        type="text"
                                        id="fullname"
                                        placeholder="(trống)"
                                        value={user.input.fullname}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="separator separator-dashed my-5" />
                            {/* phone number */}
                            <div className="form-group row">
                                <label htmlFor="phone" className="col-xl-3 col-lg-4 col-form-label">
                                    Số điện thoại
                                </label>
                                <div className="col-xl-9 col-lg-8">
                                    <input
                                        className="form-control form-control-lg form-control-solid"
                                        type="text"
                                        id="phone"
                                        placeholder="(trống)"
                                        value={user.input.phone}
                                        readOnly
                                    />
                                    {/* <span class="form-text text-muted">Some help content goes here</span> */}
                                </div>
                            </div>
                            {/* address */}
                            <div className="form-group row">
                                <label htmlFor="address" className="col-xl-3 col-lg-4 col-form-label">
                                    Địa chỉ
                                </label>
                                <div className="col-xl-9 col-lg-8">
                                    <input
                                        className="form-control form-control-lg form-control-solid"
                                        type="text"
                                        id="address"
                                        placeholder="(trống)"
                                        value={user.input.address}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default InfoProfile;
