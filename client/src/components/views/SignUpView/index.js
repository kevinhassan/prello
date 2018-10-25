import React from 'react';

// ===== Components / Containers

// ===== Models

// ===== Others
import './style.css';

// ==================================

const SignUpView = () => (
    <div>
        <div className="row" />
        <div className="col-sm-12 general-form">
            <h3 className="form-title">Sign Up</h3>
            <form>
                <p>
                    <label>
                        <p>Nickname</p>
                        <input type="text" name="nickname" />
                    </label>
                </p>
                <p>
                    <label>
                        <p>Email address</p>
                        <input type="text" name="username" />
                    </label>
                </p>
                <p>
                    <label>
                        <p>Password</p>
                        <input type="password" name="password" />
                    </label>
                </p>
                <p>
                    <label>
                        <p>Confirm password</p>
                        <input type="confirmPassword" name="password" />
                    </label>
                </p>
                <p>
                    <input type="submit" value="Submit" />
                </p>
            </form>
        </div>
    </div>
);

export default SignUpView;
