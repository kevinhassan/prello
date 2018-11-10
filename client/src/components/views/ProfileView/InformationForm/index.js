import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';

// ===== Others
import './style.css';

// ==================================

const InformationForm = props => (

    <span>
        {props.isVisible ? (

            <div className="informationForm">
                <form onSubmit={props.handleUpdateInformation}>
                    Biography (optional)
                    <Textarea
                        className="form-control"
                        name="Bio"
                        defaultValue={props.user.biography ? props.user.biography : ''}
                        type="text"
                        id="bio"
                    />
                    <br />
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
                    <button className="btn btn-success updateInformation-btn" type="submit">
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
            <div className="informationDisplay">
                <div className="informationDisplay-header">
                    <h5>Biography</h5>
                    <button
                        className="btn btn-secondary btnUpdate"
                        type="button"
                        onClick={() => props.displayUpdateForm(true)}
                    >
                        <i className="fas fa-pen updateIcon" />
                    </button>
                </div>
                <p>{props.user.biography ? props.user.biography : (<i style={{ color: '#999' }}>No biography</i>)}</p>
                <br />
                <h5>Email</h5>
                <p>{props.user.email}</p>
            </div>
        )}
    </span>

);

InformationForm.propTypes = {
    user: PropTypes.object.isRequired,
    isVisible: PropTypes.bool.isRequired,
    displayUpdateForm: PropTypes.func.isRequired,
    handleUpdateInformation: PropTypes.func.isRequired,
};


export default InformationForm;
