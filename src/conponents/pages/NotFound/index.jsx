import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

function NotFoundPage(props) {
    // useEffect(() => {
    //     document.body.classList.add('box');
    // }, []);

    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        if (countdown === 0) {
            window.location = '/home';
        }
        const timer = setTimeout(() => {
            countdown > 0 && setCountdown(countdown - 1);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [countdown]);

    return (
        <div className="d-flex flex-column flex-root">
            <div className="d-flex flex-row-fluid bgi-size-cover bgi-position-center">
                <div className="d-flex flex-column flex-row-fluid min-vh-100 align-items-center align-items-md-start justify-content-md-center text-center text-md-left px-10 px-md-30 py-10 py-md-0 line-height-xs">
                    <h1 className="error-title text-success font-weight-boldest line-height-sm">404</h1>
                    <p className="error-subtitle text-success font-weight-boldest mb-10">ERROR !!!</p>
                    <p className="display-4 text-danger font-weight-boldest mt-md-0 line-height-md">Không tìm thấy nội dung yêu cầu !</p>
                    <div>
                        <Link to="./home">
                            <button className="btn btn-sm btn-secondary">
                                Trang Chủ ( <span className="font-weight-bold">{countdown}</span> )
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

NotFoundPage.propTypes = {};

export default NotFoundPage;
