import React from 'react';
import PropTypes from 'prop-types';

// ===== Components
import MemberPill from '../../../MemberPill';

// ===== Containers

// ===== Others
import './style.css';

// ==================================

const BoardsTab = props => (
    <div className="boardsPanel" style={{ backgroundColor: 'transparent' }}>
        {props.boards.length > 0
            ? (
                <div className="boardsContent">
                    <p className="text-secondary">Public boards and visible teams only.</p>
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
                                        className="board-li-content board-li-content-override"
                                        onClick={() => props.onBoardClick(board._id)}
                                        onKeyDown={() => props.onBoardClick(board._id)}
                                    >
                                        <p className="boardName">{board.name}</p>
                                        <p className="boardInfo">
                                            <b>{`${board.lists.length}`}</b>
                                            {` list${board.lists.length > 1 ? 's' : ''}`}
                                            {' '}
                                            <b style={{ marginLeft: '5px' }}>{board.lists.reduce((sum, list) => sum + list.cards.length, 0)}</b>
                                            {` card${board.lists.reduce((sum, list) => sum + list.cards.length, 0) > 1 ? 's' : ''}`}
                                            {' '}
                                            {board.visibility === 'public' ? <i style={{ marginLeft: '5px' }} className="fas fa-globe" /> : ''}
                                            {board.visibility === 'private' ? <i style={{ marginLeft: '5px' }} className="fas fa-lock" /> : ''}
                                            {board.visibility === 'team' ? <i style={{ marginLeft: '5px' }} className="fas fa-user-friends" /> : ''}
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
                                                    <li key={member._id}>
                                                        <MemberPill member={member} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )
            : (
                <div>
                    <p className="text-center h3">
                        No public boards yet.
                    </p>
                </div>
            )
        }
    </div>
);
BoardsTab.propTypes = {
    boards: PropTypes.arrayOf(PropTypes.object).isRequired,
    onBoardClick: PropTypes.func.isRequired,
    onTeamClick: PropTypes.func.isRequired,
};

export default BoardsTab;
