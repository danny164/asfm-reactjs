import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import NoData from 'components/pages/NoData';
import { dateToFromNowDaily } from 'convert/DateToFromNow';
import 'moment/locale/vi';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import ContentExpander from '../ContentExpander';

Service.propTypes = {
    getSelected: PropTypes.func,
    toggledClearRows: PropTypes.bool,
    serviceData: PropTypes.array,
};

Service.defaultProps = {
    getSelected: null,
    toggledClearRows: false,
    serviceData: [],
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

const ConvertPostTime = ({ row }) => <>{row.time && dateToFromNowDaily(row.time)}</>;

const Type = ({ row }) => (
    <>
        {row.type === '0' && (
            <span className="label label-sm label-light-danger label-inline py-4 flex-shrink-0">Khiếu nại</span>
        )}
        {row.type === '1' && (
            <span className="label label-sm label-light-success label-inline py-4 flex-shrink-0">Góp ý</span>
        )}
        {row.type === '2' && (
            <span className="label label-sm label-light-warning label-inline py-4 flex-shrink-0">Khác</span>
        )}
    </>
);

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <div className="d-flex align-items-center">
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

function Service(props) {
    const { getSelected, toggledClearRows, serviceData } = props;
    const [pending, setPending] = useState(true);

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    let data = [];

    if (serviceData) {
        data = serviceData.filter(
            (item) =>
                (item.id_feedback && item.id_feedback.toLowerCase().includes(filterText.toLowerCase())) ||
                (item.content && item.content.toLowerCase().includes(filterText.toLowerCase())) ||
                (item.fullname && item.fullname.toLowerCase().includes(filterText.toLowerCase())) ||
                (item.email && item.email.toLowerCase().includes(filterText.toLowerCase()))
        );
    }

    const columns = useMemo(
        () => [
            {
                name: 'ID',
                selector: 'id_feedback',
                sortable: true,
            },
            {
                name: 'Loại',
                selector: 'type',
                sortable: true,
                cell: (row) => <Type row={row} />,
            },
            {
                name: 'Nội dung',
                selector: 'content',
                sortable: true,
            },
            {
                name: 'Họ tên',
                selector: 'fullname',
                sortable: true,
            },
            {
                name: 'Email',
                selector: 'email',
                sortable: true,
            },
            {
                name: 'Thời gian',
                selector: 'time',
                sortable: true,
                cell: (row) => <ConvertPostTime row={row} />,
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

    return (
        <>
            <DataTable
                title="Danh sách quản lý Chất lượng dịch vụ"
                expandableRows={true}
                expandOnRowClicked={true}
                expandableRowsComponent={<ContentExpander data={data} />}
                contextMessage={{
                    singular: 'đơn',
                    plural: 'đơn',
                    message: 'đã chọn',
                }}
                data={data}
                columns={columns}
                pagination={true}
                paginationResetDefaultPage={resetPaginationToggle}
                paginationRowsPerPageOptions={[10, 15, 30, 50, 75]}
                paginationComponentOptions={{
                    rowsPerPageText: 'Số đơn trên 1 trang: ',
                    rangeSeparatorText: 'của',
                }}
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

export default Service;
