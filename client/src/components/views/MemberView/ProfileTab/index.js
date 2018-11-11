import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.css';

// =====

const ProfileTab = props => (
    <div className="profilePanelsList">
        <div className="teamsPanel">

            <h4 className="teams">
                <i className="fas fa-users teamIcon" />
                {' '}
                Teams
            </h4>
            {props.teams.length !== 0
                ? (
                    <ul className="teamsList">
                        {props.teams.map(team => (
                            <li className="team" key={team._id}>
                                <Link to={`teams/${team._id}`}>
                                    {team.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    'No teams yet.'
                )
            }
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

ProfileTab.propTypes = {
    teams: PropTypes.arrayOf(PropTypes.object),
};
ProfileTab.defaultProps = {
    teams: [],
};

export default ProfileTab;
