import React, { useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/css/portal.css';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

function Register(props) {
    const emailRef = useRef();
    const passWordRef = useRef();
    const passWordConfirmRef = useRef();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState('');
    const [license, setLicense] = useState(false)

    const { signup } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passWordRef.current.value !== passWordConfirmRef.current.value) {
            setAlert('red');
            return setError('Password is not match !');
        }

        try {
            setLoading(true);
            await signup(emailRef.current.value, passWordRef.current.value);
            setAlert('green');
            setError('Register success !');
        } catch {
            setAlert('red');
            setError('Failed to create an account !');
            console.log(emailRef.current.value, 'va', passWordRef.current.value);
        }
        setLoading(false);
    }

    function handleLicense(e){
        if(e.target.checked === true){
            setLicense(true)
        } else {
            setLicense(false)
        }
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
                                {/* nếu error != null thì render */}
                                {error && <Alert style={{ color: alert }}>{error}</Alert>}
                                <form className="form" id="login_signup_form" onSubmit={handleSubmit}>
                                    <div className="form-group mb-5">
                                        <input
                                            className="form-control h-auto form-control-solid py-4 px-8"
                                            type="text"
                                            placeholder="Email"
                                            name="email"
                                            autoComplete="off"
                                            ref={emailRef}
                                        />
                                    </div>
                                    <div className="form-group mb-5">
                                        <input
                                            className="form-control h-auto form-control-solid py-4 px-8"
                                            type="password"
                                            placeholder="Mật khẩu"
                                            name="password"
                                            ref={passWordRef}
                                        />
                                    </div>
                                    <div className="form-group mb-5">
                                        <input
                                            className="form-control h-auto form-control-solid py-4 px-8"
                                            type="password"
                                            placeholder="Nhập lại mật khẩu"
                                            name="cpassword"
                                            ref={passWordConfirmRef}
                                        />
                                    </div>
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
