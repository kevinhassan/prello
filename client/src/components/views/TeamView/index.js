import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// ===== Components
import BoardItem from '../../BoardItem';
import AddMemberForm from './AddMemberForm';

// ===== Others
import './style.css';

// ==================================

const TeamView = props => (
    <div className="teamContent container-fluid">
        <h1 style={{ marginTop: 0 }}>{props.team.name}</h1>


        <div className="row">
            {props.team.isVisible
                ? (
                    <div className="col-sm-2">
                        Public
                        {' '}
                        <i className="fas fa-eye" />
                    </div>
                )
                : (
                    <div className="col-sm-2">
                        Private
                        {' '}
                        <i className="fas fa-eye-slash" />
                    </div>
                )
            }
            <div className="col-sm-10">
                {props.team.description
                    ? (
                        <Fragment>
                            <b>Description:</b>
                            {' '}
                            {props.team.description}
                        </Fragment>
                    ) : (
                        <Fragment>
                            <i>No description provided yet.</i>
                        </Fragment>
                    )}
            </div>
        </div>
        <div className="row">
            <div className="col-sm-5">
                <h2 className="text-center" style={{ margin: '15px 0' }}>Members</h2>

                <AddMemberForm
                    addMember={props.addMemberToTeam}
                />

                <ul>
                    {props.team.members.sort((a, b) => {
                        if (a._id === props.clientId) return false;
                        if (b._id === props.clientId) return true;
                        return a.fullName > b.fullName;
                    }).map(member => (
                        <div key={member._id}>
                            <li className={`memberRow ${member._id === props.clientId ? 'memberMe' : ''}`}>
                                <span
                                    onClick={event => props.onMemberClick(event, member._id)}
                                    onKeyDown={event => props.onMemberClick(event, member._id)}
                                >
                                    <div style={{ margin: 0 }}>
                                        <b>{member.fullName}</b>
                                        {props.team.admins.map((admin) => {
                                            if (admin._id === member._id) {
                                                return (
                                                    <span className="float-right" key={admin._id}>Admin</span>
                                                );
                                            }
                                            return (
                                                <span className="float-right" key={member._id}>Member</span>
                                            );
                                        })}
                                        <p className="text-secondary" style={{ margin: 0 }}>
                                        @
                                            {member.username}
                                        </p>
                                    </div>
                                </span>

                            </li>
                            <hr style={{ margin: 0 }} />
                        </div>
                    ))}
                </ul>
            </div>
            <div className="col-sm-7">
                <h2 className="text-center" style={{ margin: '15px 0' }}>Boards</h2>
                <ul className="boards-ul">
                    {props.team.boards.map(board => (
                        <li
                            className="board-li"
                            key={board._id}
                            style={{ width: '33%' }}
                        >
                            <BoardItem
                                board={board}
                                lightCSS
                                onBoardClick={props.onBoardClick}
                                readOnlyBoard
                                onTeamClick={props.onTeamClick}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);
TeamView.propTypes = {
    addMemberToTeam: PropTypes.func.isRequired,
    clientId: PropTypes.string.isRequired,
    team: PropTypes.object.isRequired,
    onBoardClick: PropTypes.func.isRequired,
    onMemberClick: PropTypes.func.isRequired,
    onTeamClick: PropTypes.func.isRequired,
};

export default TeamView;
