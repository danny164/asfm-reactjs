import React from 'react';
import TheNightOwl from '../assets/media/the-night-owl.png';

function Logo(props) {
    return (
        <header className="d-flex flex-center mt-10 mb-10">
            <a href="#">
                <img src={TheNightOwl} className="max-h-75px" alt="logo" />
            </a>
        </header>
    );
}

export default Logo;
