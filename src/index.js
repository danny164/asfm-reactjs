import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'react-moment';
import './assets/css/all.min.css';
import './assets/css/plugins.css';
import './assets/css/styles.scss';
import './assets/css/theme.scss';
import Application from './conponents/Application';

Moment.startPooledTimer();
Moment.clearPooledTimer();

ReactDOM.render(
    <React.StrictMode>
        <Application />
    </React.StrictMode>,
    document.getElementById('root')
);
