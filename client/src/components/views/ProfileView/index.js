import React from 'react';
import PropTypes from 'prop-types';

// ===== Components
import InformationForm from './InformationForm';

// ===== Others
import './style.css';

// ==================================


const ProfileView = props => (

    <div className="user" key={props.user.id}>
        <div className="row">
            <div className="col-sm-1 offset-sm-3">
                <h2 className="initials">
                    {props.user.initials}
                </h2>
            </div>
            <div className="col-sm-3 nickname">
                <h1 className="userFullname">{props.user.fullName}</h1>
                <p>
                    @
                    {props.user.username}
                </p>
            </div>
            <div className="col-sm-3 userData">
                <InformationForm
                    displayUpdateForm={props.handleUpdateDisplay}
                    updateInformation={props.handleUpdateInformation}
                    isVisible={props.isUpdateVisible}
                    user={props.user}
                />
            </div>
        </div>

        <hr />
        <div className="row">
            <div className="col-sm-8 offset-sm-2">
                <h4 className="teams">
                    <i className="fas fa-users teamIcon" />
                    My teams
                </h4>
            </div>
        </div>

        <hr />
        <div className="row">
            <div className="col-sm-8 offset-sm-2">
                <h4 className="news">
                    <i className="far fa-newspaper teamIcon" />
                    Activity
                </h4>
            </div>
        </div>
    </div>

);

ProfileView.propTypes = {
    user: PropTypes.object.isRequired,
    isUpdateVisible: PropTypes.object.isRequired,
    handleUpdateInformation: PropTypes.func.isRequired,
    handleUpdateDisplay: PropTypes.func.isRequired,
};
ProfileView.defaultProps = {
};

export default ProfileView;
