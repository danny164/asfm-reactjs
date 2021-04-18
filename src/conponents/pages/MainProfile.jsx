import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Avatar from "../../assets/media/avatar.png";
import { Alert } from "react-bootstrap";


MainProfile.propTypes = {
    user: PropTypes.object,
    onChange: PropTypes.func,
};

MainProfile.defaultProps = {
    user: "",
    onChange: null,
};

function MainProfile(props) {
    const { user, onChange } = props;

    // Dữ liệu các quận trong thành phố Đà Nẵng

    // *** This is for test data
    // useEffect(() => {
    //     console.log(district);
    // }, [district]);

    // useEffect(() => {
    //     console.log(ward);
    // }, [ward]);


    function handleChangeEdit() {
        if (onChange) {
            onChange();
        }
    }

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
                                        <a href="homepage.html" className="text-muted">
                                            Trang chủ
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        <a href="profile.html" className="text-muted">
                                            Xem hồ sơ
                                        </a>
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
                {/* core content */}
                <div className="core d-flex flex-column flex-row-fluid container">
                    <form className="form">
                        <div className="card card-custom">
                            <header className="card-header py-3">
                                <div className="card-title align-items-start flex-column">
                                    <h3 className="card-label">Thông tin cá nhân</h3>
                                    <span className="text-muted font-size-sm mt-1">Cập nhật thông tin cá nhân của bạn</span>
                                </div>
                                <div className="card-toolbar">
                                    <button type="submit" className="btn btn-chartjs mr-2" onClick={handleChangeEdit}>
                                        Chỉnh sửa
                                    </button>
                                </div>
                            </header>
                            <h3 style={{ align: "center" }}>{user.error && <Alert style={{ color: user.alert }}>{user.error}</Alert>}</h3>
                            <div className="card-body">
                                {/* avatar */}
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-4 col-form-label">Ảnh đại diện</label>
                                    <div className="col-xl-9 col-lg-8">
                                        <div
                                            className="image-input image-input-outline"
                                            id="profile_avatar"
                                            style={{
                                                backgroundImage: `url(${Avatar})`,
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
            </section>
            <Footer />
        </main>
    );
}
export default MainProfile;
