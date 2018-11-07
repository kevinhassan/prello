import React from 'react';
import PropTypes from 'prop-types';

// ===== Components

// ===== Containers

// ===== Others
import './style.css';

// ==================================

const BoardsView = props => (
    <div className="boardsPanel">
        <h1 className="boards-h1">
            Boards
            {' '}
            <button type="button" className="btn btn-success addBoard-miniBtn">
                <i className="fas fa-plus" />
            </button>
        </h1>
        {props.boards.length > 0
            ? (
                <div className="boardsContent">
                    <ul className="boards-ul">
                        {props.boards.map((board) => {
                            if (board.isArchived) {
                                return ('');
                            }
                            return (
                                <li
                                    className="board-li"
                                    key={board._id}
                                >
                                    <div
                                        className="board-li-content"
                                        onClick={() => props.onBoardClick(board._id)}
                                        onKeyDown={() => props.onBoardClick(board._id)}
                                    >
                                        <p className="boardName">{board.name}</p>
                                        <p className="boardInfo">
                                            <b>{`${board.lists.length}`}</b>
                                            {` list${board.lists.length > 1 ? 's' : ''}`}
                                        </p>
                                        <p className="boardInfo">
                                            <b>{board.lists.reduce((sum, list) => sum + list.cards.length, 0)}</b>
                                            {` card${board.lists.reduce((sum, list) => sum + list.cards.length, 0) > 1 ? 's' : ''}`}
                                        </p>
                                        <div>
                                            { board.teams.length === 0
                                                ? (
                                                    <p className="boardInfo">
                                                        <i>No team assigned yet.</i>
                                                    </p>
                                                ) : (
                                                    <p className="boardInfo teamsList">
                                                        <i className="fas fa-users" />
                                                        {' '}
                                                        {board.teams.map(team => (
                                                            <span
                                                                key={team._id}
                                                                className="teamLink"
                                                                onClick={event => props.onTeamClick(event, team._id)}
                                                                onKeyDown={event => props.onTeamClick(event, team._id)}
                                                            >
                                                                {team.name}
                                                            </span>
                                                        ))}
                                                    </p>
                                                )
                                            }
                                        </div>
                                        <div>
                                            <p className="boardInfo">
                                                <b>{` ${board.members.length}`}</b>
                                                {` member${board.members.length > 1 ? 's' : ''}: `}
                                            </p>
                                            <ul className="membersInitialsList">
                                                {board.members.map(member => (
                                                    <li key={member._id} className="memberInitials">
                                                        <div
                                                            className="memberLink"
                                                            onClick={event => props.onMemberClick(event, member._id)}
                                                            onKeyDown={event => props.onMemberClick(event, member._id)}
                                                        >
                                                            {member.initials}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <button type="button" className="btn btn-success">
                        <i className="fas fa-plus" />
                        {' '}
                        Create board
                    </button>
                </div>
            )
            : (
                <div>
                    <p className="text-center h3">
                        {'You don\'t have access to any boards currently '}
                        <i className="fas fa-frown-open" />
                    </p>
                    <p className="text-center h3">
                        <button type="button" className="btn btn-success">
                            <i className="fas fa-plus" />
                            {' '}
                            Create one
                        </button>
                    </p>
                </div>
            )
        }
    </div>
);
BoardsView.propTypes = {
    boards: PropTypes.arrayOf(PropTypes.object).isRequired,
    onBoardClick: PropTypes.func.isRequired,
    onMemberClick: PropTypes.func.isRequired,
    onTeamClick: PropTypes.func.isRequired,
};

export default BoardsView;
