import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
// ==================================

const AddMemberForm = props => (
    <form className="form-inline addMemberForm" onSubmit={props.addMember}>
        <div className="input-group addMember_inputBlock">
            <input
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter member username"
                required
                type="text"
                style={{ width: '100%' }}
            />
        </div>
        <div className="addMember_btnBlock">
            <button className="btn btn-success addMemberForm-btn" type="submit">
                Add
            </button>
        </div>
    </form>
);


AddMemberForm.propTypes = {
    addMember: PropTypes.func.isRequired,
};

export default AddMemberForm;
