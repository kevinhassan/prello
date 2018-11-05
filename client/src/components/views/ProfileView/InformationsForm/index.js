import React from 'react';
import PropTypes from 'prop-types';

// ===== Others
import './style.css';

// ==================================

const InformationsForm = props => (

    <span className="addListForm">
        {props.isVisible ? (

            <div className="appened-form">
                <form onSubmit={console.log('yea')}>
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
                        onClick={() => props.displayUpdateForm(false)}
                    >
                        <i className="fas fa-times" />
                    </button>
                </form>
            </div>

        ) : (
            <div className="appened-form">
                <button
                    className="btn btn-secondary btnUpdate"
                    type="submit"
                    onClick={() => props.displayUpdateForm(true)}
                >
                    <i className="fas fa-pen updateIcon" />
                </button>
                <div>
                    <h5>Bio</h5>
                    <p>{props.bio ? props.bio : 'Unfilled'}</p>
                    <br />
                    <h5>Email</h5>
                    <p>{props.email}</p>
                </div>
                
            </div>
        )}
    </span>

);

InformationsForm.propTypes = {
    bio: PropTypes.object.isRequired,
    email: PropTypes.object.isRequired,
    displayUpdateForm: PropTypes.func.isRequired,
    isVisible: PropTypes.object.isRequired,
};

export default InformationsForm;
