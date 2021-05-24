import { SyncIcon } from '@primer/octicons-react';
import React from 'react';

function Open(props) {
    return (
        <span className="font-weight-bold text-success ml-2">
            Mở <SyncIcon size={14} />
        </span>
    );
}

Open.propTypes = {};

export default Open;
