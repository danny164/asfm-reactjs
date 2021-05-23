import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import AuthProvider from '../context/AuthContext';
import BannedRoute from '../context/routes/BanRoute';
import CheckRoute from '../context/routes/CheckRoute';
import PrivateRoute from '../context/routes/PrivateRoute';
import AdminPanel from '../views/admin/index';
import HomePage from '../views/web/HomePage';
import PostOrder from '../views/web/PostOrder';
import Profile from '../views/web/Profile';
import ChangePw from './ChangePw';
import ForgotPw from './ForgotPw';
import Login from './Login';
import Banned from './pages/Banned';
import Chart from './pages/Chart';
import NotFoundPage from './pages/NotFound';
import TotalOrder from './pages/TotalOrder';
import Register from './SignUp';
import FakeData from './pages/FakeData';
import ScrollToTop from 'react-scroll-to-top';
import ScrollTop from './labels/ScrollTop';

const style = {
    backgroundColor: 'rgba(102, 50, 89, 0.3)',
    animation: 'animation-scrolltop .4s ease-out 1',
    transition: 'color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, -webkit-box-shadow 0.15s ease',
    borderRadius: '0.675rem !important',
    width: '36px',
    height: '36px',
    bottom: '40px',
    right: '20px',
};

function Application() {
    return (
        <Router>
            <ScrollToTop smooth component={<ScrollTop />} color="#fff" style={style} />
            <AuthProvider>
                <Switch>
                    <Redirect from="/" to="login" exact />
                    <CheckRoute path="/register" component={Register} />
                    <CheckRoute path="/login" component={Login} />
                    <CheckRoute path="/forgotpw" component={ForgotPw} />
                    <PrivateRoute path="/home" component={HomePage} />
                    <PrivateRoute path="/profile" component={Profile} />
                    <PrivateRoute path="/changepw" component={ChangePw} />
                    <PrivateRoute path="/post-order" component={PostOrder} />
                    <PrivateRoute path="/chart" component={Chart} />
                    <PrivateRoute strict path="/admin" component={AdminPanel} />
                    <BannedRoute path="/banned" component={Banned} />
                    <PrivateRoute path="/order" component={TotalOrder} />
                    <PrivateRoute path="/fake" component={FakeData} />
                    <Route component={NotFoundPage} />
                </Switch>
            </AuthProvider>
        </Router>
    );
}
export default Application;
