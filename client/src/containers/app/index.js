import React from 'react';
import { Route } from 'react-router-dom';
import About from '../about';
import Board from '../board';
import Modal from '../../components/modal';
import Header from '../header';
import UserPage from '../user';

import './style.css';

const App = () => (
    <div>
        <Header />
        <Modal />
        <main>
            <Route exact path="/" component={Board} />
            <Route exact path="/profile" component={UserPage} />
            <Route exact path="/about-us" component={About} />
        </main>
    </div>
);

export default App;
