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
            <div className="tab-content">
                <div className="accordion accordion-light accordion-light-borderless accordion-svg-toggle">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title text-dark">
                                <span>
                                    <i className="fad fa-chevron-double-right"></i>
                                </span>
                                <div className="card-label text-dark pl-4">Trạng thái đơn hàng</div>
                            </div>
                        </div>
                        <div>
                            <div className="card-body text-dark-50 font-size-lg pl-12">
                                <p>
                                    Một đơn sẽ có 4 trạng thái:{' '}
                                    <span className="font-weight-bold menu-in-progress">Đang xử lý</span>,{' '}
                                    <span className="font-weight-bold menu-picked">Đã nhận đơn</span>,{' '}
                                    <span className="font-weight-bold menu-completed">Hoàn thành</span> và{' '}
                                    <span className="font-weight-bold menu-canceled">Đơn hủy</span>.
                                </p>
                                <p>
                                    Đối với đơn <span className="font-weight-bold menu-in-progress">đang xử lý</span>{' '}
                                    không có tài xế nào nhận trong vòng <span className="font-weight-bold">24h</span>,
                                    đơn sẽ tự động chuyển sang trạng thái{' '}
                                    <span className="font-weight-bold menu-canceled">đơn hủy</span>
                                </p>
                                <p>
                                    Đối với <span className="font-weight-bold menu-canceled">đơn hủy</span> bạn có thể
                                    sử dụng tính năng{' '}
                                    <span className="btn btn-sm btn-light flex-shrink-0">Đặt lại ngay</span>
                                </p>
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
