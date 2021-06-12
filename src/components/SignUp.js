import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import random from 'randomstring';
import React, { useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import '../assets/css/portal.scss';
import Bubbles from '../assets/media/ball-wed.svg';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import Version from './common/Version';
import Logo from './Logo';
import { useSnackbar } from 'notistack';

const firstUppercase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const convertString = (value) => {
    const allLowerCase = value.toLowerCase();
    const removeSpace = allLowerCase.replace(/[ ]{2,}/g, ' ').trim();

    const removeSpecialChars = removeSpace.replace(
        /\.|\,|\+|\-|\*|\/|\-|\=|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\{|\}|\||\\|\:|\"|\;|\'|\<|\>|\?|\[|\]|[0-9]/g,
        ''
    );

    const splitString = removeSpecialChars.split(' ');

    const result = [];

    splitString.forEach((string) => {
        return result.push(firstUppercase(string));
    });

    return result.join(' ');
};

function Register(props) {
    const schema = yup.object().shape({
        fullname: yup
            .string()
            .required('Vui lòng điền họ tên')
            .max(50, 'Vượt quá ${max} kí tự được cho phép')
            .min(5, 'Tối thiểu ${min} kí tự'),
        phone: yup
            .string()
            .matches(/^[0-9\s]+$/, 'Định dạng không hợp lệ')
            .required('Vui lòng điền số điện thoại khách hàng'),
        email: yup
            .string()
            .email('Email không hợp lệ')
            .matches(/^[a-z|A-Z|0-9|.@]+$/, 'Không chứa các kí tự đặc biệt')
            .required('Bạn chưa nhập địa chỉ email'),
        password: yup.string().min(6, 'Mật khẩu tối thiểu phải ${min} kí tự').required('Bạn chưa nhập mật khẩu'),
        rePassword: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu nhập lại không khớp'),
    });

    const { currentUser } = useAuth();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

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

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState('');
    const [license, setLicense] = useState(false);

    const { signup } = useAuth();

    const onSubmit = async (e) => {
        if (license === false) {
            enqueueSnackbar('Bạn phải đồng ý với các điều khoản !', { variant: 'error' });

            return;
        }

        try {
            await signup(emailRef.current.value, passwordRef.current.value);
            setLoading(false);
            enqueueSnackbar('Đăng kí thành công !', { variant: 'success' });
        } catch (err) {
            setAlert('#f27173');
            // ! https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#createuserwithemailandpassword
            const errorCode = err.code;
            if (errorCode === 'auth/email-already-in-use') {
                enqueueSnackbar('Tài khoản đã tồn tại !', { variant: 'error' });
            } else {
                enqueueSnackbar('Đăng kí thất bại !', { variant: 'error' });
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
                        fullname: convertString(fullNameRef.current.value),
                        phone: phoneRef.current.value,
                        email: currentUser.email,
                        id:
                            moment().format('YYYYMMDD-HHmmssSSS') +
                            random.generate({
                                length: 3,
                                charset: 'numeric',
                            }),
                        uid: currentUser.uid,
                        role: '1',
                        address: '',
                        district: '',
                        ward: '',
                        detailAddress: '',
                        lastEdited: '',
                        reason: '',
                        lock_time: '',
                    });
            } catch {
                console.log('error');
            }
        };
        insertShopInfor();

        async function fetchRole() {
            try {
                await db
                    .collection('ShopProfile')
                    .doc(currentUser.uid)
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            localStorage.setItem('fullname', doc.data().fullname);
                            localStorage.setItem('email', currentUser.email);
                            localStorage.setItem('role', doc.data().role);
                            history.push('/home');
                        } else {
                            console.log('No such document!');
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        }
        fetchRole();
    }

    return (
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
                <section className="login d-flex flex-row-fluid" id="login">
                    <div className="d-flex flex-center flex-row-fluid">
                        <div className="login-form text-center p-7">
                            <Logo />
                            <div className="login_signup mw-40ch">
                                <div className="mb-10">
                                    <h3>Đăng ký</h3>
                                    <div className="text-brown font-weight-bold">Nhập thông tin để tạo tài khoản</div>
                                </div>

                                <form className="form" id="login_signup_form" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group mb-5">
                                        <input
                                            className={checkingFullname}
                                            type="text"
                                            placeholder="Họ và Tên"
                                            {...register('fullname')}
                                            ref={fullNameRef}
                                        />
                                    </div>
                                    <p className="text-chartjs">{errors.fullname?.message}</p>

                                    <div className="form-group mb-5">
                                        <InputMask
                                            mask="9999 999 999"
                                            className={checkingPhone}
                                            type="text"
                                            placeholder="Số điện thoại"
                                            {...register('phone')}
                                            ref={phoneRef}
                                        />
                                    </div>
                                    <p className="text-chartjs">{errors.phone?.message}</p>

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
                                        <input
                                            className={checkingRePw}
                                            type="password"
                                            placeholder="Nhập lại mật khẩu"
                                            {...register('rePassword')}
                                        />
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
                        </div>
                    </div>
                </section>
                <Version />
            </main>
        </div>
    );
}

export default Register;
