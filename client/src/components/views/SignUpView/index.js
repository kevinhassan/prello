import React from 'react';

// ===== Components / Containers

// ===== Models

// ===== Others
import './style.css';

// ==================================

const SignUpView = () => (
    <div className="col-sm-6">
        <div className="general-form">
            <h3>Sign Up</h3>
            <form>
                <label>
                    <p>Initials</p>
                    <input type="text" name="initials" />
                </label>
                <label>
                    <p>Email address</p>
                    <input type="text" name="username" />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" name="password" />
                </label>

                <label>
                    <p>Confirm password</p>
                    <input type="confirmPassword" name="password" />
                </label>
                <p>
                    <input type="submit" value="Submit" />
                </p>
            </form>
        </div>
    </div>
);

export default SignUpView;
