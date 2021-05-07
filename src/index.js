import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/all.min.css';
import './assets/css/plugins.css';
import './assets/css/styles.scss';
import './assets/css/theme.scss';
import Application from './conponents/Application';

ReactDOM.render(
    <React.StrictMode>
        <Application />
    </React.StrictMode>,
    document.getElementById('root')
);
