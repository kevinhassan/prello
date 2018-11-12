import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CreateTeamForm from './CreateTeamForm';

import './style.css';

// =====

const ProfileTab = props => (
    <div className="profilePanelsList">
        <div className="teamsPanel">

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <h4 className="teamsTitle">
                    <i className="fas fa-users teamIcon" />
                    My teams
                </h4>
                <CreateTeamForm
                    createTeam={props.createTeam}
                    isCreateTeamFormVisible={props.isCreateTeamFormVisible}
                    displayCreateTeamForm={props.displayCreateTeamForm}
                />
            </div>

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
                    'You have no teams yet.'
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
    createTeam: PropTypes.func.isRequired,
    isCreateTeamFormVisible: PropTypes.bool.isRequired,
    displayCreateTeamForm: PropTypes.func.isRequired,
};
ProfileTab.defaultProps = {
    teams: [],
};

export default ProfileTab;
