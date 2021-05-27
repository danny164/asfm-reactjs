import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import NoData from 'components/pages/NoData';
import moment from 'moment';
import 'moment/locale/vi';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState, useReducer } from 'react';
import DataTable from 'react-data-table-component';
import Moment from 'react-moment';
import { useAuth } from '../../../../context/AuthContext';
import CustomExpander from '../CustomExpander';

ShopList.propTypes = {
    listShop: PropTypes.array,
    getSelected: PropTypes.func,
    toggledClearRows: PropTypes.bool,
};

ShopList.defaultProps = {
    listShop: [],
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

const now = moment().format('X');

const Role = ({ row }) => (
    <>
        {row.role === '9' ? (
            <>
                <span className="font-weight-bold text-warning">Admin</span>
                <i className="fad fa-star-shooting text-warning rate-star ml-1"></i>
            </>
        ) : (
            <>
                <span className="text-muted">Shop Owner</span>
                <i className="fad fa-star-shooting text-muted rate-star ml-1"></i>
            </>
        )}
    </>
);

const LockTime = ({ row }) => (
    <>
        {row.lock_time > '4129589471' && (
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

// TODO: Phải để FilterComponent và truyền props ẩn/hiện ra bên ngoài function chính,
// ? Nếu để trong cùng 1 function không thể thực hiện song song
// ? 2 hành động search và show/hide được

const FilterComponent = ({
    filterText,
    onFilter,
    onClear,
    setHideId,
    setHideEmail,
    setHideStatus,
    setHideFullname,
    setHideRole,
    setHidePhone,
    setHideAddress,
}) => (
    <>
        <div className="d-flex align-items-center">
            <div>
                <span className="mr-2">Ẩn/hiện:</span>
                <button type="button" className="btn btn-sm btn-light mr-3" onClick={setHideId}>
                    ID
                </button>
                <button type="button" className="btn btn-sm btn-light mr-3" onClick={setHideEmail}>
                    Email
                </button>
                <button type="button" className="btn btn-sm btn-light mr-3" onClick={setHideStatus}>
                    Trạng thái
                </button>
                <button type="button" className="btn btn-sm btn-light mr-3" onClick={setHideFullname}>
                    Họ tên
                </button>
                <button type="button" className="btn btn-sm btn-light mr-3" onClick={setHideRole}>
                    Vai trò
                </button>
                <button type="button" className="btn btn-sm btn-light mr-3" onClick={setHidePhone}>
                    Số điện thoại
                </button>
                <button type="button" className="btn btn-sm btn-light mr-3" onClick={setHideAddress}>
                    Địa chỉ
                </button>
            </div>
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

function ShopList(props) {
    const { listShop, getSelected, toggledClearRows } = props;
    const { currentUser } = useAuth();

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const [pending, setPending] = useState(true);

    const [hideId, setHideId] = useReducer((hideId) => !hideId, true);
    const [hideEmail, setHideEmail] = useReducer((hideEmail) => !hideEmail, false);
    const [hideStatus, setHideStatus] = useReducer((hideStatus) => !hideStatus, false);
    const [hideRole, setHideRole] = useReducer((hideRole) => !hideRole, false);
    const [hideFullname, setHideFullname] = useReducer((hideFullname) => !hideFullname, false);
    const [hidePhone, setHidePhone] = useReducer((hidePhone) => !hidePhone, false);
    const [hideAddress, setHideAddress] = useReducer((hideAddress) => !hideAddress, false);

    let data = [];

    // data sau filter
    if (listShop) {
        data = listShop.filter(
            (item) =>
                (item.id && item.id.toLowerCase().includes(filterText.toLowerCase())) ||
                (item.fullname && item.fullname.toLowerCase().includes(filterText.toLowerCase())) ||
                (item.email && item.email.toLowerCase().includes(filterText.toLowerCase())) ||
                (item.phone && item.phone.toLowerCase().includes(filterText.toLowerCase())) ||
                (item.address && item.address.toLowerCase().includes(filterText.toLowerCase()))
        );
    }
    const columns = useMemo(
        () => [
            {
                name: 'ID',
                selector: 'id',
                sortable: true,
                omit: hideId,
            },
            {
                name: 'Email',
                selector: 'email',
                sortable: true,
                omit: hideEmail,
            },
            {
                name: 'Trạng thái / Khóa',
                selector: 'lock_time',
                sortable: true,
                cell: (row) => <LockTime row={row} />,
                omit: hideStatus,
            },
            {
                name: 'Họ tên',
                selector: 'fullname',
                sortable: true,
                omit: hideFullname,
            },
            {
                name: 'Vai trò',
                selector: 'role',
                sortable: true,
                cell: (row) => <Role row={row} />,
                omit: hideRole,
            },

            {
                name: 'Số điện thoại',
                selector: 'phone',
                sortable: true,
                omit: hidePhone,
            },
            {
                name: 'Địa chỉ',
                selector: 'address',
                sortable: true,
                right: true,
                omit: hideAddress,
            },
        ],
        [hideId, hideEmail, hideFullname, hideRole, hidePhone, hideAddress, hideStatus]
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
                setHideId={setHideId}
                setHideEmail={setHideEmail}
                setHideStatus={setHideStatus}
                setHideFullname={setHideFullname}
                setHideRole={setHideRole}
                setHidePhone={setHidePhone}
                setHideAddress={setHideAddress}
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

    // Disable selection when is admin or current user
    const rowSelectCritera = (row) => row.uid === currentUser.uid || row.role === '9';

    return (
        <>
            <DataTable
                title="Danh sách quản lý Shop"
                expandableRows={true}
                expandOnRowClicked={true}
                expandableRowsComponent={<CustomExpander data={data} now={now} />}
                contextMessage={{
                    singular: 'người dùng',
                    plural: 'người dùng',
                    message: 'đã chọn',
                }}
                columns={columns}
                data={data}
                pagination={true}
                paginationResetDefaultPage={resetPaginationToggle}
                paginationRowsPerPageOptions={[10, 15, 30, 50, 75]}
                paginationComponentOptions={{
                    rowsPerPageText: 'Số ID người dùng trên 1 trang: ',
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

export default ShopList;
