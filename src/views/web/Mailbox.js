import AsideLeft from 'components/pages/AsideLeft';
import AsideRight from 'components/pages/AsideRight';
import MainMailbox from 'components/pages/Mailbox';
import { useAuth } from 'context/AuthContext';
import React, { useEffect, useState } from 'react';
import fetchReport from '../../components/pages/AdminFunc/FetchReport'
import { realtime } from '../../firebase'
function Mailbox(props) {
    const { currentUser } = useAuth()
    const { reportData, setReportData } = useState()

    useEffect(() => {
        fetchReport(currentUser.uid, setReportData);
    }, [])

    const deleteAll = async () => {
        realtime.ref("report/" + currentUser.uid).remove()
    }

    const deleteResponse = async () => {
        let responseData = await Object.values(reportData).filter(() => reportData.status === "1")
        responseData.map((data) => {
            realtime.ref("report/" + currentUser.uid + '/' + data.id_report).remove()
        })
    }

    const deleteUnResponse = async () => {
        let responseData = await Object.values(reportData).filter(() => reportData.status === "0")
        responseData.map((data) => {
            realtime.ref("report/" + currentUser.uid + '/' + data.id_report).remove()
        })
    }

    return (
        <div className="header-fixed sidebar-enabled bg">
            <div className="d-flex flex-row flex-column-fluid page">
                <AsideLeft />
                <MainMailbox datas={reportData} deleteAllReport={deleteAll} deleteUnResponseReport={deleteUnResponse} deleteResponseReport={deleteResponse} />
                <AsideRight />
            </div>
        </div>
    );
}

Mailbox.propTypes = {};

export default Mailbox;
