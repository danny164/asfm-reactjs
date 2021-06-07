import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import './styles.scss';

CustomExpander.propTypes = {
    data: PropTypes.array,
    now: PropTypes.string,
    shipper: PropTypes.bool,
};
CustomExpander.defaultProps = {
    data: [],
    now: '',
    shipper: false,
};

const convertPhone = (phone) => {
    const match = phone.match(/^(\d{4})(\d{3})(\d{3})$/);
    if (match) {
        return [match[1], match[2], match[3]].join(' ');
    }
    return null;
};

function CustomExpander(props) {
    const { data, now, shipper } = props;

    const [copied, setCopied] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const checkStatus = () => {
        if (data.lock_time > '4129589471') {
            return <span className="ml-2 text-danger">Khóa vĩnh viễn</span>;
        }
        if (data.lock_time > now && data.lock_time < '4129589471') {
            return <span className="ml-2 text-warning">Bị hạn chế</span>;
        }
        if (!data.lock_time || data.lock_time < now) {
            return <span className="ml-2 text-success">Đang hoạt động</span>;
        }
    };

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
                            {data.id && (
                                <p className="mb-0">
                                    ID: {data.id}{' '}
                                    <CopyToClipboard text={data.id} onCopy={() => setCopied(true)}>
                                        <span className="ml-1 cursor-pointer">
                                            <i className="fad fa-copy"></i>
                                        </span>
                                    </CopyToClipboard>
                                </p>
                            )}
                        </div>
                    </header>
                    <section className="card-info content">
                        <div className="custom-expander">
                            <p>
                                Tình trạng:
                                {checkStatus()}
                            </p>
                            <p>
                                Họ tên:
                                <span className="text-brown ml-2">{data.fullname}</span>
                            </p>
                            <p>
                                Email:
                                <span className="text-brown ml-2">{data.email}</span>
                            </p>
                            {data.rate_star && (
                                <p>
                                    Rating:
                                    <span className="font-weight-bold text-warning ml-2">
                                        {data.rate_star}
                                        <i className="fad fa-star-shooting text-warning rate-star ml-1"></i>
                                    </span>
                                </p>
                            )}
                            {data.role && !shipper && (
                                <p>
                                    Vai trò:
                                    <span className="ml-2">
                                        {data.role === '9' ? (
                                            <>
                                                <span className="text-warning">Admin</span>
                                                <i className="fad fa-star-shooting text-warning rate-star ml-1"></i>
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-muted">Shop Owner</span>
                                                <i className="fad fa-star-shooting text-muted rate-star ml-1"></i>
                                            </>
                                        )}
                                    </span>
                                </p>
                            )}
                            <p>
                                Số điện thoại:
                                <span className="text-brown ml-2">
                                    {shipper ? convertPhone(data.phone) : data.phone}
                                </span>
                            </p>
                            <p className="mb-0">
                                Địa chỉ:
                                <span className="text-brown ml-2">{data.address || '(Chưa cập nhật)'}</span>
                            </p>
                        </div>
                    </section>
                </div>
            </div>

            <div className="separator separator-dashed my-5" />
        </>
    );
}

export default CustomExpander;
