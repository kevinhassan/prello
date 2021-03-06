import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GraphicalCharter from '../GraphicalCharter';
import BoardComp from '../BoardComp';
import BoardsComp from '../BoardsComp';
import HomeComp from '../HomeComp';
import Modal from '../../components/modal';
import Header from '../header';
import MemberComp from '../MemberComp';
import ProfileComp from '../ProfileComp';
import RegisterComp from '../RegisterComp';
import SignInComp from '../SignInComp';
import TeamComp from '../TeamComp';
import ForgotComp from '../ForgotComp';
import ResetComp from '../ResetComp';

import PrivateRoute from '../../components/PrivateRoute';
import ErrorPage from '../../components/ErrorPage';

import './style.css';

const isAuthenticated = () => localStorage.getItem('prello_token') !== null;

const App = () => (
    <div className="appContainer">
        <Header />
        <Modal />
        <main>
            <div className="whiteBackground">
                <Switch>
                    <Route exact path="/" component={HomeComp} />
                    <Route exact path="/boards/:boardId" component={BoardComp} />
                    <Route exact path="/graphical-charter" component={GraphicalCharter} />
                    <Route exact path="/boards/:boardId" component={BoardComp} />
                    <Route exact path="/members/:memberId" component={MemberComp} />
                    <Route exact path="/register" component={RegisterComp} />
                    <Route exact path="/signin" component={SignInComp} />
                    <Route exact path="/teams/:teamId" component={TeamComp} />
                    <Route exact path="/forgot" component={ForgotComp} />
                    <Route exact path="/reset/:token" component={ResetComp} />


                    <PrivateRoute authed={isAuthenticated()} exact path="/boards" component={BoardsComp} />
                    <PrivateRoute authed={isAuthenticated()} exact path="/profile" component={ProfileComp} />

                    <Route component={ErrorPage} />
                </Switch>
            </div>
        </main>
    </div>
);

export default App;
