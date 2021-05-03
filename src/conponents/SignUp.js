import React, { useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import '../assets/css/portal.css';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { db } from '../firebase'
import moment from 'moment';
import random from 'randomstring';

function Register(props) {
    const schema = yup.object().shape({
        email: yup
            .string()
            .email('Email không hợp lệ')
            .matches(/^[a-z|A-Z|0-9|.@]+$/, 'Không chứa các kí tự đặc biệt')
            .required('Bạn chưa nhập địa chỉ email'),
        password: yup.string().min(6, 'Mật khẩu tối thiểu phải ${min} kí tự').required('Bạn chưa nhập mật khẩu'),
        rePassword: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu nhập lại không khớp'),
    });

    const { currentUser } = useAuth();
    const history = useHistory()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const checkingFullname = `form-control h-auto form-control-solid py-4 px-8 ${errors.fullname ? 'is-invalid' : ''}`;
    const checkingPhone = `form-control h-auto form-control-solid py-4 px-8 ${errors.phone ? 'is-invalid' : ''}`;
    const checkingEmail = `form-control h-auto form-control-solid py-4 px-8 ${errors.email ? 'is-invalid' : ''}`;
    const checkingPw = `form-control h-auto form-control-solid py-4 px-8 ${errors.password ? 'is-invalid' : ''}`;
    const checkingRePw = `form-control h-auto form-control-solid py-4 px-8 ${errors.rePassword ? 'is-invalid' : ''}`;

    const emailRef = useRef();
    const passwordRef = useRef();
    const fullNameRef = useRef();
    const phoneRef = useRef();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState('');
    const [license, setLicense] = useState(false);

    const { signup } = useAuth();

    const onSubmit = async (e) => {
        if (license === false) {
            setAlert('#f27173');
            return setError('Bạn phải đồng ý với các điều khoản !');
        }
        try {
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            setAlert("success !")
            history.push("/home")
        } catch (err) {
            setAlert('#f27173');
            // ! https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#createuserwithemailandpassword
            const errorCode = err.code;
            if (errorCode === 'auth/email-already-in-use') {
                setError('Tài khoản đã tồn tại');
            } else {
                setError('Đăng kí thất bại');
            }
        }
        setLoading(false);
    };

    function handleLicense(e) {
        if (e.target.checked === true) {
            setLicense(true);
        } else {
            setLicense(false);
        }
    }

    if (currentUser) {
        const insertShopInfor = async () => {
            try {
                await db
                    .collection('ShopProfile')
                    .doc(currentUser.uid)
                    .set({
                        fullname: fullNameRef.current.value,
                        phone: phoneRef.current.value,
                        email: currentUser.email,
                        id:
                            moment().format('YYYYMMDD-HHmmssSSS') +
                            random.generate({
                                length: 3,
                                charset: 'numeric',
                            }),
                        role: '1',
                        address: '',
                        district: '',
                        ward: '',
                        detailAddress: '',
                        lastEdited: '',
                    });
            } catch {
                console.log('error');
            }
        }
        insertShopInfor()
    }



    return (
        <div style={{ backgroundColor: 'white' }}>
            {/* main page */}
            <main className="d-flex flex-column flex-root">
                {/* register page */}
                <section className="login d-flex flex-row-fluid" id="login">
                    <div className="d-flex flex-center flex-row-fluid">
                        <div className="login-form text-center p-7">
                            {/* register page's header*/}
                            <Logo />
                            {/* register page's form*/}
                            <div className="login_signup mw-40ch">
                                <div className="mb-10">
                                    <h3>Đăng ký</h3>
                                    <div className="text-muted font-weight-bold">Nhập thông tin để tạo tài khoản</div>
                                </div>

                                {error && <Alert style={{ color: alert }}>{error}</Alert>}

                                <form className="form" id="login_signup_form" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group mb-5">
                                        <input className={checkingFullname} type="text" placeholder="Họ và Tên" ref={fullNameRef} />
                                    </div>

                                    <div className="form-group mb-5">
                                        <input className={checkingPhone} type="text" placeholder="Số điện thoại" ref={phoneRef} />
                                    </div>

                                    <div className="form-group mb-5">
                                        <input
                                            className={checkingEmail}
                                            type="text"
                                            placeholder="Email"
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
                                            {...register('password')}
                                            ref={passwordRef}
                                        />
                                    </div>
                                    <p className="text-chartjs">{errors.password?.message}</p>

                                    <div className="form-group mb-5">
                                        <input className={checkingRePw} type="password" placeholder="Nhập lại mật khẩu" {...register('rePassword')} />
                                    </div>
                                    <p className="text-chartjs">{errors.rePassword?.message}</p>

                                    <div className="form-group mb-5 text-left">
                                        <div className="checkbox-inline">
                                            <label className="checkbox m-0">
                                                <input type="checkbox" name="agree" onClick={handleLicense} />
                                                <span />
                                                Tôi đồng ý với các{' '}
                                                <Link to="#" className="ml-1">
                                                    điều khoản và quy định
                                                </Link>
                                                .
                                            </label>
                                        </div>
                                        <div className="form-text text-muted text-center" />
                                    </div>
                                    <div className="form-group d-flex flex-wrap flex-center mt-10">
                                        <Link to="/login">
                                            <span className="btn btn-secondary font-weight-bold px-9 py-4 my-3 mx-2">
                                                <i className="fad fa-long-arrow-left" /> Quay lại
                                            </span>
                                        </Link>
                                        <button
                                            disabled={loading}
                                            type="submit"
                                            id="login_signup_submit"
                                            className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-2"
                                        >
                                            Đăng ký
                                        </button>
                                    </div>
                                </form>
                            </div>
                            {/* end form */}
                        </div>
                    </div>
                </section>
                {/* end register page*/}
            </main>
            {/*end main page*/}
        </div>
    );
}

export default Register;
