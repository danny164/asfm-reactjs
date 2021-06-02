import Footer from 'components/common/Footer';
import Header from 'components/common/Header';
import Admin from 'components/labels/Admin';
import Close from 'components/labels/Close';
import Open from 'components/labels/Open';
import Seen from 'components/labels/Seen';
import Unseen from 'components/labels/Unseen';
import { dateToFromNowDaily } from 'convert/DateToFromNow';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonMailBox from '../Skeleton/SkeletonMailBox';
import './styles.scss';

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

    // ! delay loading chờ lấy thông tin
    const [loading, setLoading] = useState(false);
    const [sortMailbox, setSortMailbox] = useState([]);
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(async () => {
            if (datas) {
                await setSortMailbox(Object.values(datas).sort((a, b) => (a.thoi_gian < b.thoi_gian ? 1 : -1)));
                await setItems(
                    Object.values(datas)
                        .sort((a, b) => (a.thoi_gian < b.thoi_gian ? 1 : -1))
                        .slice(0, 5)
                );
            } else {
                setSortMailbox([]);
            }

            setLoading(false);
        }, 800);

        return () => {
            clearTimeout(timer);
        };
    }, [datas]);

    const fetchMoreData = async () => {
        let index = items.length + 5;

        if (items.length >= sortMailbox.length) {
            setHasMore(false);
            return;
        }
        setTimeout(() => {
            setItems(sortMailbox.slice(0, index));
        }, 1500);
    };

    useEffect(() => {
        setHasMore(true);
    }, [datas]);

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
                                            {datas !== null ? Object.values(datas).length : 0}
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

                        <section className="card-body pt-1 newsfeed">
                            {loading && <SkeletonMailBox />}

                            {!loading && (
                                <InfiniteScroll
                                    dataLength={items.length}
                                    next={fetchMoreData}
                                    hasMore={hasMore}
                                    loader={items.length !== 0 && sortMailbox.length > 5 && <SkeletonMailBox />}
                                    endMessage={
                                        items.length !== 0 && (
                                            <p style={{ textAlign: 'center' }}>
                                                <span className="font-weight-bold">Yay! Hết cái để xem rồi nà !</span>
                                            </p>
                                        )
                                    }
                                >
                                    {items.map((data) => (
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
                                                                <span className="font-weight-bold mr-1">
                                                                    Trạng thái:
                                                                </span>
                                                                {data.status === '0' ? <Open /> : <Close />}
                                                            </p>
                                                            <p>
                                                                <span className="font-weight-bold mr-1">
                                                                    Mã đơn hàng:
                                                                </span>
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
                                </InfiniteScroll>
                            )}

                            {!loading && sortMailbox.length === 0 && (
                                <>
                                    <article className="empty-order">
                                        <span className="text menu-in-progress">Bạn chưa có phản hồi nào !</span>
                                    </article>
                                </>
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
