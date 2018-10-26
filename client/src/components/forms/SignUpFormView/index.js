import React from 'react';

// ===== Components /

// ===== Models

// ===== Others
import './style.css';

// ==================================

const SignUpFormView = () => (
    <div>
        <p>
            <label>
                Nickname
                <input type="text" name="name" />
            </label>
        </p>
        <p>
            <label>
                Email address
                <input type="text" name="email" />
            </label>
        </p>
        <p>
            <label>
                Password
                <input type="password" name="password" />
            </label>
        </p>
        <p>
            <label>
                Confirm password
                <input type="confirmPassword" name="passwordConfirm" />
            </label>
        </p>
        <p>
            <button type="submit">Submit</button>
        </p>
    </div>
);
export default SignUpFormView;
