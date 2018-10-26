import React from 'react';

// ===== Components /
import SignUpForm from '../../../containers/SignUpForm';

// ===== Models

// ===== Others
import './style.css';

// ==================================

const SignUpView = () => (
    <div>
        <div className="row" />
        <div className="col-sm-12 general-form">
            <h3 className="form-title">Sign Up</h3>
            <SignUpForm />
        </div>
    </div>
);
export default SignUpView;
