import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import TheNightOwl from '../../assets/media/the-night-owl.png';
import FakeData from './FakeData';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useAuth } from 'context/AuthContext';
import { fetchReport } from '../pages/AdminFunc/FetchReport';

function AsideLeft(props) {
    const { onHandleMenu } = props;
    const [mailBoxNum, setMailBoxNum] = useState();
    const { currentUser } = useAuth();

    useEffect(() => {
        try {
            fetchReport(currentUser.uid, setMailBoxNum);
        } catch (err) {}
    });
    const links = [
        {
            id: 1,
            name: 'home',
            to: '/home',
            className: 'nav-link btn btn-icon btn-lg btn-borderless',
            icon: 'fad fa-home-lg-alt',
        },
        {
            id: 2,
            name: 'chart',
            to: '/chart',
            className: 'nav-link btn btn-icon btn-lg btn-borderless',
            icon: 'fad fa-chart-pie',
        },

        {
            id: 3,
            name: 'admin',
            to: '/admin',
            className: 'nav-link btn btn-icon btn-lg btn-borderless',
            icon: 'fad fa-rocket-launch',
        },
    ];

    return (
        <aside className={`aside aside-left d-flex flex-column ${onHandleMenu ? 'aside-on' : ''}`}>
            <header className="d-flex flex-column align-items-center flex-column-auto py-9">
                <div>
                    <Link to="/home">
                        <img src={TheNightOwl} alt="logo" width={48} />
                    </Link>
                </div>
            </header>
            <nav className="d-flex flex-column align-items-center flex-column-fluid pb-10 scroll ps">
                <ul className="nav flex-column">
                    {links.map((link) => (
                        <>
                            {link.id !== 3 && (
                                <li className="nav-item mb-2" key={link.id}>
                                    <NavLink strict activeClassName="active" to={link.to} className={link.className}>
                                        <i className={link.icon} />
                                    </NavLink>
                                </li>
                            )}

                            {localStorage.getItem('role') === '9' && link.id === 3 && (
                                <li className="nav-item mb-2" key={link.id}>
                                    <NavLink strict activeClassName="active" to={link.to} className={link.className}>
                                        <i className={link.icon} />
                                    </NavLink>
                                </li>
                            )}
                        </>
                    ))}
                    {localStorage.getItem('role') === '9' && <FakeData />}
                </ul>
            </nav>
            <footer className="d-flex flex-column align-items-center flex-column-auto py-8">
                <span className="mb-2">
                    <NavLink strict activeClassName="active" to="/mailbox" className="nav-link btn btn-icon btn-lg btn-borderless position-relative">
                        <i className="fad fa-envelope-open-text"></i>
                        <span className="label label-sm label-light-danger label-rounded font-weight-bolder position-absolute top--7 right--7 mt-1 mr-1">
                            {mailBoxNum ? Object.values(mailBoxNum).filter((data) => data.read === 0).length : 0}
                        </span>
                    </NavLink>
                </span>
                <span className="mb-2">
                    <NavLink strict activeClassName="active" to="/feedback" className="nav-link btn btn-icon btn-lg btn-borderless">
                        <i className="fad fa-comment-alt-exclamation" />
                    </NavLink>
                </span>
                <span className="mb">
                    <NavLink strict activeClassName="active" to="/help" className="nav-link btn btn-icon btn-lg btn-borderless">
                        <i className="fad fa-question-circle" />
                    </NavLink>
                </span>
            </footer>
        </aside>
    );
}

AsideLeft.propTypes = {
    onHandleMenu: PropTypes.bool,
};

AsideLeft.defaultProps = {
    onHandleMenu: false,
};

export default AsideLeft;
