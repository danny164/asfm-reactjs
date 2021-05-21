import Slide from '@material-ui/core/Slide';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'react-moment';
import { Provider } from 'react-redux';
import store from './app/store';
import './assets/css/all.min.css';
import './assets/css/plugins.css';
import './assets/css/styles.scss';
import './assets/css/theme.scss';
import Application from './components/Application';

Moment.startPooledTimer();
Moment.clearPooledTimer();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <SnackbarProvider
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                maxSnack={3}
                autoHideDuration={3500}
                TransitionComponent={Slide}
                preventDuplicate
            >
                <Application />
            </SnackbarProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
