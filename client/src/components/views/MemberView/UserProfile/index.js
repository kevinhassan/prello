import React from 'react';
import PropTypes from 'prop-types';

// ===== Others
import './style.css';

// ==================================

const UserProfile = props => (
    <span>
        <div className="informationDisplay">
            <div className="informationDisplay-header">
                <h5>Biography</h5>
            </div>
            <p>{props.user.biography ? props.user.biography : (<i style={{ color: '#999' }}>No biography</i>)}</p>

            <h5>Email</h5>
            <p>{props.user.email}</p>
        </div>
    </span>
);

UserProfile.propTypes = {
    user: PropTypes.object.isRequired,
};


export default UserProfile;
