import React, { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link, Redirect, useHistory } from 'react-router-dom';
import '../assets/css/portal.css';
import { useAuth, UseAuth } from '../context/AuthContext';
import Logo from './Logo';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import StoreUser from './storeUser';

function Login1(props) {

    const schema = yup.object().shape({
        email: yup.string().email('Email không hợp lệ').required('Bạn chưa nhập địa chỉ email'),
        password: yup.string().min(6, 'Mật khẩu tối thiểu phải ${min} kí tự').required('Bạn chưa nhập mật khẩu'),
    });



    const checkRef = useRef()
    const emailRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signin } = UseAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const checkingEmail = `form-control h-auto form-control-solid py-4 px-8 ${errors.email ? 'is-invalid' : ''}`;
    const checkingPw = `form-control h-auto form-control-solid py-4 px-8 ${errors.password ? 'is-invalid' : ''}`;

    const onSubmit = async (e) => {
        try {
            setLoading(true);
            await signin(emailRef.current.value, passwordRef.current.value);
            // if (checkRef.current.checked === true) {
            //     <StoreUser storeUser='luu' />
            // }
        } catch {
            setError('Đăng nhập không thành công!');
        }

        setLoading(false);
    };

    const isRemember = (e) => {
        if(e.target.checked === true){
            localStorage.setItem("check", e.target.checked)
            localStorage.setItem("username", emailRef.current.value)
            localStorage.setItem("password", passwordRef.current.value)
        } else {
            localStorage.removeItem("check")
            localStorage.removeItem("username" )
            localStorage.removeItem("password")
        }
    }

    return (
        <main className="d-flex flex-column flex-root">
            {/* login page */}
            <section className="login d-flex flex-row-fluid" id="login">
                <div className="d-flex flex-center flex-row-fluid">
                    <div className="login-form text-center p-7">
                        {/* login page's header*/}
                        <Logo />
                        {/* login page's form*/}
                        <div className="login-signin mw-40ch">
                            <div className="mb-10">
                                <h3>Đăng nhập</h3>
                                <div className="text-muted font-weight-bold">Amateur Shipper for Merchants</div>
                            </div>
                            {error && <Alert className="text-chartjs p-0">{error}</Alert>}
                            <form className="form" id="login_signin_form" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group mb-5">
                                    <input
                                        className={checkingEmail}
                                        type="text"
                                        placeholder="Email"
                                        value={localStorage.getItem('username')}
                                        {...register('email')}
                                        autoComplete="off"
                                        ref={emailRef}
                                    />
                                </div>
                                <p className="text-chartjs">{errors.email?.message}</p>

                                <div className="form-group mb-5">
                                    <input
                                        className={checkingPw}
                                        type="password"
                                        placeholder="Mật khẩu"
                                        value={localStorage.getItem('password')}
                                        {...register('password')}
                                        ref={passwordRef}
                                    />
                                </div>
                                <p className="text-chartjs">{errors.password?.message}</p>

                                <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
                                    <div className="checkbox-inline">
                                        <label className="checkbox m-0 text-muted">
                                            <input type="checkbox" defaultChecked={localStorage.getItem('check')} ref={checkRef} onClick={isRemember}  />
                                            <span />
                                            Ghi nhớ đăng nhập
                                        </label>
                                    </div>
                                    <Link to="forgotpw" id="login_forgot" className="text-muted text-hover-primary">
                                        Quên mật khẩu?
                                    </Link>
                                </div>
                                <button
                                    disabled={loading}
                                    type="submit"
                                    id="login_signin_submit"
                                    className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                                >
                                    Đăng nhập
                                </button>
                            </form>
                            <div className="mt-10">
                                <span className="opacity-70 mr-4">Bạn chưa có tài khoản?</span>
                                <Link to="register" className="text-muted text-hover-primary font-weight-bold">
                                    Đăng ký!
                                </Link>
                            </div>
                        </div>
                        {/* end form */}
                    </div>
                </div>
            </section>
            {/* end login page*/}
        </main>
    );
}

export default Login1;
