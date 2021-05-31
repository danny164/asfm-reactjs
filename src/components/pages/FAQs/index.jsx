import React from 'react';
import PropTypes from 'prop-types';

function FAQs(props) {
    return (
        <>
            <div className="tab-content">
                <div className="accordion accordion-light accordion-light-borderless accordion-svg-toggle">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title text-dark">
                                <span>
                                    <i className="fad fa-chevron-double-right"></i>
                                </span>
                                <div className="card-label text-dark pl-4">Chi phí giao hàng là gì?</div>
                            </div>
                        </div>
                        <div>
                            <div className="card-body text-dark-50 font-size-lg pl-12">
                                Là số tiền bạn phải trả cho tài xế khi thực hiện giao dịch một đơn hàng, chi phí tối
                                thiểu là 10,000 vnđ, tối đa là 999,000 vnđ.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tab-content">
                <div className="accordion accordion-light accordion-light-borderless accordion-svg-toggle">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title text-dark">
                                <span>
                                    <i className="fad fa-chevron-double-right"></i>
                                </span>
                                <div className="card-label text-dark pl-4">Chi phí tạm ứng là gì?</div>
                            </div>
                        </div>
                        <div>
                            <div className="card-body text-dark-50 font-size-lg pl-12">
                                Là số tiền bạn phải trả cho tài xế khi thực hiện giao dịch một đơn hàng, chi phí tối
                                thiểu là 10,000 vnđ, tối đa là 999,000 vnđ.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

FAQs.propTypes = {};

export default FAQs;
