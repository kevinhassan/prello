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
        <h5 className="resetText">Type a new password and confirm it.</h5>
        <form className="resetForm" onSubmit={props.handleResetFormSubmit}>

            <div className="password">
                <label htmlFor="password" className="passwordLabel">Password</label>
                <div className="passwordInput">
                    <input
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter your new password"
                        pattern=".{5,}"
                        required
                        type="password"
                    />
                </div>
            </div>


            <div className="password">
                <label htmlFor="password" className="passwordLabel">Password confirmation</label>
                <div className="passwordInput">
                    <input
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        pattern=".{5,}"
                        required
                        type="password"
                    />
                </div>
            </div>

            <p className="text-warning passwordWarning">
                <i>* Password must be at least 5 characters long.</i>
            </p>
            
            <button type="submit" className="btn btn-primary resetFormBtn">Reset password</button>
            <p className="text-danger resetErrorMsg">{props.errorMessage}</p>
        </form>
    </div>
);

ResetView.propTypes = {
    errorMessage: PropTypes.string,
    handleResetFormSubmit: PropTypes.func.isRequired,
};
ResetView.defaultProps = {
    errorMessage: '',
};


export default ResetView;
