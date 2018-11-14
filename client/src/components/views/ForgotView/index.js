import React from 'react';
import PropTypes from 'prop-types';

// ==== Components / Container


// ===== Others
import './style.css';

// ==================================

const ForgotView = props => (
    <div className="forgotFormWrapper">
        <h1 className="forgotTitle">Forgotten password</h1>
        <p className="forgotText"> We'll send you a mail to reset your lost password</p>
        <form className="forgotForm" onSubmit={props.handleForgotFormSubmit}>

            <div className="form-group inputEmail">
                <label htmlFor="email" className="emailLabel">Email</label>
                <div className="emailInput">
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
            <button type="submit" className="btn btn-primary">Send</button>
            
            <p className="text-danger forgotErrorMsg">{props.errorMessage}</p>
        </form>
    </div>
);

ForgotView.propTypes = {
    errorMessage: PropTypes.string,
    handleForgotFormSubmit: PropTypes.func.isRequired,
};
ForgotView.defaultProps = {
    errorMessage: '',
};


export default ForgotView;
