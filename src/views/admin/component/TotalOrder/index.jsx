import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import Cancelled from 'components/labels/Cancelled';
import Completed from 'components/labels/Completed';
import InProcessing from 'components/labels/InProcessing';
import Picked from 'components/labels/Picked';
import NoData from 'components/pages/NoData';
import { dateToFromNowDaily } from 'convert/DateToFromNow';
import 'moment/locale/vi';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import DataTable from 'react-data-table-component';
import TotalOrderExpander from '../TotalOrderExpander';

TotalOrder.propTypes = {
    orderData: PropTypes.array,
    getSelected: PropTypes.func,
    toggledClearRows: PropTypes.bool,
};
TotalOrder.defaultProps = {
    orderData: [],
    getSelected: null,
    toggledClearRows: false,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const LinearIndeterminate = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <LinearProgress />
        </div>
    );
};

const ConvertPostTime = ({ row }) => <>{row.thoi_gian && dateToFromNowDaily(row.thoi_gian)}</>;
const ConvertPickedTime = ({ row }) => <>{row.picked_time && dateToFromNowDaily(row.picked_time)}</>;
const ConvertCompletedTime = ({ row }) => <>{row.completed_time && dateToFromNowDaily(row.completed_time)}</>;
const ConvertStatus = ({ row }) => (
    <>
        {row.status === '0' && <InProcessing />}
        {row.status === '1' && <Picked />}
        {row.status === '2' && <Completed />}
        {row.status === '3' && <Cancelled />}
    </>
);

// TODO: Phải để FilterComponent và truyền props ẩn/hiện ra bên ngoài function chính,
// ? Nếu để trong cùng 1 function không thể thực hiện song song
// ? 2 hành động search và show/hide được

const FilterComponent = ({ filterText, onFilter, onClear, setHideIdShop, setHideStatus }) => (
    <>
        <div className="d-flex align-items-center">
            <div></div>
            <div className="form-group mb-0">
                <div className="input-group">
                    <input
                        id="search"
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiếm..."
                        value={filterText}
                        onChange={onFilter}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-secondary" type="button" onClick={onClear}>
                            Xóa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
);

function TotalOrder(props) {
    const { orderData, getSelected, toggledClearRows } = props;

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const [pending, setPending] = useState(true);

    let data = [];

    if (orderData) {
        data = orderData.filter(
            (item) =>
                (item.id_post && item.id_post.toLowerCase().includes(filterText.toLowerCase())) ||
                (item.id_shop && item.id_shop.toLowerCase().includes(filterText.toLowerCase())) ||
                (item.ten_nguoi_gui && item.ten_nguoi_gui.toLowerCase().includes(filterText.toLowerCase())) ||
                (item.noi_giao && item.noi_giao.toLowerCase().includes(filterText.toLowerCase())) ||
                (item.sdt_nguoi_gui && item.sdt_nguoi_gui.toLowerCase().includes(filterText.toLowerCase())) ||
                (item.ten_nguoi_nhan && item.ten_nguoi_nhan.toLowerCase().includes(filterText.toLowerCase())) ||
                (item.noi_nhan && item.noi_nhan.toLowerCase().includes(filterText.toLowerCase())) ||
                (item.sdt_nguoi_nhan && item.sdt_nguoi_nhan.toLowerCase().includes(filterText.toLowerCase()))
        );
    }

    const columns = useMemo(
        () => [
            {
                name: 'ID đơn',
                selector: 'id_post',
                sortable: true,
            },
            {
                name: 'ID shop',
                selector: 'id_shop',
                sortable: true,
                omit: true,
            },
            {
                name: 'Trạng thái',
                selector: 'status',
                sortable: true,
                cell: (row) => <ConvertStatus row={row} />,
                center: true,
            },
            {
                name: 'Người gửi',
                selector: 'ten_nguoi_gui',
                sortable: true,
            },
            {
                name: 'Nơi nhận',
                selector: 'noi_nhan',
                sortable: true,
                omit: true,
            },
            {
                name: 'SĐT người gửi',
                selector: 'sdt_nguoi_gui',
                sortable: true,
            },

            {
                name: 'Người nhận',
                selector: 'ten_nguoi_nhan',
                sortable: true,
            },
            {
                name: 'Nơi Giao',
                selector: 'noi_giao',
                sortable: true,
                omit: true,
            },
            {
                name: 'SĐT người nhận',
                selector: 'sdt_nguoi_nhan',
                sortable: true,
            },
            {
                name: 'Phí giao',
                selector: 'phi_giao',
                sortable: true,
                omit: true,
            },
            {
                name: 'Phí ứng',
                selector: 'phi_ung',
                sortable: true,
                omit: true,
            },

            {
                name: 'Số Km',
                selector: 'km',
                sortable: true,
            },
            {
                name: 'Thời gian đăng đơn',
                selector: 'thoi_gian',
                sortable: true,
                omit: true,
                cell: (row) => <ConvertPostTime row={row} />,
            },

            {
                name: 'Thời gian nhận hàng',
                selector: 'picked_time',
                sortable: true,
                cell: (row) => <ConvertPickedTime row={row} />,
            },
            {
                name: 'Thời gian hoàn thành',
                selector: 'completed_time',
                sortable: true,
                cell: (row) => <ConvertCompletedTime row={row} />,
            },
        ],
        []
    );

    // Header phụ
    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

    // Loading time
    useEffect(() => {
        const timeout = setTimeout(() => {
            setPending(false);
        }, 1200);
        return () => clearTimeout(timeout);
    }, []);

    // Show the number of selected rows
    const handleChange = (state) => {
        console.log('Số rows', state.selectedRows);
        if (getSelected) {
            getSelected(state.selectedRows);
        }
    };

    // Disable completed order
    const rowSelectCritera = (row) => row.status === '2' || row.status === '3';

    return (
        <>
            <DataTable
                title="Danh sách tất cả các đơn"
                expandableRows={true}
                expandOnRowClicked={true}
                expandableRowsComponent={<TotalOrderExpander data={data} />}
                contextMessage={{
                    singular: 'đơn',
                    plural: 'đơn',
                    message: 'đã chọn',
                }}
                columns={columns}
                data={data}
                pagination={true}
                paginationResetDefaultPage={resetPaginationToggle}
                paginationRowsPerPageOptions={[10, 15, 30, 50, 75]}
                paginationComponentOptions={{
                    rowsPerPageText: 'Số đơn trên 1 trang: ',
                    rangeSeparatorText: 'của',
                }}
                selectableRows // add for checkbox selection
                selectableRowsVisibleOnly={true}
                selectableRowsHighlight={true}
                onSelectedRowsChange={handleChange}
                clearSelectedRows={toggledClearRows}
                selectableRowDisabled={rowSelectCritera}
                progressPending={pending}
                progressComponent={<LinearIndeterminate />}
                subHeader
                subHeaderWrap
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
                noDataComponent={<NoData />}
            />
        </>
    );
}

export default TotalOrder;
