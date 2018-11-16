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
        <div className="row">
            <div className="col-9">
                {props.isAdmin()
                    ? (
                        <Fragment>
                            {props.isEditingName
                                ? (
                                    <form className="form-inline" onSubmit={props.editName}>
                                        <label className="sr-only" htmlFor="name">Name</label>
                                        <div className="input-group mb-2 mr-sm-2">
                                            <div className="input-group-prepend">
                                                <button
                                                    className="btn btn-secondary"
                                                    type="reset"
                                                    onClick={() => props.changeIsEditingName(false)}
                                                >
                                                    <i className="fas fa-times updateIcon" />
                                                </button>
                                            </div>
                                            <input
                                                className="form-control"
                                                name="name"
                                                defaultValue={props.team.name}
                                                type="text"
                                                id="name"
                                                required
                                            />
                                            <div className="input-group-prepend">
                                                <button
                                                    className="btn btn-success"
                                                    type="submit"
                                                >
                                                    <i className="fas fa-check" />
                                                </button>
                                            </div>

                                        </div>
                                    </form>
                                ) : (
                                    <button className="btn btnReseted" type="button" style={{ padding: 0 }} onClick={() => props.changeIsEditingName(true)}>
                                        <h1 style={{ marginTop: 0 }}>{props.team.name}</h1>
                                    </button>

                                )
                            }
                        </Fragment>
                    ) : (
                        <h1 style={{ marginTop: 0 }}>{props.team.name}</h1>
                    )
                }
                <div className="row">
                    {props.isAdmin()
                        ? (
                            <Fragment>
                                {props.team.isVisible
                                    ? (
                                        <div className="col-sm-2 teamVisibility click" onClick={props.changeVisibility} onKeyPress={props.changeVisibility}>
                                            Public
                                            {' '}
                                            <i className="fas fa-eye" />
                                        </div>
                                    )
                                    : (
                                        <div className="col-sm-2 teamVisibility click" onClick={props.changeVisibility} onKeyPress={props.changeVisibility}>
                                            Private
                                            {' '}
                                            <i className="fas fa-eye-slash" />
                                        </div>
                                    )
                                }
                            </Fragment>
                        ) : (
                            <Fragment>
                                {props.team.isVisible
                                    ? (
                                        <div className="col-sm-2 teamVisibility">
                                            Public
                                            {' '}
                                            <i className="fas fa-eye" />
                                        </div>
                                    )
                                    : (
                                        <div className="col-sm-2 teamVisibility">
                                            Private
                                            {' '}
                                            <i className="fas fa-eye-slash" />
                                        </div>
                                    )
                                }
                            </Fragment>
                        )
                    }
                </div>
            </div>
            <div className="col-3 float-right">
                {props.isAdmin()
                    ? (
                        <button className="btn btn-danger btn-large removeText" onClick={() => { props.deleteTeam(props.team); }} type="submit">
                            <span>Remove&nbsp;</span>
                            <i className="fas fa-trash-alt" />
                        </button>
                    ) : ''
                }
            </div>
            <div className="col-sm-12">
                {props.isAdmin()
                    ? (
                        <Fragment>
                            {props.isEditingDescription
                                ? (
                                    <form onSubmit={props.editDescription}>
                                        <label className="sr-only" htmlFor="description">Description</label>
                                        <div className="input-group mb-2 mr-sm-2">
                                            <div className="input-group-prepend">
                                                <button
                                                    className="btn btn-secondary"
                                                    type="reset"
                                                    onClick={() => props.changeIsEditingDescription(false)}
                                                >
                                                    <i className="fas fa-times updateIcon" />
                                                </button>
                                            </div>
                                            <input
                                                className="form-control"
                                                description="description"
                                                defaultValue={props.team.description}
                                                type="text"
                                                id="description"
                                            />
                                            <div className="input-group-prepend">
                                                <button
                                                    className="btn btn-success"
                                                    type="submit"
                                                >
                                                    <i className="fas fa-check" />
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                ) : (
                                    <Fragment>
                                        {props.team.description
                                            ? (
                                                <div onClick={() => props.changeIsEditingDescription(true)} onKeyPress={() => props.changeIsEditingDescription(true)}>
                                                    <b>Description:</b>
                                                    {' '}
                                                    {props.team.description}
                                                </div>
                                            ) : (
                                                <div onClick={() => props.changeIsEditingDescription(true)} onKeyPress={() => props.changeIsEditingDescription(true)}>
                                                    <i>No description provided yet.</i>
                                                </div>
                                            )
                                        }
                                    </Fragment>
                                )
                            }
                        </Fragment>
                    ) : (
                        <Fragment>
                            {props.team.description
                                ? (
                                    <div onClick={() => props.changeIsEditingDescription(true)} onKeyPress={() => props.changeIsEditingDescription(true)}>
                                        <b>Description:</b>
                                        {' '}
                                        {props.team.description}
                                    </div>
                                ) : (
                                    <div onClick={() => props.changeIsEditingDescription(true)} onKeyPress={() => props.changeIsEditingDescription(true)}>
                                        <i>No description provided yet.</i>
                                    </div>
                                )
                            }
                        </Fragment>
                    )}
            </div>
        </div>
        <div className="row">
            <div className="col-sm-5">
                <h2 className="text-center" style={{ margin: '15px 0' }}>Members</h2>

                {props.isAdmin()
                    ? (
                        <AddMemberForm
                            addMember={props.addMemberToTeam}
                        />
                    ) : ''
                }


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
                                        {props.team.admins.some(admin => admin._id === member._id) ? (
                                            <span className="float-right badge badge-info" key={member._id}>Admin</span>
                                        ) : (
                                            <span className="float-right badge badge-secondary" key={member._id}>Member</span>
                                        )}
                                        <p className="text-secondary" style={{ margin: 0 }}>
                                        @
                                            {member.username}
                                        </p>
                                    </div>
                                </span>
                                <div className="btn-group btn-group-sm float-right memberButtons">
                                    {props.isAdmin() && member._id !== props.clientId
                                        ? (
                                            <button className="btn btn-info editMember" type="submit" onClick={() => props.editMemberRight(member)}>
                                                <i className="fas fa-user-edit" />
                                            </button>
                                        )
                                        : (
                                            ''
                                        )
                                    }
                                    {props.isAdmin() && member._id !== props.clientId
                                        ? (
                                            <button className="btn btn-danger removeMember" type="submit" onClick={() => props.deleteMember(member)}>
                                                <i className="fas fa-user-times" />
                                            </button>
                                        )
                                        : (
                                            ''
                                        )
                                    }
                                </div>
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
    changeVisibility: PropTypes.func.isRequired,
    editName: PropTypes.func.isRequired,
    isEditingName: PropTypes.bool.isRequired,
    changeIsEditingName: PropTypes.func.isRequired,
    isEditingDescription: PropTypes.bool.isRequired,
    changeIsEditingDescription: PropTypes.func.isRequired,
    editDescription: PropTypes.func.isRequired,
    isAdmin: PropTypes.func.isRequired,
    deleteTeam: PropTypes.func.isRequired,
    deleteMember: PropTypes.func.isRequired,
    editMemberRight: PropTypes.func.isRequired,
};

export default TeamView;
