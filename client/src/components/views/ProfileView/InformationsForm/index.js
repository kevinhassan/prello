import React from 'react';
import PropTypes from 'prop-types';

// ===== Others
import './style.css';

// ==================================

const InformationsForm = props => (

    <span>
        {props.isVisible ? (

            <div className="informationsForm">
                <form onSubmit={console.log('yea')}>
                    <textarea
                        className="form-control"
                        rows="5"
                        name="Bio"
                        placeholder="Update your bio (optional)"
                        required
                        type="text"
                    />

                    <br />
                    <button className="btn btn-success updateInformations-btn" type="submit">
                        Update
                    </button>
                    <button
                        className="btn btn-secondary cancelUpdate-btn"
                        type="reset"
                        onClick={() => props.displayUpdateForm(false)}
                    >
                        <i className="fas fa-times" />
                    </button>
                </form>
            </div>

        ) : (
            <div className="informationsDisplay">
                <button
                    className="btn btn-secondary btnUpdate"
                    type="button"
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
    bio: PropTypes.object,
    email: PropTypes.object.isRequired,
    displayUpdateForm: PropTypes.func.isRequired,
    isVisible: PropTypes.object.isRequired,
};
InformationsForm.defaultProps = {
    bio: undefined,
}

export default InformationsForm;
