import React from 'react';
import PropTypes from 'prop-types';

// ===== Others
import './style.css';

// ==================================

const InformationsForm = props => (

    <span>
        {props.isVisible ? (

            <div className="informationsForm">
                <form onSubmit={props.updateInformations}>
                    Full name
                    <input
                        className="form-control"
                        name="Full name"
                        defaultValue={props.user.fullName}
                        type="text"
                        id="fullname"
                    />
                    <br />
                    Initials
                    <input
                        className="form-control"
                        name="Initials"
                        defaultValue={props.user.initials}
                        type="text"
                        id="initials"
                    />
                    <br />
                    Bio (optional)
                    <textarea
                        className="form-control"
                        rows="5"
                        name="Bio"
                        defaultValue={props.user.bio ? props.user.bio : ''}
                        type="text"
                        id="bio"
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
                    <p>{props.user.bio ? props.user.bio : 'Unfilled'}</p>
                    <br />
                    <h5>Email</h5>
                    <p>{props.user.email}</p>
                </div>
            </div>
        )}
    </span>

);

InformationsForm.propTypes = {
    user: PropTypes.object.isRequired,
    isVisible: PropTypes.object.isRequired,
    displayUpdateForm: PropTypes.func.isRequired,
    updateInformations: PropTypes.func.isRequired,
};


export default InformationsForm;
