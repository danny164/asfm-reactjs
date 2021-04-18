import React from 'react';
import { Link } from 'react-router-dom';
import TheNightOwl from '../../assets/media/the-night-owl.png';

export default function HeaderMobile() {
    return (
        <header className="header-mobile header-mobile-fixed">
            <Link to="/home">
                <img alt="logo" src={TheNightOwl} className="logo-default max-h-30px" />
            </Link>
            <div className="d-flex align-items-center">
                <button className="btn p-0 burger-icon burger-icon-left rounded-0">
                    <span />
                </button>
                <button className="btn btn-hover-icon-primary p-0 ml-5">
                    <i className="fad fa-user-circle fa-2x" />
                </button>
            </div>
        </header>
    );
}
