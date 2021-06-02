import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import NoData from 'components/pages/NoData';
import { dateToFromNowDaily } from 'convert/DateToFromNow';
import 'moment/locale/vi';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';

Report.propTypes = {
    getSelected: PropTypes.func,
    toggledClearRows: PropTypes.bool,
    reportData: PropTypes.array,
};
Report.defaultProps = {
    getSelected: null,
    toggledClearRows: false,
    reportData: [],
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
const By = ({ row }) => (
    <>
        {row.by === '0' && (
            <>
                <span className="text-muted">Shop Owner</span>
                <i className="fad fa-star-shooting text-muted rate-star ml-1"></i>
            </>
        )}
        {row.by === '1' && (
            <>
                <span className="text-muted">Shipper</span>
                <i className="fad fa-star-shooting text-muted rate-star ml-1"></i>
            </>
        )}
    </>
);
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

function Report(props) {
    const { getSelected, toggledClearRows, reportData } = props;
    const [pending, setPending] = useState(true);

    const columns = useMemo(
        () => [
            {
                name: 'ID báo cáo',
                selector: 'id_report',
                sortable: true,
                omit: true,
            },
            {
                name: 'ID đơn',
                selector: 'id_post',
                sortable: true,
            },
            {
                name: 'Bởi',
                selector: 'by',
                sortable: true,
                cell: (row) => <By row={row} />,
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
            {
                name: 'Admin phản hồi',
                selector: 'admin',
                sortable: true,
                omit: true,
            },
        ],
        []
    );

    // Loading time
    useEffect(() => {
        const timeout = setTimeout(() => {
            setPending(false);
        }, 1200);
        return () => clearTimeout(timeout);
    }, []);

    // Show the number of selected rows
    // console.log(state) // {allSelected: false, selectedCount: 1, selectedRows: Array(1)}
    const handleChange = (state) => {
        console.log('Số rows', state.selectedRows);
        if (getSelected) {
            getSelected(state.selectedRows);
        }
    };

    return (
        <>
            <DataTable
                title="Danh sách quản lý Khiếu nại đơn"
                expandableRows={true}
                // expandOnRowClicked={true}
                // expandableRowsComponent={<CustomExpander data={data} now={now} />}
                contextMessage={{
                    singular: 'đơn',
                    plural: 'đơn',
                    message: 'đã chọn',
                }}
                data={reportData}
                columns={columns}
                pagination={true}
                // paginationResetDefaultPage={resetPaginationToggle}
                paginationRowsPerPageOptions={[10, 15, 30, 50, 75]}
                paginationComponentOptions={{
                    rowsPerPageText: 'Số đơn trên 1 trang: ',
                    rangeSeparatorText: 'của',
                }}
                selectableRows // add for checkbox selection
                selectableRowsVisibleOnly={true}
                selectableRowsHighlight={true}
                selectableRowsNoSelectAll={true}
                onSelectedRowsChange={handleChange}
                clearSelectedRows={toggledClearRows}
                // selectableRowDisabled={rowSelectCritera}
                progressPending={pending}
                progressComponent={<LinearIndeterminate />}
                // subHeader
                // subHeaderWrap
                // subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
                noDataComponent={<NoData />}
            />
        </>
    );
}

export default Report;
