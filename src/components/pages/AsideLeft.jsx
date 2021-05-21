import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import TheNightOwl from '../../assets/media/the-night-owl.png';
import FakeData from './FakeData';

function AsideLeft(props) {
    const { onHandleMenu } = props;

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
            name: 'order',
            to: '/order',
            className: 'nav-link btn btn-icon btn-lg btn-borderless',
            icon: 'fad fa-clipboard-list-check',
        },
        {
            id: 4,
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
                            {link.id !== 4 && (
                                <li className="nav-item mb-2" key={link.id}>
                                    <NavLink strict activeClassName="active" to={link.to} className={link.className}>
                                        <i className={link.icon} />
                                    </NavLink>
                                </li>
                            )}

                            {localStorage.getItem('role') === '9' && link.id === 4 && (
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
                <Link to="#" className="nav-link btn btn-icon btn-lg btn-borderless">
                    <span>
                        <i className="fad fa-question-circle" />
                    </span>
                </Link>
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
