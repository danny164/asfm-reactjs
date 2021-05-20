import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import AuthProvider from '../context/AuthContext';
import BanRoute from '../context/routes/BanRoute';
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

function Application() {
    return (
        <Router>
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
                    <PrivateRoute path="/order" component={TotalOrder} />
                    <BanRoute path="/banned" component={Banned} />
                    <Route component={NotFoundPage} />
                </Switch>
            </AuthProvider>
        </Router>
    );
}
export default Application;
