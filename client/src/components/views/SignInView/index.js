import React from 'react';

// ==== Components / Container

// ===== Models

// ===== Others

import './style.css';

// ==================================

const SignInView = () => (
    <div className="row">
        <div className="col-sm-12 general-form">
            <h3 className="form-title">Sign In</h3>
            <form>
                <p>
                    <label>
                        <h5>Use name/Email address</h5>
                        <input type="text" name="username" />
                    </label>
                </p>
                <p>
                    <label>
                        <h5>Password</h5>
                        <input type="password" name="password" />
                    </label>

                </p>
                <p>
                    <input type="submit" value="Submit" />
                </p>
            </form>
        </div>
    </div>
);


export default SignInView;
