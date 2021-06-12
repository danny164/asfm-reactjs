import AsideLeft from 'components/pages/AsideLeft';
import AsideRight from 'components/pages/AsideRight';
import MainMailbox from 'components/pages/Mailbox';
import { useAuth } from 'context/AuthContext';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { fetchReport } from '../../components/pages/AdminFunc/FetchReport';
import { realtime } from '../../firebase';

function Mailbox(props) {
    const { currentUser } = useAuth();
    const [reportData, setReportData] = useState();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetchReport(currentUser.uid, setReportData);
    }, []);

    if (reportData) {
        try {
            Object.values(reportData)
                .filter((data) => data.read === 0)
                .map((data) => {
                    realtime.ref('report/' + currentUser.uid + '/' + data.id_report).update({ read: 1 });
                });
        } catch (err) {
            console.log(err);
        }
    }
    // if (reportData) {
    //     let datas = []
    //     Object.values(reportData).map((data) => {
    //         datas.push(data)
    //     })

    //     datas = datas.filter((data) => data.read === 0)

    //     datas.map((data) => {
    //         realtime.ref('report/' + currentUser.uid + '/' + data.id_report).update({ read: 1 })
    //     })
    // }

    const deleteAll = async () => {
        try {
            realtime.ref('report/' + currentUser.uid).remove();
            enqueueSnackbar('Đã xóa tất cả đơn thành công', { variant: 'success' });
        } catch (e) {
            enqueueSnackbar('Không có đơn nào để xóa !', { variant: 'info' });
        }
    };

    const deleteResponse = async () => {
        try {
            let responseData = await Object.values(reportData).filter((data) => data.status === '1');
            if (responseData.length !== 0) {
                responseData.map((data) => {
                    realtime.ref('report/' + currentUser.uid + '/' + data.id_report).remove();
                });
                enqueueSnackbar('Đã xóa tất cả đơn đã phản hồi thành công', { variant: 'success' });
            }
        } catch (e) {
            enqueueSnackbar('Không có đơn nào để xóa !', { variant: 'info' });
        }
    };

    const deleteUnResponse = async () => {
        try {
            let responseData = await Object.values(reportData).filter((data) => data.status === '0');
            if (responseData.length !== 0) {
                responseData.map((data) => {
                    realtime.ref('report/' + currentUser.uid + '/' + data.id_report).remove();
                });
                enqueueSnackbar('Đã xóa tất cả đơn chưa phản hồi thành công', { variant: 'success' });
            }
        } catch (e) {
            enqueueSnackbar('Không có đơn nào để xóa !', { variant: 'info' });
        }
    };

    return (
        <div className="header-fixed sidebar-enabled bg">
            <div className="d-flex flex-row flex-column-fluid page">
                <AsideLeft />
                <MainMailbox
                    datas={reportData}
                    deleteAll={deleteAll}
                    deleteUnResponse={deleteUnResponse}
                    deleteResponse={deleteResponse}
                />
                <AsideRight />
            </div>
        </div>
    );
}

Mailbox.propTypes = {};

export default Mailbox;
