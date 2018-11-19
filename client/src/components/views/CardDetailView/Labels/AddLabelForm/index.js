import React from 'react';
import PropTypes from 'prop-types';

// ===== Others
import './style.css';

// ==================================

const AddLabelForm = props => (
    <form onSubmit={props.addLabel} style={{ maxWidth: '15vw' }}>
        <hr />
        <b>
            Add a board label
        </b>
        <div className="form-group row">
            <label htmlFor="labelColor" className="col-3 col-form-label">Color</label>
            <div className="col-9">
                <input className="form-control" type="color" id="labelColor" name="labelColor" />
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="labelName" className="col-3 col-form-label">Name</label>
            <div className="col-9">
                <input
                    className="form-control"
                    name="labelName"
                    type="text"
                    id="name"
                    pattern="\s*(\S\s*){1,}"
                    required
                />
            </div>
        </div>
        <button type="submit" className="btn btn-success">
            Add
        </button>
    </form>
);

AddLabelForm.propTypes = {
    addLabel: PropTypes.func.isRequired,
};
export default AddLabelForm;
