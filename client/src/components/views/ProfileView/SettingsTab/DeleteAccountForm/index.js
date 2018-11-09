import React from 'react';
import PropTypes from 'prop-types';


import './style.css';

const DeleteAccountForm = props => (

    <div className="deleteFormWrapper">
        <button className="btn btn-primary closeForm" type="button" onClick={() => props.displayDeleteForm(false)}>X</button>
        <h2 className="deleteTitle">Delete your account</h2>
        <p className="deleteInfo">Careful : this is definitive</p>
        <form className="test" onSubmit={props.handleDeleteAccount}>

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
            <button className="btn btn-danger deleteBtn" type="submit">Delete</button>
        </form>
    </div>


);

DeleteAccountForm.propTypes = {
    handleDeleteAccount: PropTypes.func.isRequired,
    displayDeleteForm: PropTypes.func.isRequired,
};
DeleteAccountForm.defaultProps = {
};

export default DeleteAccountForm;
