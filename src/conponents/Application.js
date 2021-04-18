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

function Application() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <PrivateRoute exact path="/home" component={HomePage} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <PrivateRoute exact path="/changepw" component={ChangePw} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/forgotpw" component={ForgotPw} />
                    <Route exact path="/post-order" component={PostOrder} />
                </Switch>
            </AuthProvider>
            <Switch>
                <Redirect from="/" to="login" exact />
            </Switch>
        </Router>
    );
}
export default Application;
