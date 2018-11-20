import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


// ===== Others
import './style.css';

// ==================================

const BoardTeamsView = props => (
    <Fragment>
        {props.currentBoardTeams
            ? (
                <Fragment>
                    <span className="boardSettingsSeparator" />
                    {props.currentBoardTeams.map(t => (
                        <Link to={`/teams/${t._id}`} className="boardTeamAssigned" key={t._id}>
                            {t.name}
                        </Link>
                    ))}
                </Fragment>
            ) : (
                ''
            )}
        {props.canAddTeam
            ? (
                <span className="boardSettingsItem" style={{ display: 'inline-block', verticalAlign: 'unset' }}>
                    <select
                        name="Client teams"
                        value="default"
                        id="clientTeams"
                        className="custom-select custom-select-sm"
                        style={{ maxWidth: '12vw' }}
                        onChange={event => props.addBoardTeam(event)}
                    >
                        <option value="default" disabled>
                            Add a team
                        </option>
                        {props.teams.filter(t => !props.currentBoardTeams.some(ct => ct._id === t._id)).map(team => (
                            <option
                                key={team._id}
                                name={team._id}
                                value={team._id}
                            >
                                {team.name}
                            </option>
                        ))}
                    </select>
                </span>
            )
            : (
                ''
            )
        }
    </Fragment>
);

BoardTeamsView.propTypes = {
    teams: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentBoardTeams: PropTypes.arrayOf(PropTypes.object).isRequired,
    addBoardTeam: PropTypes.func.isRequired,
    canAddTeam: PropTypes.bool.isRequired,
};
BoardTeamsView.defaultProps = {
};

export default BoardTeamsView;
