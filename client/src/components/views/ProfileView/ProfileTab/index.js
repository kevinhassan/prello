import React from 'react';
import PropTypes from 'prop-types';


import './style.css';

const ProfileTab = () => (
    <span>
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
    </span>

);

ProfileTab.propTypes = {
};
ProfileTab.defaultProps = {
};

export default ProfileTab;
