import React from 'react';
import { Route, Link } from 'react-router-dom';
import About from '../about';
import Cards from '../cards';
import Modal from '../../components/modal';
import './style.css';

const App = () => (
  <div>
    <header>
      <div>
        <Link className="link" to="/">Cards </Link>
        <Link className="link" to="/about-us">About</Link>
      </div>
    </header>

    <Modal />

    <main>
      <Route exact path="/" component={Cards} />
      <Route exact path="/about-us" component={About} />
    </main>
  </div>
);

export default App;
