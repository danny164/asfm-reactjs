import React from 'react';
import PropTypes from 'prop-types';
import { dateToFromNowDaily } from 'convert/DateToFromNow';

ContentExpander.propTypes = {
    data: PropTypes.array,
};

ContentExpander.defaultProps = {
    data: [],
};

function ContentExpander(props) {
    const { data } = props;
    return (
        <>
            <div className="d-flex align-items-start ml-7 my-5">
                <span className="bullet bullet-bar bg-orange align-self-stretch" />
                <div className="d-flex flex-column flex-grow-1 ml-4">
                    <section className="card-info content">
                        <div className="custom-expander">
                            {data.id_report && (
                                <p>
                                    ID báo cáo:
                                    <span className="font-weight-bold text-brown ml-2">{data.id_report}</span>
                                </p>
                            )}
                            {data.id_feedback && (
                                <p>
                                    ID phản hồi:
                                    <span className="font-weight-bold text-brown ml-2">{data.id_feedback}</span>
                                </p>
                            )}
                            {data.id_post && (
                                <p>
                                    ID đơn:
                                    <span className="font-weight-bold text-brown ml-2">{data.id_post}</span>
                                </p>
                            )}
                            <p>
                                Họ tên:
                                <span className="font-weight-bold text-brown ml-2">{data.fullname}</span>
                            </p>
                            <p>
                                Email:
                                <span className="font-weight-bold text-brown ml-2">{data.email}</span>
                            </p>
                            <p>
                                Loại:
                                <span className="font-weight-bold text-chartjs ml-2">
                                    {
                                        <>
                                            {data.type === '0' && 'Khiếu nại'}
                                            {data.type === '1' && 'Góp ý'}
                                            {data.type === '2' && 'Khác'}
                                        </>
                                    }
                                </span>
                            </p>

                            <p>
                                Nội dung:
                                <span className="font-weight-bold text-primary-2 ml-2">{data.content}</span>
                            </p>

                            <p className="mb-0">
                                Thời gian:
                                <span className="font-weight-bold text-brown ml-2">
                                    {dateToFromNowDaily(data.time)}
                                </span>
                            </p>
                        </div>
                    </section>
                </div>
            </div>

            <div className="separator separator-dashed my-5" />
        </>
    );
}

export default ContentExpander;
