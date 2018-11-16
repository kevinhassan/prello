import React from 'react';
import PropTypes from 'prop-types';

// ==== Components / Container

// ===== Models

// ===== Others
import './style.css';

// ==================================

const SignInView = props => (
    <div className="signInFormWrapper">
        <h1 className="signInTitle">Sign in</h1>
        <form className="signInForm" onSubmit={props.handleFormSubmit}>

            <div className="form-group row">
                <label htmlFor="email" className="col-form-label col-sm-4">Email</label>
                <div className="col-sm-8">
                    <input
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        type="email"
                    />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="password" className="col-form-label col-sm-4">Password</label>
                <div className="col-sm-8">
                    <input
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        type="password"
                    />
                </div>
                <div style={{ width: '100%' }}>
                    <button type="button" className="btn btn-link forgottenPassword float-right" onClick={() => (props.handleForgotPassword())}>Forgot password?</button>
                </div>
            </div>

            <div className="form-group text-center">
                <div className="button-group">
                    <button type="submit" className="btn btn-primary">Sign in</button>

                    <a type="button" className="btn loginWithGHLink" href={`${process.env.REACT_APP_API_HOST}auth/github`}>
                        Sign with Github
                        {' '}
                        <i className="fab fa-github" />
                    </a>
                </div>
            </div>

            <p className="text-danger signInErrorMsg">{props.errorMessage}</p>
        </form>
    </div>
);

SignInView.propTypes = {
    errorMessage: PropTypes.string,
    handleFormSubmit: PropTypes.func.isRequired,
    handleForgotPassword: PropTypes.func.isRequired,
};
SignInView.defaultProps = {
    errorMessage: '',
};


export default SignInView;
