import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function CustomExpander(props) {
    return (
        <>
            <div className="d-flex align-items-start ml-7 my-5">
                <span className="bullet bullet-bar bg-orange align-self-stretch" />
                <div className="d-flex flex-column flex-grow-1 ml-4">
                    <section className="card-info content">
                        <div className="custom-expander">
                            <p>
                                Shop ID:
                                <span className="font-weight-bold ml-2">#123456</span>
                            </p>
                            <p>
                                Tình trạng:
                                <span className="font-weight-bold ml-2 text-success">Đang hoạt động</span>
                            </p>
                            <p>
                                Họ tên:
                                <span className="font-weight-bold ml-2">Nguyễn Văn Quỳnh</span>
                            </p>
                            <p>
                                Email:
                                <span className="font-weight-bold text-primary-2 ml-2">qnv164@gmail.com</span>
                            </p>
                            <p>
                                Số điện thoại:
                                <span className="font-weight-bold text-chartjs ml-2">0344 063 164</span>
                            </p>
                            <p className="mb-0">
                                Địa chỉ:
                                <span className="font-weight-bold ml-2">986, Ngô Quyền, Phường An Hải Bắc, Quận Sơn Trà, Thành phố Đà Nẵng</span>
                            </p>
                        </div>
                    </section>
                </div>
            </div>

            <div className="separator separator-dashed my-5" />
        </>
    );
}

CustomExpander.propTypes = {};

export default CustomExpander;
