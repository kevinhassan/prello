import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.css';

// ==========

const ErrorPage = props => (
    <div className="divError">
        <div className="divErrorOverlay">
            <h1 className="text-center titleError">
                {props.status
                    ? (
                        `Error ${props.status}`
                    ) : (
                        'An error occured'
                    )}
                {' '}
                <i className="fas fa-frown-open" />
            </h1>
            <div className="text-center" style={{ fontSize: '1.4rem' }}>
                {props.message
                    ? (
                        <p className="text-center">{props.message}</p>
                    ) : (
                        <Fragment>
                            <p className="text-center">Sorry, we can not find the page you are looking for...</p>
                            <p className="text-center">Maybe you would like to go somewhere else:</p>
                        </Fragment>
                    )}
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {localStorage.getItem('prello_token') === null
                        ? (
                            <div>
                                <li><Link to="/register">Register</Link></li>
                                <li><Link to="/signin">Sign in</Link></li>
                            </div>
                        ) : (
                            <li><Link to="/boards">Your boards</Link></li>
                        )
                    }
                </ul>
            </div>
        </div>
    </div>
);

ErrorPage.propTypes = {
    message: PropTypes.string,
    status: PropTypes.number,
};
ErrorPage.defaultProps = {
    message: undefined,
    status: undefined,
};

export default ErrorPage;
