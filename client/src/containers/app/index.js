import React from 'react';
import { Route } from 'react-router-dom';
import About from '../about';
import BoardComp from '../BoardComp';
import Modal from '../../components/modal';
import Header from '../header';
import UserComp from '../UserComp';
import SignUpComp from '../SignUpComp';
import SignInComp from '../SignInComp';

import './style.css';

const App = () => (
    <div>
        <Header />
        <Modal />
        <main style={{ marginTop: '50px' }}>
            <Route exact path="/" component={BoardComp} />
            <Route exact path="/login" component={SignInComp} />
            <Route exact path="/signup" component={SignUpComp} />
            <Route exact path="/profile" component={UserComp} />
            <Route exact path="/about-us" component={About} />
        </main>
    </div>
);

export default App;
