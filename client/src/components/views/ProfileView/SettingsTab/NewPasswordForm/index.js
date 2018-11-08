import React from 'react';
import PropTypes from 'prop-types';


import './style.css';

const NewPasswordForm = () => (

    <div className="passwordFormWrapper">
        <h4 className="registerTitle">Change your password</h4>
        <form className="passwordForm" onSubmit={console.log('ok')}>

            <div className="form-group row">
                <label htmlFor="password" className="col-form-label col-sm-5">
                    Actual password
                    <span className="text-warning"> *</span>
                </label>
                <div className="col-sm-7">
                    <input
                        className="form-control"
                        id="passwordOld"
                        name="passwordOld"
                        pattern=".{5,}"
                        placeholder="Enter your password"
                        required
                        type="password"
                    />
                </div>
            </div>


            <div className="form-group row">
                <label htmlFor="password" className="col-form-label col-sm-5">
                    New password
                    <span className="text-warning"> *</span>
                </label>
                <div className="col-sm-7">
                    <input
                        className="form-control"
                        id="passwordNew"
                        name="passwordNew"
                        pattern=".{5,}"
                        placeholder="Enter your new password"
                        required
                        type="password"
                    />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="password" className="col-form-label col-sm-5">
                    Confirm new password
                    <span className="text-warning"> *</span>
                </label>
                <div className="col-sm-7">
                    <input
                        className="form-control"
                        id="confirmPasswordNew"
                        name="confirmPasswordNew"
                        pattern=".{5,}"
                        placeholder="Confirm your new password"
                        required
                        type="password"
                    />
                </div>
            </div>

            <button className="btn btn-success" type="submit">Validate</button>
        </form>
    </div>


);

NewPasswordForm.propTypes = {

};
NewPasswordForm.defaultProps = {
};

export default NewPasswordForm;
