import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import AuthProvider from '../context/AuthContext';
import HomePage from '../views/web/HomePage';
import PostOrder from '../views/web/PostOrder';
import Profile from '../views/web/Profile';
import ChangePw from './ChangePw';
import ForgotPw from './ForgotPw';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Register from './SignUp';
import CheckRoute from './CheckRoute';
import NotFoundPage from './pages/NotFound/index';
import Map from './pages/Map/Map';
import App2 from './pages/Map/googleMap';

function Application() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <PrivateRoute exact path="/home" component={HomePage} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <PrivateRoute exact path="/changepw" component={ChangePw} />
                    <CheckRoute exact path="/register" component={Register} />
                    <CheckRoute exact path="/login" component={Login} />
                    <CheckRoute exact path="/forgotpw" component={ForgotPw} />
                    <PrivateRoute exact path="/post-order" component={PostOrder} />
                    <PrivateRoute exact path="/map" component={App2} />
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
