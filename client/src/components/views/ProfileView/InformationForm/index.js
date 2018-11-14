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
                        onClick={() => props.displayUpdateForm(false)}
                    >
                        <i className="fas fa-times updateIcon" />
                    </button>
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <label htmlFor="biography" className="col-form-label">
                                <b>Biography</b>
                            </label>
                            <Textarea
                                className="form-control"
                                name="biography"
                                defaultValue={props.user.biography ? props.user.biography : ''}
                                type="text"
                                minRows={2}
                                id="biography"
                                aria-describedby="biographyHelpBlock"
                            />
                            <small id="biographyHelpBlock" className="form-text text-muted">
                                Optional
                            </small>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="fullname" className="col-sm-4 col-form-label"><b>FullName</b></label>
                        <div className="col-sm-8">
                            <input
                                className="form-control"
                                name="fullname"
                                defaultValue={props.user.fullName}
                                type="text"
                                id="fullname"
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="initials" className="col-sm-4 col-form-label"><b>Initials</b></label>
                        <div className="col-sm-8">
                            <input
                                className="form-control"
                                name="initials"
                                defaultValue={props.user.initials}
                                maxLength="4"
                                type="text"
                                id="initials"
                                aria-describedby="initialsHelpBlock"
                            />
                            <small id="initialsHelpBlock" className="form-text text-muted">
                                4 characters max
                            </small>
                        </div>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <button className="btn btn-success updateInformation-btn" type="submit">
                        Update
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
                        &nbsp;Edit
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
