import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
    return (
        <footer className="py-2 my-5 d-flex flex-lg-column">
            <div className="container-fluid d-flex flex-md-row align-items-center justify-content-between">
                <div className="text-nav">
                    <span>2021©</span>
                    <Link to="#" target="_blank">
                        The Night Owl
                    </Link>
                </div>
                <div className="text-nav">
                    <Link to="#" className="pr-3 pl-0" target="_blank">
                        About
                    </Link>
                    <Link to="#" className="px-3" target="_blank">
                        Team
                    </Link>
                    <Link to="#" className="pl-3 pr-0" target="_blank">
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
