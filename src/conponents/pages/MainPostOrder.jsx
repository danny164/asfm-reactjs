import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Header from '../common/Header';
import Footer from '../common/Footer';
import random from 'randomstring';
import moment from 'moment';

MainPostOrder.propTypes = {
    postOrder: PropTypes.func,
};

MainPostOrder.defaultProps = {
    postOrder: null,
};

function MainPostOrder(props) {
    //////////////////////////////////////////////////////
    const { postOrder } = props;

    //////////////////////////////////////////////////////
    const dateTime = moment().format('X');
    // console.log(dateTime);
    // const test = moment().subtract(1, 'day').format('X');
    // console.log(test);

    //////////////////////////////////////////////////////
    const idPost =
        moment().format('YYYYMMDD-HHmmssSSS') +
        random.generate({
            length: 3,
            charset: 'numeric',
        });

    const idChat =
        moment().format('YYYYMMDD-HHmmssSSS') +
        random.generate({
            length: 3,
            charset: 'numeric',
        });

    //////////////////////////////////////////////////////
    const customerRef = useRef();
    const numberRef = useRef();
    const shipFeeRef = useRef();
    const depositFeeRef = useRef();
    const noteRef = useRef();
    const shipDistrcitRef = useRef();
    const shipWardRef = useRef();
    const shipAddressRef = useRef();

    //////////////////////////////////////////////////////
    const [district, setDistrict] = useState();
    const [ward, setWard] = useState();

    //////////////////////////////////////////////////////
    const dataList = {
        'Quận Cẩm Lệ': ['Phường Hòa An', 'Phường Hòa Phát', 'Phường Hòa Thọ Đông', 'Phường Hòa Thọ Tây', 'Phường Hòa Xuân', 'Phường Khuê Trung'],
        'Quận Hải Châu': [
            'Phường Bình Hiên',
            'Phường Bình Thuận',
            'Phường Hải Châu 1',
            'Phường Hải Châu 2',
            'Phường Hòa Cương Bắc',
            'Phường Hòa Cường Nam',
            'Phường Hòa Thuận Đông',
            'Phường Hòa Thuận Tây',
            'Phường Nam Dương',
            'Phường Phước Ninh',
            'Phường Thạch Thang',
            'Phường Thạnh Bình',
            'Phường Thuận Phước',
        ],
        'Quận Liên Chiểu': ['Phường Hòa Hiệp Bắc', 'Phường Hòa Hiệp Nam', 'Phường Hòa Khánh Bắc', 'Phường Hòa Khánh Nam', 'Phường Hòa Minh'],
        'Quận Ngũ Hành Sơn': ['Phường Hòa Hải', 'Phường Hòa Quý', 'Phường Khuê Mỹ', 'Phường Mỹ An'],
        'Quận Sơn Trà': [
            'Phường An Hải Bắc',
            'Phường An Hải Đông',
            'Phường An Hải Tây',
            'Phường Mân Thái',
            'Phường Nại Hiên Đông',
            'Phường Phước Mỹ',
            'Phường Thọ Quang',
        ],
        'Quận Thanh Khê': [
            'Phường An Khê',
            'Phường Chính Gián',
            'Phường Hòa Khê',
            'Phường Tam Thuận',
            'Phường Tân Chính',
            'Phường Thạc Gián',
            'Phường Thanh Khê Đông',
            'Phường Thanh Khê Tây',
            'Phường Vĩnh Trung',
            'Phường Xuân Hà',
        ],
        'Huyện Hòa Vang': [
            'Xã Hòa Bắc',
            'Xã Hòa Châu',
            'Xã Hòa Khương',
            'Xã Hòa Liên',
            'Xã Hòa Nhơn',
            'Xã Hòa Ninh',
            'Xã Hòa Phong',
            'Xã Hòa Phú',
            'Xã Hòa Phước',
            'Xã Hòa Sơn',
            'Xã Hòa Tiến',
        ],
    };

    //////////////////////////////////////////////////////
    // ! Danh sách Quận
    //////////////////////////////////////////////////////
    const districtList = () => {
        const items = [];

        for (const district in dataList) {
            items.push(<option value={district}>{district}</option>);
        }
        return items;
    };

    //////////////////////////////////////////////////////
    // ! Danh sách Phường
    //////////////////////////////////////////////////////
    const wardList = () => {
        if (!district) return;
        const items = [];
        Object.values(dataList[district]).map((data, index) => {
            items.push(
                <option key={index} value={data}>
                    {data}
                </option>
            );
        });
        return items;
    };

    //////////////////////////////////////////////////////
    // ! Reset old selection
    //////////////////////////////////////////////////////
    const handleDistrictChange = (e) => {
        if (e.target.value || e.target.value === '') {
            setDistrict(e.target.value);
            setWard('');
        }
    };

    //////////////////////////////////////////////////////
    // Handle submitForm
    function handleSubmit(e) {
        e.preventDefault();
        const dataPostOrder = {
            idPost: idPost,
            noi_giao: shipAddressRef.current.value + ', ' + shipWardRef.current.value + ', ' + shipDistrcitRef.current.value + ', Thành phố Đà Nẵng',
            ghi_chu: noteRef.current.value,
            km: '3km',
            thoi_gian: dateTime,
            sdt_nguoi_nhan: numberRef.current.value,
            ten_nguoi_nhan: customerRef.current.value,
            phi_giao: shipFeeRef.current.value,
            phi_ung: depositFeeRef.current.value,
            id_roomchat: idChat,
        };

        if (postOrder) {
            postOrder(dataPostOrder);
        }
    }

    return (
        <main className="d-flex flex-column flex-row-fluid wrapper">
            <Header />
            <section className="content d-flex flex-column flex-column-fluid">
                {/* core content */}
                <div className="core d-flex flex-column flex-row-fluid container">
                    <div className="card card-custom card-sticky" id="on_page_sticky_card">
                        <form className="form" onSubmit={handleSubmit}>
                            <header className="card-header py-3">
                                <div className="card-title align-items-start flex-column">
                                    <h3 className="card-label">Đăng đơn</h3>
                                    <span className="text-muted font-size-sm mt-1">Hãy tạo đơn mới ngay bây giờ nhé!</span>
                                </div>
                                <div className="card-toolbar">
                                    <button type="submit" className="btn btn-chartjs mr-2">
                                        Đăng ngay
                                    </button>
                                    <button type="button" className="btn btn-light mr-2">
                                        Làm lại
                                    </button>
                                </div>
                            </header>
                            {/* body card */}
                            <div className="card-body">
                                {/* customer name */}
                                <div className="form-group row">
                                    <label htmlFor="fullname" className="col-xl-3 col-lg-4 col-form-label">
                                        Khách hàng
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            id="fullname"
                                            maxLength={35}
                                            placeholder="Tên khách hàng"
                                            ref={customerRef}
                                        />
                                    </div>
                                </div>
                                {/* phone number */}
                                <div className="form-group row">
                                    <label htmlFor="phone_inputmask" className="col-xl-3 col-lg-4 col-form-label">
                                        Số điện thoại
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            id="phone_inputmask"
                                            placeholder="Số điện thoại"
                                            ref={numberRef}
                                        />
                                        {/* <span class="form-text text-muted">Some help content goes here</span> */}
                                    </div>
                                </div>
                                {/* ship fee */}
                                <div className="form-group row">
                                    <label htmlFor="ship_inputmask" className="col-xl-3 col-lg-4 col-form-label">
                                        Chi phí giao hàng
                                    </label>
                                    <div className="col-xl-9 col-lg-8 input-group">
                                        <input type="text" className="form-control" id="ship_inputmask" placeholder={0} ref={shipFeeRef} />
                                        <div className="input-group-append">
                                            <span className="input-group-text">VND</span>
                                        </div>
                                        {/* <span class="form-text text-muted">Some help content goes here</span> */}
                                    </div>
                                </div>
                                {/* temp fee */}
                                <div className="form-group row">
                                    <label htmlFor="temp" className="col-xl-3 col-lg-4 col-form-label">
                                        Tạm ứng
                                    </label>
                                    <div className="col-xl-9 col-lg-8 input-group">
                                        <input type="text" className="form-control" id="temp_inputmask" placeholder={0} ref={depositFeeRef} />
                                        <div className="input-group-append">
                                            <span className="input-group-text">VND</span>
                                        </div>
                                        {/* <span class="form-text text-muted">Some help content goes here</span> */}
                                    </div>
                                </div>
                                <div className="separator separator-dashed my-5" />
                                <div className="form-group row">
                                    <label htmlFor="note" className="col-xl-3 col-lg-4 col-form-label">
                                        Ghi chú
                                    </label>
                                    <div className="col-xl-9 col-lg-8 input-group">
                                        <textarea
                                            className="form-control"
                                            id="note_maxlength"
                                            maxLength={150}
                                            rows={3}
                                            placeholder="Viết ghi chú cho shipper"
                                            ref={noteRef}
                                        />
                                        {/* <span class="form-text text-muted">Some help content goes here</span> */}
                                    </div>
                                </div>

                                <div className="row">
                                    <label className="col-xl-3 col-lg-4" />
                                    <div className="col-xl-9 col-lg-8">
                                        <h5 className="font-weight-normal mt-0 mb-6">Địa chỉ lấy hàng mặc định</h5>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-4 col-form-label"></label>
                                    <div className="col-xl-9 col-lg-8">
                                        <span className="switch">
                                            <label>
                                                <input type="checkbox" defaultChecked="checked" name="select" />
                                                <span />
                                            </label>
                                        </span>
                                    </div>
                                </div>

                                <div className="row">
                                    <label className="col-xl-3 col-lg-4" />
                                    <div className="col-xl-9 col-lg-8">
                                        <h5 className="font-weight-normal mt-10 mb-6">Địa chỉ giao hàng tới</h5>
                                    </div>
                                </div>
                                {/* Tỉnh/Thành phố */}
                                <div className="form-group row">
                                    <label htmlFor="city" className="col-xl-3 col-lg-4 col-form-label">
                                        Tỉnh/Thành phố
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <input
                                            className="form-control form-control-lg form-control-solid"
                                            type="text"
                                            id="city"
                                            defaultValue="Thành phố Đà Nẵng"
                                            readOnly
                                        />
                                    </div>
                                </div>

                                {/* Huyện */}
                                <div className="form-group row">
                                    <label htmlFor="district" className="col-xl-3 col-lg-4 col-form-label">
                                        Quận/Huyện
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <select
                                            className="form-control form-control-lg"
                                            id="district"
                                            value={district}
                                            onChange={handleDistrictChange}
                                            ref={shipDistrcitRef}
                                        >
                                            <option value="">Chọn Quận/Huyện</option>
                                            {districtList()}
                                        </select>
                                    </div>
                                </div>

                                {/* Xã */}
                                <div className="form-group row">
                                    <label htmlFor="ward" className="col-xl-3 col-lg-4 col-form-label">
                                        Phường/Xã
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <select
                                            className="form-control form-control-lg"
                                            id="ward"
                                            value={ward}
                                            onChange={(e) => setWard(e.target.value)}
                                            ref={shipWardRef}
                                        >
                                            <option value="">Chọn Phường/Xã</option>
                                            {wardList()}
                                        </select>
                                    </div>
                                </div>

                                {/* Địa chỉ */}
                                <div className="form-group row">
                                    <label htmlFor="address" className="col-xl-3 col-lg-4 col-form-label">
                                        Địa chỉ
                                    </label>
                                    <div className="col-xl-9 col-lg-8">
                                        <input
                                            className="form-control form-control-lg"
                                            type="text"
                                            maxLength={50}
                                            id="address"
                                            placeholder="Số nhà, tên đường"
                                            ref={shipAddressRef}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default MainPostOrder;
