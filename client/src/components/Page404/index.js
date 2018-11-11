import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

// ==========

const Page404 = () => (
    <div>
        <h1 className="text-center">
            Error 404 - Page not found
            {' '}
            <i className="fas fa-frown-open" />
        </h1>
        <div className="text-center" style={{ fontSize: '1.4rem' }}>
            <p className="text-center">Sorry, we can not find the page you are looking for...</p>
            <p className="text-center">Maybe you would to go somewhere else:</p>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/signin">Sign in</Link></li>
                <li><Link to="/boards">Your boards</Link></li>
            </ul>
        </div>
    </div>
);

export default Page404;
