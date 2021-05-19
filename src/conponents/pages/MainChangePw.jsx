import { useSnackbar } from 'notistack';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Footer from '../common/Footer';
import Header from '../common/Header';

MainChangePw.propTypes = {};

function MainChangePw(props) {
    const [loading, setLoading] = useState(false);

    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const oldPasswordRef = useRef();

    const { enqueueSnackbar } = useSnackbar();

    const { updatePassword } = useAuth();

    async function changePassWord(e) {
        e.preventDefault();

        if (oldPasswordRef.current.value === '' || passwordRef.current.value === '' || confirmPasswordRef.current.value === '') {
            enqueueSnackbar('Vui lòng không để trống !', { variant: 'error' });
            return;
        }

        if (
            oldPasswordRef.current.value.split('').length < 6 ||
            passwordRef.current.value.split('').length < 6 ||
            confirmPasswordRef.current.value.split('').length < 6
        ) {
            enqueueSnackbar('Mật khẩu phải tối thiểu 6 kí tự !', { variant: 'error' });
            return;
        }

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            enqueueSnackbar('Mật khẩu mới và mật khẩu nhập lại không khớp !', { variant: 'error' });
            return;
        }

        try {
            setLoading(true);
            await updatePassword(passwordRef.current.value);
            enqueueSnackbar('Cập nhật mật khẩu thành công !', { variant: 'success' });
        } catch {
            enqueueSnackbar('Thay đổi mật khẩu thất bại !', { variant: 'error' });
        }
        setLoading(false);
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
                                        <Link to="/home" className="text-muted">
                                            Trang chủ
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        <Link to="/changepw" className="text-muted">
                                            Thay đổi mật khẩu
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* end wrap breadcrumb */}
                    </div>
                </div>
                {/* core content */}
                <div className="core d-flex flex-column flex-row-fluid container">
                    <div className="card card-custom">
                        <header className="card-header py-3">
                            <div className="card-title align-items-start flex-column">
                                <h3 className="card-label">Thay đổi mật khẩu</h3>
                                <span className="text-muted font-size-sm mt-1">Thay đổi mật khẩu của bạn</span>
                            </div>
                            <div className="card-toolbar">
                                <button type="submit" className="btn btn-chartjs mr-2" disabled={loading} onClick={changePassWord}>
                                    Lưu thay đổi
                                </button>
                            </div>
                        </header>
                        <form className="form">
                            <div className="card-body">
                                {/* current password */}
                                <div className="form-group row">
                                    <label htmlFor="current-password" className="col-xl-3 col-lg-4 col-form-label">
                                        Mật khẩu cũ
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <input
                                            className="form-control form-control-lg"
                                            type="password"
                                            id="current-password"
                                            placeholder="Nhập mật khẩu cũ"
                                            ref={oldPasswordRef}
                                        />
                                        <span className="form-text text-muted">Mật khẩu hiện tại bạn đang sử dụng</span>
                                    </div>
                                </div>
                                {/* new password */}
                                <div className="form-group row">
                                    <label htmlFor="fullname" className="col-xl-3 col-lg-4 col-form-label">
                                        Mật khẩu mới
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <input
                                            className="form-control form-control-lg"
                                            type="password"
                                            id="password"
                                            ref={passwordRef}
                                            placeholder="Nhập mật khẩu mới"
                                        />
                                        <span className="form-text text-muted">Mật khẩu mới ít nhất 6 kí tự</span>
                                    </div>
                                </div>
                                {/* confirm password */}
                                <div className="form-group row">
                                    <label htmlFor="phone" className="col-xl-3 col-lg-4 col-form-label">
                                        Xác nhận mật khẩu
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <input
                                            className="form-control form-control-lg"
                                            type="password"
                                            id="confirm-password"
                                            placeholder="Nhập lại mật khẩu mới"
                                            ref={confirmPasswordRef}
                                        />
                                        <span className="form-text text-muted">Mật khẩu phải trùng khớp với mật khẩu mới vừa nhập</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default MainChangePw;
