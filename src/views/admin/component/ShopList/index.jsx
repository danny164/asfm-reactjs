import React from 'react';
import DataTable from 'react-data-table-component';

function ShopList(props) {
    const data = [
        { id: 1, title: 'Conan the Barbarian', year: '1982' },
        { id: 2, title: 'Doraemon', year: '1900' },
    ];
    const columns = [
        {
            name: 'ID',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Title',
            selector: 'title',
            sortable: true,
        },
        {
            name: 'Year',
            selector: 'year',
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

ShopList.propTypes = {};

export default ShopList;
