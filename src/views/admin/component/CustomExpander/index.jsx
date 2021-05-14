import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

CustomExpander.propTypes = {
    data: PropTypes.object,
    now: PropTypes.string,
    shipper: PropTypes.bool,
};
CustomExpander.defaultProps = {
    data: null,
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

    const checkStatus = () => {
        if (data.lock_time && data.lock_time > '4129589471') {
            return <span className="font-weight-bold ml-2 text-danger">Khóa vĩnh viễn</span>;
        }
        if (data.lock_time && data.lock_time < '4129589471') {
            return <span className="font-weight-bold ml-2 text-warning">Bị hạn chế</span>;
        }
        if (!data.lock_time || data.lock_time < now) {
            return <span className="font-weight-bold ml-2 text-success">Đang hoạt động</span>;
        }
    };
    return (
        <>
            <div className="d-flex align-items-start ml-7 my-5">
                <span className="bullet bullet-bar bg-orange align-self-stretch" />
                <div className="d-flex flex-column flex-grow-1 ml-4">
                    <section className="card-info content">
                        <div className="custom-expander">
                            <p>
                                ID:
                                <span className="font-weight-bold ml-2">{data.id}</span>
                            </p>
                            <p>
                                Tình trạng:
                                {checkStatus()}
                            </p>
                            <p>
                                Họ tên:
                                <span className="font-weight-bold ml-2">{data.fullname}</span>
                            </p>
                            <p>
                                Email:
                                <span className="font-weight-bold text-primary-2 ml-2">{data.email}</span>
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
                                    <span className="font-weight-bold text-warning ml-2">
                                        {data.role === '9' ? (
                                            <>
                                                <span className="font-weight-bold text-warning">Admin</span>
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
                                <span className="font-weight-bold text-chartjs ml-2">{shipper ? convertPhone(data.phone) : data.phone}</span>
                            </p>
                            <p className="mb-0">
                                Địa chỉ:
                                <span className="font-weight-bold ml-2">{data.address}</span>
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
