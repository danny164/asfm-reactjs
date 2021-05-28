import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import NoData from 'components/pages/NoData';
import 'moment/locale/vi';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';

Report.propTypes = {
    getSelected: PropTypes.func,
    toggledClearRows: PropTypes.bool,
};
Report.defaultProps = {
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

function Report(props) {
    const { getSelected, toggledClearRows } = props;
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
            },
            {
                name: 'Trạng thái',
                selector: 'status',
                sortable: true,
            },
            {
                name: 'Loại',
                selector: 'type',
                sortable: true,
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
                name: 'Số điện thoại',
                selector: 'phone',
                sortable: true,
            },
            {
                name: 'Thời gian',
                selector: 'time',
                sortable: true,
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
                // data={data}
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
