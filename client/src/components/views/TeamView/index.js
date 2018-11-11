import React from 'react';
import PropTypes from 'prop-types';

// ===== Components
import BoardItem from '../../BoardItem';

// ===== Others
import './style.css';

// ==================================

const TeamView = props => (
    <div className="teamContent container-fluid">
        <h1 style={{ marginTop: 0 }}>{props.team.name}</h1>

        <h2>Visibility</h2>
        {props.team.isVisible ? 'public' : 'private'}
        <h2>Admins</h2>
        <ul>
            {props.team.admins.map(admin => (
                <li key={admin._id}>
                    <span
                        onClick={event => props.onMemberClick(event, admin._id)}
                        onKeyDown={event => props.onMemberClick(event, admin._id)}
                    >
                        {admin.username}
                    </span>
                </li>
            ))}
        </ul>
        <h2>Members</h2>
        <ul>
            {props.team.members.map(member => (
                <li key={member._id}>
                    <span
                        onClick={event => props.onMemberClick(event, member._id)}
                        onKeyDown={event => props.onMemberClick(event, member._id)}
                    >
                        {member.username}
                    </span>
                </li>
            ))}
        </ul>
        <h2>Boards</h2>
        <ul className="boards-ul">
            {props.team.boards.map(board => (
                <li
                    className="board-li"
                    key={board._id}
                >
                    <BoardItem
                        board={board}
                        lightCSS
                        onBoardClick={() => props.onBoardClick(board._id)}
                        readOnlyBoard
                    />
                </li>
            ))}
        </ul>
    </div>
);
TeamView.propTypes = {
    team: PropTypes.object.isRequired,
    onBoardClick: PropTypes.func.isRequired,
    onMemberClick: PropTypes.func.isRequired,
};

export default TeamView;
