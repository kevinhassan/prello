import React from 'react';
import PropTypes from 'prop-types';


import './style.css';

const ProfileTab = () => (
    <span>
        <div className="teamsPanel">

            <h4 className="teams">
                <i className="fas fa-users teamIcon" />
                    My teams
            </h4>

        </div>

        <hr />
        <div className="activityPanel">

            <h4 className="news">
                <i className="far fa-newspaper teamIcon" />
                    Activity
            </h4>

        </div>
    </span>

);

ProfileTab.propTypes = {
};
ProfileTab.defaultProps = {
};

export default ProfileTab;
