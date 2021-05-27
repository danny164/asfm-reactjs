import { realtime } from '../../../firebase';
import React from 'react';



export const fetchReport = async (uid, setReportData) => {
        await realtime.ref('report/' + uid).on('value', (snapshot) => {
            if (snapshot.val() !== null) {
                setReportData(snapshot.val())
            }
        })
}

function FetchReport(props) {
    return (
        <div>

        </div>
    );
}

export default FetchReport;