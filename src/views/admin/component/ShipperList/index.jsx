import moment from 'moment';
import 'moment/locale/vi';
import PropTypes from 'prop-types';
import React from 'react';
import DataTable from 'react-data-table-component';
import Moment from 'react-moment';
import CustomExpander from '../CustomExpander';
import './styles.scss';

ShipperList.propTypes = {
    listShipper: PropTypes.array,
    getSelected: PropTypes.func,
    toggledClearRows: PropTypes.bool,
};

ShipperList.defaultProps = {
    listShipper: [],
    getSelected: null,
    toggledClearRows: false,
};

const status = [
    {
        id: 1,
        name: 'Đang hoạt động',
        className: 'label label-sm label-light-success label-inline py-4 flex-shrink-0',
    },
    {
        id: 2,
        name: 'Tạm thời khóa',
        className: 'label label-sm label-light-warning label-inline py-4 flex-shrink-0',
    },
    {
        id: 3,
        name: 'Khóa vĩnh viễn',
        className: 'label label-sm label-light-danger label-inline py-4 flex-shrink-0',
    },
];

const columns = [
    {
        name: 'ID',
        selector: 'id',
        sortable: true,
        omit: true,
    },
    {
        name: 'Email',
        selector: 'email',
        sortable: true,
    },
    {
        name: 'Trạng thái / Khóa',
        selector: 'lock_time',
        sortable: true,
        cell: (row) => <LockTime row={row} />,
    },
    {
        name: 'Họ tên',
        selector: 'fullname',
        sortable: true,
    },
    {
        name: 'Rating',
        selector: 'rate_star',
        sortable: true,
        cell: (row) => <Star row={row} />,
    },
    {
        name: 'Số điện thoại',
        selector: 'phone',
        sortable: true,
        cell: (row) => <Phone row={row} />,
    },
    {
        name: 'Địa chỉ',
        selector: 'address',
        sortable: true,
        right: true,
    },
];

const convertPhone = (phone) => {
    const match = phone.match(/^(\d{4})(\d{3})(\d{3})$/);
    if (match) {
        return [match[1], match[2], match[3]].join(' ');
    }
    return null;
};

const Phone = ({ row }) => <>{row.phone && convertPhone(row.phone)}</>;

const Star = ({ row }) => (
    <>
        {row.rate_star && (
            <span className="font-weight-bold text-warning ml-2">
                {row.rate_star}
                <i className="fad fa-star-shooting text-warning rate-star ml-1"></i>
            </span>
        )}
    </>
);

const now = moment().format('X');

const LockTime = ({ row }) => (
    <>
        {row.lock_time && row.lock_time > '4129589471' && (
            <span className={status[2].className}>
                <i className="fad fa-clock mr-1 text-chartjs"></i>
                {status[2].name}
            </span>
        )}
        {row.lock_time > now && row.lock_time < '4129589471' && (
            <span className={status[1].className}>
                <i className="fad fa-clock mr-1 text-warning"></i>
                <Moment interval={1000} unix durationFromNow format="HH [h] mm [m] ss">
                    {row.lock_time}
                </Moment>
            </span>
        )}
        {(!row.lock_time || row.lock_time < now) && <span className={status[0].className}>{status[0].name}</span>}
    </>
);

function ShipperList(props) {
    const { listShipper, getSelected, toggledClearRows } = props;

    let data = [];

    if (listShipper) {
        data = listShipper;
    }

    const handleChange = (state) => {
        if (getSelected) {
            getSelected(state.selectedRows);
        }
    };

    return (
        <>
            <DataTable
                title="Danh sách quản lý Shipper"
                expandableRows={true}
                expandableRowsComponent={<CustomExpander data={data} now={now} shipper={true} />}
                contextMessage={{ singular: 'người dùng', plural: 'người dùng', message: 'đã chọn' }}
                columns={columns}
                data={data}
                pagination={true}
                paginationRowsPerPageOptions={[10, 15, 30, 50, 75]}
                paginationComponentOptions={{ rowsPerPageText: 'Số ID người dùng trên 1 trang: ', rangeSeparatorText: 'của' }}
                selectableRows // add for checkbox selection
                selectableRowsVisibleOnly={true}
                selectableRowsHighlight={true}
                onSelectedRowsChange={handleChange}
                clearSelectedRows={toggledClearRows}
            />
        </>
    );
}

export default ShipperList;
