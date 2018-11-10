import React from 'react';

import './style.css';

// =====

const ProfileTab = () => (
    <div className="profilePanelsList">
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
    </div>
);

export default ProfileTab;
