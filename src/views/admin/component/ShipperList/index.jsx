import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import CustomExpander from '../CustomExpander';

ShipperList.propTypes = {
    listShipper: PropTypes.array,
    getSelected: PropTypes.func,
};

ShipperList.defaultProps = {
    listShipper: null,
    getSelected: null,
};

function ShipperList(props) {
    const { listShipper, getSelected } = props;

    let data = [];

    if (listShipper) {
        data = listShipper;
    }

    const columns = [
        {
            name: 'ID',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Trạng thái',
            selector: 'role',
            sortable: true,
        },
        {
            name: 'Họ tên',
            selector: 'name',
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
        if (getSelected) {
            getSelected(state.selectedRows);
        }
    };

    return (
        <>
            <DataTable
                title="Danh sách quản lý Shipper"
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

export default ShipperList;
