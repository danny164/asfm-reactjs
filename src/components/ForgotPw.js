import React, { useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/css/portal.scss';
import Bubbles from '../assets/media/ball-wed.svg';
import { useAuth } from '../context/AuthContext';
import Version from './common/Version';
import Logo from './Logo';

function ForgotPass() {
    const emailRef = useRef();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState('');

    const { resetPassword } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setAlert('green');
            setError('Yêu cầu lấy tại mật khẩu thành công, vui lòng kiểm tra email !');
        } catch {
            setAlert('red');
            setError('Tài khoản không tồn tại !');
        }
        setLoading(false);
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
                    {/* forgot page */}
                    <section className="login d-flex flex-row-fluid" id="login">
                        <div className="d-flex flex-center flex-row-fluid">
                            <div className="login-form text-center p-7">
                                {/* forgot page's header*/}
                                <Logo />
                                {/* forgot page's form*/}
                                <div className="login-forgot mw-40ch">
                                    <div className="mb-10">
                                        <h3>Quên mật khẩu?</h3>
                                        <div className="text-muted font-weight-bold">Nhập email để lấy lại mật khẩu</div>
                                    </div>
                                    {error && <Alert style={{ color: alert }}>{error}</Alert>}
                                    <form className="form" id="login_forgot_form" onSubmit={handleSubmit}>
                                        <div className="form-group mb-10">
                                            <input
                                                className="form-control form-control-solid h-auto py-4 px-8"
                                                type="text"
                                                placeholder="Email"
                                                name="email"
                                                autoComplete="off"
                                                ref={emailRef}
                                            />
                                        </div>
                                        <div className="form-group d-flex flex-wrap flex-center mt-10">
                                            <Link to="login">
                                                <span className="btn btn-secondary font-weight-bold px-9 py-4 my-3 mx-2">
                                                    <i className="fad fa-long-arrow-left" /> Quay lại
                                                </span>
                                            </Link>
                                            <button
                                                disabled={loading}
                                                type="submit"
                                                id="login_forgot_submit"
                                                className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-2"
                                            >
                                                Lấy mật khẩu
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                {/* end form */}
                            </div>
                        </div>
                    </section>
                    {/* end forgot page*/}
                    <Version />
                </main>
            </div>
        </>
    );
}

export default ForgotPass;
