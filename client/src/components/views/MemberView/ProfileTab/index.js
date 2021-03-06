import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.css';

// =====

const ProfileTab = props => (
    <div className="bottomProfilePanel">
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
                                <span className="visibleIcon">
                                    {team.isVisible ? <i className="fas fa-eye" /> : <i className="fas fa-eye-slash" />}
                                    {' '}
                                </span>
                                <Link to={`/teams/${team._id}`}>
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
        <div>

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
