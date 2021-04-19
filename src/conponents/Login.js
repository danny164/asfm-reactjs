import React, { useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import '../assets/css/portal.css';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

var counter = 0;
function Login1(props) {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
 

    const history = useHistory();

    const { signin } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            await signin(emailRef.current.value, passwordRef.current.value);
            history.push('/home');
        } catch {
            setError('Username or password is incorrect !');
        }

        setLoading(false);
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
                            {error && <Alert style={{ color: 'red' }}>{error}</Alert>}
                            <form className="form" id="login_signin_form" onSubmit={handleSubmit}>
                               
                                <div className="form-group mb-5">
                                    <input
                                        className="form-control h-auto form-control-solid py-4 px-8"
                                        type="text"
                                        placeholder="Email"
                                        name="username"
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
                                        ref={passwordRef}
                                    />
                                </div>
                                <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
                                    <div className="checkbox-inline">
                                        <label className="checkbox m-0 text-muted">
                                            <input type="checkbox" name="remember" />
                                            <span />
                                            Ghi nhớ đăng nhập
                                        </label>
                                    </div>
                                <p>counter: {counter++}</p>
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
                                {/* <a href="register.html" id="login_signup" className="text-muted text-hover-primary font-weight-bold">Sign Up!</a>  */}
                                <Link to="register">Đăng ký!</Link>
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
