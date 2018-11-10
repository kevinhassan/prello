import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';

// ===== Others
import './style.css';

// ==================================

const InformationForm = props => (

    <span>
        {props.isVisible ? (

            <div className="informationDisplay">

                <form onSubmit={props.handleUpdateInformation}>
                    <button
                        className="btn btn-secondary btnUpdate"
                        type="button"
                        onClick={() => props.displayUpdateForm(true)}
                    >
                        <i className="fas fa-pen updateIcon" />
                    </button>
                    <label htmlFor="biography" className="col-form-label">
                        <b>Biography</b>
                        {' '}
                        (optional)
                    </label>
                    <Textarea
                        className="form-control"
                        name="biography"
                        defaultValue={props.user.biography ? props.user.biography : ''}
                        type="text"
                        id="biography"
                    />

                    <label htmlFor="fullname" className="col-form-label">
                        <b>Full name</b>
                    </label>
                    <input
                        className="form-control"
                        name="fullname"
                        defaultValue={props.user.fullName}
                        type="text"
                        id="fullname"
                    />

                    <label htmlFor="initials" className="col-form-label">
                        <b>Initials</b>
                        {' '}
                        (4 characters max)
                    </label>
                    <input
                        className="form-control"
                        name="initials"
                        defaultValue={props.user.initials}
                        maxLength="4"
                        type="text"
                        id="initials"
                    />

                    <div style={{ marginTop: '10px' }}>
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
                    </div>
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
