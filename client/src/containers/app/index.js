import React from 'react';
import { Route } from 'react-router-dom';
import GraphicalCharter from '../GraphicalCharter';
import BoardComp from '../BoardComp';
import Modal from '../../components/modal';
import Header from '../header';
import UserComp from '../UserComp';
import RegisterComp from '../RegisterComp';
import SignInComp from '../SignInComp';

import './style.css';

const App = () => (
    <div className="appContainer">
        <Header />
        <Modal />
        <main>
            <Route exact path="/boards/:boardId" component={BoardComp} />
            <Route exact path="/graphical-charter" component={GraphicalCharter} />
            <Route exact path="/profile" component={UserComp} />
            <Route exact path="/register" component={RegisterComp} />
            <Route exact path="/signin" component={SignInComp} />
        </main>
    </div>
);

export default App;
