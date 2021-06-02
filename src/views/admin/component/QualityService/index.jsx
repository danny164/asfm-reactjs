import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import NoData from 'components/pages/NoData';
import { dateToFromNowDaily } from 'convert/DateToFromNow';
import 'moment/locale/vi';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';

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

function Service(props) {
    const { getSelected, toggledClearRows, serviceData } = props;
    const [pending, setPending] = useState(true);

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
                // expandOnRowClicked={true}
                // expandableRowsComponent={<CustomExpander data={data} now={now} />}
                contextMessage={{
                    singular: 'đơn',
                    plural: 'đơn',
                    message: 'đã chọn',
                }}
                data={serviceData}
                columns={columns}
                pagination={true}
                // paginationResetDefaultPage={resetPaginationToggle}
                paginationRowsPerPageOptions={[10, 15, 30, 50, 75]}
                paginationComponentOptions={{
                    rowsPerPageText: 'Số đơn trên 1 trang: ',
                    rangeSeparatorText: 'của',
                }}
                // selectableRows // add for checkbox selection
                // selectableRowsVisibleOnly={true}
                // selectableRowsHighlight={true}
                // onSelectedRowsChange={handleChange}
                // clearSelectedRows={toggledClearRows}
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

export default Service;
