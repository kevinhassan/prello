import React from 'react';
import PropTypes from 'prop-types';

// ==== Components / Container

// ===== Models

// ===== Others
import './style.css';

// ==================================

const ResetView = props => (
    <div className="resetFormWrapper">
        <h1 className="resetTitle">Hello back !</h1>
        <h5>Choose a new password and confirm it</h5>
        <form className="resetForm" onSubmit={props.handleFormSubmit}>
            <div className="form-group row">
                <label htmlFor="password" className="col-form-label col-sm-4">Password</label>
                <div className="col-sm-8">
                    <input
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter your new password"
                        required
                        type="password"
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="password" className="col-form-label col-sm-4">Password confirmation</label>
                <div className="col-sm-8">
                    <input
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Confirm your password"
                        required
                        type="password"
                    />
                </div>
            </div>
            
            <button type="submit" className="btn btn-primary">Reset password</button>
            <p className="text-danger resetErrorMsg">{props.errorMessage}</p>
        </form>
    </div>
);

ResetView.propTypes = {
    errorMessage: PropTypes.string,
    handleFormSubmit: PropTypes.func.isRequired,
};
ResetView.defaultProps = {
    errorMessage: '',
};


export default ResetView;
