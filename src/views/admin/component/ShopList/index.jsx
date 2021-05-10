import React from 'react';
import DataTable from 'react-data-table-component';
import PropTypes from 'prop-types';
import CustomExpander from '../CustomExpander';

ShopList.propTypes = {
    listShop: PropTypes.array,
};

ShopList.defaultProps = {
    listShop: null,
};

function ShopList(props) {
    const { listShop } = props;

    let data = [];

    if (listShop) {
        data = listShop;
    }

    const status = [
        {
            id: 1,
            name: 'Đang hoạt động',
            className: 'label label-sm label-inprocess label-inline py-4 flex-shrink-0',
        },
        {
            id: 2,
            name: 'Vô hiệu hóa',
            className: 'label label-sm label-inline py-4 flex-shrink-0',
        },
    ];

    const columns = [
        {
            name: 'id',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Trạng thái',
            selector: 'role',
            sortable: true,
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
        },
        {
            name: 'Họ tên',
            selector: 'fullname',
            sortable: true,
        },

        {
            name: 'Số điện thoại',
            selector: 'phone',
            sortable: true,
        },
        {
            name: 'Địa chỉ',
            selector: 'address',
            sortable: true,
            right: true,
        },
    ];

    const handleChange = (state) => {
        console.log('Số hàng đã chọn: ', state.selectedRows);
    };

    return (
        <>
            <DataTable
                title="Danh sách quản lý Shop"
                expandableRows={true}
                expandableRowsComponent={<CustomExpander />}
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
            />
        </>
    );
}

export default ShopList;
