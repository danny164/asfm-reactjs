import Footer from 'components/common/Footer';
import Header from 'components/common/Header';
import Admin from 'components/labels/Admin';
import Close from 'components/labels/Close';
import Open from 'components/labels/Open';
import Seen from 'components/labels/Seen';
import Unseen from 'components/labels/Unseen';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './styles.scss';
import PropTypes from 'prop-types';
import { dateToFromNowDaily } from 'convert/DateToFromNow';

MainMailbox.propTypes = {
    datas: PropTypes.object,
    deleteAll: PropTypes.func,
    deleteResponse: PropTypes.func,
    deleteUnResponse: PropTypes.func,
};

MainMailbox.defaultProps = {
    datas: null,
    deleteAll: null,
    deleteResponse: null,
    deleteUnResponse: null,
};

function MainMailbox(props) {
    const { datas, deleteAll, deleteResponse, deleteUnResponse } = props;

    const deleteAllReport = async () => {
        if (deleteAll) {
            deleteAll();
        }
    };

    const deleteResponseReport = async () => {
        if (deleteResponse) {
            deleteResponse();
        }
    };

    const deleteUnResponseReport = async () => {
        if (deleteUnResponse) {
            deleteUnResponse();
        }
    };
    return (
        <>
            <main className="d-flex flex-column flex-row-fluid wrapper">
                <Header />
                <section className="d-flex flex-column flex-row-fluid container">
                    <div className="card card-custom card-bottom">
                        <header className="card-header border-0">
                            <div className="card-title py-4">
                                <h3 className="card-label">
                                    <span className="d-block title">
                                        Hộp thư phản hồi
                                        <span className="label label-sm label-light label-rounded font-weight-bolder ml-2">
                                            12
                                        </span>
                                    </span>

                                    <span className="d-block text-time mt-2 font-size-sm">
                                        Phản hồi sẽ được xử lý trong vòng 48h
                                    </span>
                                </h3>
                            </div>
                            <div className="card-toolbar">
                                <Dropdown>
                                    <Dropdown.Toggle split={false} variant="clean remove" id="dropdown-basic">
                                        <i className="fad fa-ellipsis-h pr-0"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={deleteAllReport}>Xóa tất cả</Dropdown.Item>
                                        <Dropdown.Item onClick={deleteUnResponseReport}>
                                            Xóa tất cả đơn chưa phản hồi
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={deleteResponseReport}>
                                            Xóa tất cả đơn đã phản hồi
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </header>
                        {console.log(datas)}

                        <section className="card-body pt-1 newsfeed">
                            {datas !== null &&
                                Object.values(datas).map((data) => (
                                    <article
                                        className="mb-5"
                                        style={{
                                            padding: '10px',
                                            borderRadius: '6px',
                                            color: 'rgb(57, 58, 52)',
                                            backgroundColor: 'rgba(246, 248, 250)',
                                            overflow: 'auto',
                                        }}
                                    >
                                        <div className="d-flex align-items-start">
                                            <span className="bullet bullet-bar bg-orange align-self-stretch" />
                                            <div className="d-flex flex-column flex-grow-1 ml-4">
                                                <header className="card-title content">
                                                    <span>{data.id_report}</span>
                                                    <span className="flex-shrink-0">
                                                        {dateToFromNowDaily(data.time)}
                                                    </span>
                                                </header>
                                                <section className="card-info content">
                                                    <div className="mb-3">
                                                        <p>
                                                            <span className="font-weight-bold mr-1">Trạng thái:</span>
                                                            {data.status === '0' ? <Open /> : <Close />}
                                                        </p>
                                                        <p>
                                                            <span className="font-weight-bold mr-1">Mã đơn hàng:</span>
                                                            <span className="font-weight-bold text-brown">{`#${data.id_post}`}</span>
                                                        </p>
                                                    </div>
                                                    <span className="delivery">Nội dung:</span>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <p className="mb-0 pl-0">{data.content}</p>
                                                        {data.status === '0' ? <Unseen /> : <Seen />}
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                        <div className="separator separator-dashed my-2" />
                                        <div className="text-brown">
                                            {data.status === '0' ? (
                                                'Đang chờ admin phản hồi ! Thời gian phản hồi trong 2 ngày làm việc'
                                            ) : (
                                                <>
                                                    <Admin /> {data.admin}
                                                </>
                                            )}
                                        </div>
                                    </article>
                                ))}

                            {datas === null && (
                                <article className="empty-order">
                                    <span className="text menu-in-progress">Bạn chưa có phản hồi nào !</span>
                                </article>
                            )}
                        </section>
                    </div>
                </section>
                <Footer />
            </main>
        </>
    );
}

export default MainMailbox;
