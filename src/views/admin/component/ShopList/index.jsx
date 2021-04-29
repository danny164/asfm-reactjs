import React from 'react';
import DataTable from 'react-data-table-component';
import PropTypes from 'prop-types';

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
    const columns = [
        {
            name: 'ID',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Name',
            selector: 'fullname',
            sortable: true,
        },
        {
            name: 'Address',
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
