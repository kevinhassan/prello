import React from 'react';
import PropTypes from 'prop-types';


import './style.css';

const DeleteAccountForm = props => (

    <div className="passwordFormWrapper">
        <h4 className="deleteTitle">Delete your account</h4>
        <form className="passwordForm" onSubmit={props.handleDeleteAccount}>

            <div className="form-group row">
                <label htmlFor="password" className="col-form-label col-sm-5">
                    Username
                </label>
                <div className="col-sm-7">
                    <input
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        required
                        type="text"
                    />
                </div>
            </div>
            <button className="btn btn-danger" type="submit">Delete</button>
        </form>
    </div>


);

DeleteAccountForm.propTypes = {
    handleDeleteAccount: PropTypes.func.isRequired,
};
DeleteAccountForm.defaultProps = {
};

export default DeleteAccountForm;
