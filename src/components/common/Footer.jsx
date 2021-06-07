import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
    const [wordList] = useState(['Quỳnh', 'Thắng', 'Phóng', 'Tín']);
    const [effect, setEffect] = useState({
        opacity: 0,
        activeIdx: 0,
    });

    useEffect(() => {
        const runAnimation = () => {
            setEffect((preEffect) => {
                const newOpacity = preEffect.opacity === 0 ? 1 : 0;
                const result = {
                    opacity: newOpacity,
                    activeIdx: newOpacity === 1 ? preEffect.activeIdx + 1 : preEffect.activeIdx,
                };
                return result;
            });
        };

        const intervalId = setInterval(() => {
            runAnimation();
        }, 1500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <footer className="py-2 my-5 d-flex flex-lg-column">
            <div className="container-fluid d-flex flex-md-row align-items-center justify-content-between">
                <div className="text-nav">
                    Made with <span role="img">❤</span>️ from{' '}
                    <span style={{ opacity: effect.opacity, 'transition-duration': '.5s' }}>
                        {wordList[effect.activeIdx % wordList.length]}
                    </span>
                </div>
                <div className="text-nav">
                    <span>{moment().year()}©</span>
                    <Link to="#" target="_blank">
                        The Night Owl
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
