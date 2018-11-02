import React from 'react';
import PropTypes from 'prop-types';

// ===== Others
import './style.css';

// ==================================

const AddListForm = props => (

    <span>
        {props.isInputVisible ? (

            <div className="appened-form">
                <form onSubmit={props.onListAdded}>
                    <input
                        className="form-control"
                        id="listName"
                        name="listName"
                        placeholder="Enter list name"
                        required
                        type="text"
                    />
                    <button className="btn btn-success addListForm-btn" type="submit">
                    Add list
                    </button>
                    <button
                        className="btn btn-secondary addListForm-btn"
                        type="reset"
                        onClick={() => props.displayAddListForm(false)}
                    >
                        <i className="fas fa-times" />
                    </button>
                </form>
            </div>

        ) : (
            <button
                className="btn addListButton"
                type="submit"
                onClick={() => props.displayAddListForm(true)}
            >
                <i className="fas fa-plus-circle" />

            </button>
        )}
    </span>

);

AddListForm.propTypes = {
    displayAddListForm: PropTypes.func.isRequired,
    isInputVisible: PropTypes.bool.isRequired,
    onListAdded: PropTypes.func.isRequired,
};

export default AddListForm;
