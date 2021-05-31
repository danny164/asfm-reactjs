import React from 'react';
import PropTypes from 'prop-types';

function Introduction(props) {
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
                                <div className="card-label text-dark pl-4">Amateur Shippers for Merchants là gì?</div>
                            </div>
                        </div>
                        <div>
                            <div className="card-body text-dark-50 font-size-lg pl-12">
                                Là trang web đáp ứng nhu cầu tìm tài xế tự do giao hàng trong khu vực Đà Nẵng.
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
                                <div className="card-label text-dark pl-4">Chi phí giao hàng</div>
                            </div>
                        </div>
                        <div>
                            <div className="card-body text-dark-50 font-size-lg pl-12">
                                Linh động, hợp lý, gợi ý cho bạn mức giá phù hợp theo khoảng cách để tăng khả năng nhận
                                đơn.
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
                                <div className="card-label text-dark pl-4">Theo dõi đơn hàng</div>
                            </div>
                        </div>
                        <div>
                            <div className="card-body text-dark-50 font-size-lg pl-12">
                                Chủ động theo dõi đơn hàng của bạn đã giao hoàn thành hay chưa tại chi tiết đơn
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
                                <div className="card-label text-dark pl-4">Thống kê doanh thu, số lượng đơn</div>
                            </div>
                        </div>
                        <div>
                            <div className="card-body text-dark-50 font-size-lg pl-12">
                                Thống kê theo theo tuần, theo tháng với biểu đồ trực quan, giúp bạn nắm rõ tần suất đơn
                                hàng qua từng ngày
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Introduction.propTypes = {};

export default Introduction;
