import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CreateTeamForm from './CreateTeamForm';

import './style.css';

// =====

const ProfileTab = props => (
    <div className="bottomProfilePanel">
        <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <h4 className="teamsTitle">
                    <i className="fas fa-users teamIcon" />
                    {' '}
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
                        {props.teams.sort((t1, t2) => {
                            if (t1.isVisible && !t2.isVisible) {
                                return -1;
                            }
                            if (t2.isVisible && !t1.isVisible) {
                                return 1;
                            }
                            return t1.name.toLowerCase() > t2.name.toLowerCase();
                        }).map(team => (
                            <li className="team" key={team._id}>
                                <span className="visibleIcon">
                                    {team.isVisible ? <i className="fas fa-eye" /> : <i className="fas fa-eye-slash" />}
                                    {' '}
                                </span>
                                <Link to={`/teams/${team._id}`}>
                                    {team.name}
                                </Link>
                                <i className="fas fa-trash-alt removeIcon" onClick={() => { props.deleteTeam(team); }} onKeyPress={() => { props.deleteTeam(team); }}/>
                            </li>
                        ))}
                    </ul>
                ) : (
                    'You have no teams yet.'
                )
            }
        </div>
    </div>
);

ProfileTab.propTypes = {
    teams: PropTypes.arrayOf(PropTypes.object),
    createTeam: PropTypes.func.isRequired,
    isCreateTeamFormVisible: PropTypes.bool.isRequired,
    displayCreateTeamForm: PropTypes.func.isRequired,
    deleteTeam: PropTypes.func.isRequired,
};
ProfileTab.defaultProps = {
    teams: [],
};

export default ProfileTab;
