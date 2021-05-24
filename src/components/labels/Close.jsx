import { IssueReopenedIcon } from '@primer/octicons-react';
import React from 'react';

function Close(props) {
    return (
        <span className="font-weight-bold text-danger ml-2">
            Đóng <IssueReopenedIcon size={14} />
        </span>
    );
}

Close.propTypes = {};

export default Close;
