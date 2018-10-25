import React from 'react';

// ==== Components / Container

// ===== Models

// ===== Others

import './style.css';

// ==================================

const SignInView = () => (
    <div>
        <div className="col-sm-3" />
        <div className="col-sm-6 signin-container">
            <div className="general-form">
                <h3 className="form-title">Sign In</h3>
                <form>
                    <label>
                        <p>Use name/Email address</p>
                        <input type="text" name="username" />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" name="password" />
                    </label>
                    <p>
                        <input type="submit" value="Submit" />
                    </p>
                </form>
            </div>
        </div>
    </div>
);


export default SignInView;
