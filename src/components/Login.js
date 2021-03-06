import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import '../assets/css/portal.scss';
import Bubbles from '../assets/media/ball-wed.svg';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import Version from './common/Version';
import Logo from './Logo';

function Login1(props) {
    useEffect(() => {
        document.body.classList.remove('bg--banned');
        document.body.classList.remove('bg');
    }, []);

    const schema = yup.object().shape({
        email: yup.string().email('Email không hợp lệ'),
        password: yup.string().min(6, 'Mật khẩu tối thiểu phải ${min} kí tự'),
    });

    const checkRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { currentUser } = useAuth();

    const [error, setError] = useState('');
    const [emailEmpty, setEmailEmpty] = useState();
    const [passEmpty, setPassEmpty] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const { signin } = useAuth();

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
        if (emailRef.current.value === '' && passwordRef.current.value === '') {
            setPassEmpty('Bạn chưa nhập mật khẩu !');
            return setEmailEmpty('Bạn chưa nhập địa chỉ email !');
        }

        if (emailRef.current.value === '') {
            return setEmailEmpty('Bạn chưa nhập địa chỉ email !');
        }

        if (passwordRef.current.value === '') {
            return setPassEmpty('Bạn chưa nhập mật khẩu !');
        }
        try {
            await signin(emailRef.current.value, passwordRef.current.value);
            setError('');
            // history.push('/home')
        } catch {
            setError('Đăng nhập không thành công!');
        }

        setLoading(false);
    };

    const isRemember = (e) => {
        if (e.target.checked === true) {
            localStorage.setItem('check', e.target.checked);
            localStorage.setItem('username', emailRef.current.value);
            localStorage.setItem('password', passwordRef.current.value);
        } else {
            localStorage.removeItem('check');
            localStorage.removeItem('username');
            localStorage.removeItem('password');
        }
    };

    async function updateRole() {
        await db.collection('ShopProfile').doc(currentUser.uid).update({
            role: '1',
            lock_time: '',
            reason: '',
        });
    }

    if (currentUser) {
        async function checkRole() {
            try {
                await db
                    .collection('ShopProfile')
                    .doc(currentUser.uid)
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            if (
                                doc.data().lock_time < moment().format('X') &&
                                doc.data().role !== '1' &&
                                doc.data().role !== '9'
                            ) {
                                updateRole();
                            }
                        }
                    });
            } catch (err) {
                console.log(err);
            }
        }

        async function fetchRole() {
            try {
                await db
                    .collection('ShopProfile')
                    .doc(currentUser.uid)
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            console.log('ok');
                            if (doc.data().role === '1' || doc.data().role === '2') {
                                localStorage.setItem('fullname', doc.data().fullname);
                                localStorage.setItem('email', currentUser.email);
                                localStorage.setItem('role', doc.data().role);
                                history.push('/home');
                            }

                            if (doc.data().role === '9') {
                                localStorage.setItem('fullname', doc.data().fullname);
                                localStorage.setItem('email', currentUser.email);
                                localStorage.setItem('role', doc.data().role);
                                localStorage.setItem('userInfor', JSON.stringify(doc.data()));
                                history.push('/admin');
                            }

                            if (doc.data().role === '0') {
                                localStorage.setItem('role', doc.data().role);
                                history.push('/banned');
                            }
                        } else {
                            console.log('No such document!');
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        }
        checkRole();
        fetchRole();
    }

    return (
        <>
            <div
                className="bgi-no-repeat"
                style={{
                    backgroundColor: 'white',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundImage: `url(${Bubbles})`,
                }}
            >
                <main className="d-flex flex-column flex-root min-vh-100">
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
                                        <div className="text-brown font-weight-bold">Amateur Shipper for Merchants</div>
                                    </div>
                                    {error && <Alert className="text-chartjs p-0">{error}</Alert>}
                                    <form className="form" id="login_signin_form" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group mb-5">
                                            <input
                                                className={checkingEmail}
                                                type="text"
                                                placeholder="Email"
                                                defaultValue={localStorage.getItem('username')}
                                                {...register('email')}
                                                autoComplete="off"
                                                ref={emailRef}
                                            />
                                        </div>
                                        <p className="text-chartjs">{errors.email?.message}</p>
                                        <p className="text-chartjs">{emailEmpty !== '' && emailEmpty}</p>
                                        <div className="form-group mb-5">
                                            <input
                                                className={checkingPw}
                                                type="password"
                                                placeholder="Mật khẩu"
                                                defaultValue={localStorage.getItem('password')}
                                                {...register('password')}
                                                ref={passwordRef}
                                            />
                                        </div>
                                        <p className="text-chartjs">{errors.password?.message}</p>
                                        <p className="text-chartjs">{passEmpty !== '' && passEmpty}</p>
                                        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
                                            <div className="checkbox-inline">
                                                <label className="checkbox m-0 text-brown">
                                                    <input
                                                        type="checkbox"
                                                        defaultChecked={localStorage.getItem('check')}
                                                        ref={checkRef}
                                                        onClick={isRemember}
                                                    />
                                                    <span />
                                                    Ghi nhớ đăng nhập
                                                </label>
                                            </div>
                                            <Link
                                                to="forgotpw"
                                                id="login_forgot"
                                                className="text-brown text-hover-primary"
                                            >
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
                                        <span className="text-brown mr-4">Bạn chưa có tài khoản?</span>
                                        <Link to="register" className="text-brown text-hover-primary font-weight-bold">
                                            Đăng ký!
                                        </Link>
                                    </div>
                                </div>
                                {/* end form */}
                            </div>
                        </div>
                    </section>
                    {/* end login page*/}
                    <Version />
                </main>
            </div>
        </>
    );
}

export default Login1;
