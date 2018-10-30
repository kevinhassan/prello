import React from 'react';
import PropTypes from 'prop-types';

// ==== Components / Container

// ===== Models

// ===== Others
import './style.css';

// ==================================

const RegisterView = props => (
    <div className="registerFormWrapper">
        <h1 className="registerTitle">Register</h1>
        <form className="registerForm" onSubmit={props.handleFormSubmit}>

            <div className="form-group row">
                <label htmlFor="fullName" className="col-form-label col-sm-4">Full name</label>
                <div className="col-sm-8">
                    <input
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your full name"
                        required
                        type="text"
                    />
                </div>
            </div>

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
                <label htmlFor="password" className="col-form-label col-sm-4">
                    Password
                    <span className="text-warning"> *</span>
                </label>
                <div className="col-sm-8">
                    <input
                        className="form-control"
                        id="password"
                        name="password"
                        pattern=".{5,}"
                        placeholder="Enter your password"
                        required
                        type="password"
                    />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="confirmPassword" className="col-form-label col-sm-4">
                    Confirm password
                    <span className="text-warning"> *</span>
                </label>
                <div className="col-sm-8">
                    <input
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        pattern=".{5,}"
                        placeholder="Enter your password again"
                        required
                        type="password"
                    />
                </div>
            </div>

            <p className="text-warning">
                <i>* Password must be at least 5 characters long.</i>
            </p>

            <div className="form-group text-center">
                <button type="submit" className="btn btn-primary">Register</button>
            </div>
            <p className="text-danger registerErrorMsg">{props.errorMessage}</p>
        </form>
    </div>
);

RegisterView.propTypes = {
    errorMessage: PropTypes.string,
    handleFormSubmit: PropTypes.func.isRequired,
};
RegisterView.defaultProps = {
    errorMessage: '',
};


export default RegisterView;
