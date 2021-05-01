import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import AuthProvider from '../context/AuthContext';
import CheckRoute from '../context/routes/CheckRoute';
import PrivateRoute from '../context/routes/PrivateRoute';
import AdminPanel from '../views/admin/index';
import HomePage from '../views/web/HomePage';
import PostOrder from '../views/web/PostOrder';
import Profile from '../views/web/Profile';
import ChangePw from './ChangePw';
import ForgotPw from './ForgotPw';
import Login from './Login';
import Chart from './pages/Chart';
import Map from './pages/Map/Map';
import NotFoundPage from './pages/NotFound';
import Register from './SignUp';

function Application() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <Route exact path="/register" component={Register} />
                    <CheckRoute exact path="/login" component={Login} />
                    <CheckRoute exact path="/forgotpw" component={ForgotPw} />
                    <PrivateRoute exact path="/home" component={HomePage} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <PrivateRoute exact path="/changepw" component={ChangePw} />
                    <PrivateRoute exact path="/post-order" component={PostOrder} />
                    <PrivateRoute exact path="/chart" component={Chart} />
                    <PrivateRoute strict path="/admin" component={AdminPanel} />
                    <PrivateRoute exact path="/map" component={Map} />
                    <Route component={NotFoundPage} />
                </Switch>
            </AuthProvider>
            <Switch>
                <Redirect from="/" to="login" exact />
            </Switch>
        </Router>
    );
}
export default Application;
