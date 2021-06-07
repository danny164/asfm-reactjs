import Cancelled from 'components/labels/Cancelled';
import Completed from 'components/labels/Completed';
import InProcessing from 'components/labels/InProcessing';
import Picked from 'components/labels/Picked';
import { dateToFromNowDaily } from 'convert/DateToFromNow';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

TotalOrderExpander.propTypes = {
    data: PropTypes.array,
};

TotalOrderExpander.defaultProps = {
    data: [],
};

function TotalOrderExpander(props) {
    const { data } = props;

    const [copied, setCopied] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (copied) {
            enqueueSnackbar('Đã copy Order ID thành công', { variant: 'success' });
            setCopied(false);
        }
    }, [copied]);

    const estimateTime = (secs) => {
        const mins = Math.round(secs / 60);

        if (mins <= 1) {
            return '20 phút';
        }

        const bonusTime = mins + 20;

        return bonusTime + ' phút';
    };

    return (
        <>
            <section className="ml-7 my-5">
                <div className="d-flex align-items-start">
                    <span className="bullet bullet-bar bg-orange align-self-stretch" />
                    <div className="d-flex flex-column flex-grow-1 ml-4">
                        <header className="card-title content mb-4">
                            <div>
                                <p>
                                    Order ID: {data.id_post}{' '}
                                    <CopyToClipboard text={data.id_post} onCopy={() => setCopied(true)}>
                                        <span className="ml-1 cursor-pointer">
                                            <i className="fad fa-copy"></i>
                                        </span>
                                    </CopyToClipboard>
                                </p>
                                <p className="mb-0">
                                    Shipper ID: {data.id_shipper}{' '}
                                    <CopyToClipboard text={data.id_shipper} onCopy={() => setCopied(true)}>
                                        <span className="ml-1 cursor-pointer">
                                            <i className="fad fa-copy"></i>
                                        </span>
                                    </CopyToClipboard>
                                </p>
                            </div>
                            <span>{dateToFromNowDaily(data.thoi_gian)}</span>
                        </header>
                        <section className="card-info content">
                            <div className="mb-5">
                                <p>
                                    <span className="font-weight-bold">Người gửi: </span>
                                    <span className="text-brown ml-2">{data.ten_nguoi_gui}</span>
                                    <span className="middle-dot text-muted">{data.sdt_nguoi_gui}</span>
                                </p>
                                <p>
                                    <span className="font-weight-bold">Người nhận: </span>
                                    <span className="text-brown ml-2">{data.ten_nguoi_nhan}</span>
                                    <span className="middle-dot text-muted">{data.sdt_nguoi_nhan}</span>
                                </p>

                                <div className="separator separator-dashed my-5" />

                                <p>
                                    Chi phí giao hàng:
                                    <span className="font-weight-bold text-primary-2 ml-2">{data.phi_giao}</span>
                                </p>
                                <p>
                                    Tạm ứng:
                                    <span className="font-weight-bold text-chartjs ml-2">{data.phi_ung}</span>
                                </p>
                                <p>
                                    Mã nhận hàng:
                                    <span className="font-weight-bold menu-in-progress ml-2">{data.ma_bi_mat}</span>
                                </p>
                                <p>
                                    Ghi chú:
                                    <span className="text-muted ml-2">{data.ghi_chu}</span>
                                </p>
                                {data.status === '3' && (
                                    <p>
                                        Lý do hủy:
                                        <span className="text-muted ml-2">{data.reason}</span>
                                    </p>
                                )}
                            </div>

                            <p className="delivery m-0">Nhận hàng từ</p>
                            <div className="d-flex align-items-center justify-content-between">
                                <address className="mb-0 pl-0">{data.noi_nhan}</address>
                            </div>

                            <p className="delivery m-0 mt-5">
                                Giao hàng tới
                                <span className="font-weight-bold middle-dot text-primary-2">{data.km}</span>
                                <span className="font-weight-bold middle-dot text-chartjs">
                                    {estimateTime(data.time_estimate)}
                                </span>
                            </p>
                            <div className="d-flex align-items-center justify-content-between">
                                <address className="mb-0 pl-0">{data.noi_giao}</address>
                                {data.status === '0' && <InProcessing />}
                                {data.status === '1' && <Picked />}
                                {data.status === '2' && <Completed />}
                                {data.status === '3' && <Cancelled />}
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </>
    );
}

TotalOrderExpander.propTypes = {
    data: PropTypes.array,
};
TotalOrderExpander.defaultProps = {
    data: [],
};

export default TotalOrderExpander;
