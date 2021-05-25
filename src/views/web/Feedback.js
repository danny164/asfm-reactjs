import AsideLeft from 'components/pages/AsideLeft';
import AsideRight from 'components/pages/AsideRight';
import MainFeedback from 'components/pages/Feedback';
import moment from 'moment';
import React from 'react';
import { realtime } from '../../firebase'
import random from 'randomstring'
function Feedback(props) {

    const feedBack = async (type, content) => {
        const idFeedBack =
            moment().format('YYYYMMDD-HHmmssSSS') +
            random.generate({
                length: 3,
                charset: 'numeric',
            });
        try {
            await realtime.ref('service/' + idFeedBack).set({
                type: type,
                content: content,
                status: '0',
                userName: localStorage.getItem('fullname'),
                email: localStorage.getItem('email'),
                time: moment().format("X")
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className="header-fixed sidebar-enabled bg">
                <div className="d-flex flex-row flex-column-fluid page">
                    <AsideLeft />
                    <MainFeedback feedBack={feedBack} />
                    <AsideRight />
                </div>
            </div>
        </>
    );
}

Feedback.propTypes = {};

export default Feedback;
