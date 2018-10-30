import React from 'react';
import { Route } from 'react-router-dom';
import GraphicalCharter from '../GraphicalCharter';
import BoardComp from '../BoardComp';
import Modal from '../../components/modal';
import Header from '../header';
import UserComp from '../UserComp';
import SignUpComp from '../SignUpComp';
import SignInComp from '../SignInComp';

import './style.css';

const App = () => (
    <div className="appContainer">
        <Header />
        <Modal />
        <main>
            <Route exact path="/board/:boardId" component={BoardComp} />
            <Route exact path="/signin" component={SignInComp} />
            <Route exact path="/signup" component={SignUpComp} />
            <Route exact path="/profile" component={UserComp} />
            <Route exact path="/graphical-charter" component={GraphicalCharter} />
        </main>
    </div>
);

export default App;
