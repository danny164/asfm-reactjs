import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';

MainFeedback.propTypes = {
    feedBack: PropTypes.func,
};

MainFeedback.defaultProps = {
    feedBack: null,
};

function MainFeedback(props) {
    const { feedBack } = props;
    const [typeReport, setTypeReport] = useState('0');
    const contentRef = useRef();

    const history = useHistory();

    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async () => {
        console.log(contentRef.current.value);
        if (feedBack) {
            await feedBack(typeReport, contentRef.current.value);
            enqueueSnackbar('Đã ghi nhận góp ý / khiếu nại của bạn', { variant: 'success' });
            history.push('/home');
        }
    };

    console.log(typeReport);

    return (
        <>
            <main className="d-flex flex-column flex-row-fluid wrapper">
                <Header />
                <section className="d-flex flex-column flex-row-fluid container">
                    <div className="card card-custom gutter-b">
                        <div className="card-header">
                            <div className="card-title">
                                <h5 className="card-label">Góp ý / khiếu nại chất lượng dịch vụ</h5>
                            </div>
                        </div>

                        <form className="form">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-xl-5">
                                        <div className="form-group">
                                            <label>Loại phản hồi</label>
                                            <div className="checkbox-inline">
                                                <label className="checkbox checkbox-success">
                                                    <input
                                                        type="radio"
                                                        value="khiếu nại"
                                                        onClick={() => setTypeReport('0')}
                                                        defaultChecked="checked"
                                                        name="checkbox"
                                                    />
                                                    <span />
                                                    Khiếu nại
                                                </label>
                                                <label className="checkbox checkbox-success">
                                                    <input type="radio" value="góp ý" onClick={() => setTypeReport('1')} name="checkbox" />
                                                    <span />
                                                    Góp ý
                                                </label>
                                                <label className="checkbox checkbox-success">
                                                    <input type="radio" value="khác" onClick={() => setTypeReport('2')} name="checkbox" />
                                                    <span />
                                                    Khác
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-7">
                                        <div className="form-group">
                                            <label htmlFor="exampleTextarea">Ý kiến của bạn</label>
                                            <textarea
                                                className="form-control form-control-solid form-control-lg"
                                                id="exampleTextarea"
                                                rows={3}
                                                defaultValue={''}
                                                ref={contentRef}
                                            />
                                            <span className="form-text text-muted">
                                                Thông tin sẽ được giữ bí mật để nâng cao và cải thiện chất lượng dịch vụ
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer">
                                <div className="row">
                                    <div className="col-xl-5" />
                                    <div className="col-xl-7">
                                        <button type="button" className="btn btn-light-danger font-weight-bold mr-2" onClick={handleSubmit}>
                                            Gửi ý kiến của bạn
                                        </button>
                                        <button type="reset" className="btn btn-light font-weight-bold">
                                            Làm lại
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
                <Footer />
            </main>
        </>
    );
}

MainFeedback.propTypes = {};

export default MainFeedback;
