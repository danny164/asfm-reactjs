import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { dateToFromNowDaily } from 'convert/DateToFromNow';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useSnackbar } from 'notistack';

ContentExpander.propTypes = {
    data: PropTypes.array,
};

ContentExpander.defaultProps = {
    data: [],
};

function ContentExpander(props) {
    const { data } = props;

    const [copied, setCopied] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (copied) {
            enqueueSnackbar('Đã copy thành công', { variant: 'success' });
            setCopied(false);
        }
    }, [copied]);

    return (
        <>
            <div className="d-flex align-items-start ml-7 my-5">
                <span className="bullet bullet-bar bg-orange align-self-stretch" />
                <div className="d-flex flex-column flex-grow-1 ml-4">
                    <header className="card-title content mb-4">
                        <div>
                            {data.id_report && (
                                <p>
                                    Report ID: {data.id_report}{' '}
                                    <CopyToClipboard text={data.id_report} onCopy={() => setCopied(true)}>
                                        <span className="ml-1 cursor-pointer">
                                            <i className="fad fa-copy"></i>
                                        </span>
                                    </CopyToClipboard>
                                </p>
                            )}

                            {data.id_post && (
                                <p className="mb-0">
                                    Order ID: {data.id_post}{' '}
                                    <CopyToClipboard text={data.id_post} onCopy={() => setCopied(true)}>
                                        <span className="ml-1 cursor-pointer">
                                            <i className="fad fa-copy"></i>
                                        </span>
                                    </CopyToClipboard>
                                </p>
                            )}

                            {data.id_feedback && (
                                <p className="mb-0">
                                    Feedback ID: {data.id_feedback}{' '}
                                    <CopyToClipboard text={data.id_feedback} onCopy={() => setCopied(true)}>
                                        <span className="ml-1 cursor-pointer">
                                            <i className="fad fa-copy"></i>
                                        </span>
                                    </CopyToClipboard>
                                </p>
                            )}
                        </div>
                    </header>
                    <section className="card-info content">
                        <p>
                            Họ tên:
                            <span className="text-brown ml-2">{data.fullname}</span>
                        </p>
                        <p>
                            Email:
                            <span className="text-brown ml-2">{data.email}</span>
                        </p>

                        <div className="separator separator-dashed my-5" />

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
                            <span className="text-muted ml-2">{dateToFromNowDaily(data.time)}</span>
                        </p>
                    </section>
                </div>
            </div>

            <div className="separator separator-dashed my-5" />
        </>
    );
}

export default ContentExpander;
