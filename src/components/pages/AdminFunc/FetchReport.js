import { realtime } from '../../../firebase';

export const fetchReport = async (uid, setReportData) => {
    await realtime.ref('report/' + uid).on('value', (snapshot) => {
        if (snapshot.val() !== null) {
            setReportData(snapshot.val());
        } else {
            setReportData();
        }
    });
};
