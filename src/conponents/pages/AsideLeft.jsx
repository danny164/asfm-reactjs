import React from 'react';
import { Link } from 'react-router-dom';
import TheNightOwl from '../../assets/media/the-night-owl.png';

function AsideLeft(props) {

    
    return (
        <aside className="aside aside-left d-flex flex-column">
            <header className="d-flex flex-column align-items-center flex-column-auto py-9">
                <div>
                    <Link to="/home">
                        <img src={TheNightOwl} alt="logo" width={48} />
                    </Link>
                </div>
            </header>
            <nav className="d-flex flex-column align-items-center flex-column-fluid pb-10 scroll ps">
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <Link to="/home" className="nav-link btn btn-icon btn-lg btn-borderless active">
                            <i className="fad fa-home-lg-alt" />
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="#" className="nav-link btn btn-icon btn-lg btn-borderless">
                            <i className="fad fa-chart-pie" />
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="#" className="nav-link btn btn-icon btn-lg btn-borderless">
                            <i className="fad fa-rocket-launch"></i>
                        </Link>
                    </li>
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

export default AsideLeft;
