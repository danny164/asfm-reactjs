import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function Footer(props) {
    return (
        <footer className="py-2 my-5 d-flex flex-lg-column">
            <div className="container-fluid d-flex flex-md-row align-items-center justify-content-between">
                <div className="text-nav">
                    <span>{moment().year()}©</span>
                    <Link to="#" target="_blank">
                        The Night Owl
                    </Link>
                </div>
                <div className="text-nav">
                    Made with ❤️ from <span>The Night Owl</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
