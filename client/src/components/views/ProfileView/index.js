import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


// ===== Components
import InformationsForm from './InformationsForm';

// ===== Others
import './style.css';

// ==================================


const ProfileView = props => (

    <div className="user" key={props.user.id}>
        <div className="row">
            <div className="col-sm-2 offset-sm-1 initials">
                <h2>
                    {props.user.initials}
                </h2>
            </div>
            <div className="col-sm-4 nickname">
                <h1 className="userFullname">{props.user.fullName}</h1>
                <p>
                    @
                    {props.user.username}
                </p>
            </div>
            <div className="col-sm-2 offset-sm-1 userData">
                <InformationsForm
                    displayUpdateForm={props.handleUpdateInformations}
                    isVisible={props.isUpdateVisible}
                    bio={props.user.bio}
                    email={props.user.email}
                />
            </div>
        </div>
    </div>

);

ProfileView.propTypes = {
    user: PropTypes.object.isRequired,
    isUpdateVisible: PropTypes.object.isRequired,
    handleUpdateInformations: PropTypes.func.isRequired,
    deleteUser: PropTypes.func,
};
ProfileView.defaultProps = {
    deleteUser: undefined,
};

export default ProfileView;
