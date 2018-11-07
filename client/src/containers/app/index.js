import React from 'react';
import { Route } from 'react-router-dom';
import GraphicalCharter from '../GraphicalCharter';
import BoardComp from '../BoardComp';
import Modal from '../../components/modal';
import Header from '../header';
import UserComp from '../UserComp';
import RegisterComp from '../RegisterComp';
import SignInComp from '../SignInComp';

import PrivateRoute from '../../components/PrivateRoute';

import './style.css';

const isAuthenticated = () => localStorage.getItem('token') !== null;

const App = () => (
    <div className="appContainer">
        <Header />
        <Modal />
        <main>
            <Route exact path="/graphical-charter" component={GraphicalCharter} />
            <Route exact path="/register" component={RegisterComp} />
            <Route exact path="/signin" component={SignInComp} />

            <PrivateRoute authed={isAuthenticated()} path="/boards/:boardId" component={BoardComp} />
            <PrivateRoute authed={isAuthenticated()} path="/profile" component={UserComp} />
        </main>
    </div>
);

export default App;
