import React from 'react';
import PropTypes from 'prop-types';

// ===== Others
import './style.css';

// ==================================

const TeamView = props => (
  <div className="boardPanel container-fluid">
    <h1>{props.team.name}</h1>
    <h2>Visibility</h2>
    {props.team.isVisible ? 'public' : 'private'}
    <h2>Admins</h2>
    <ul>
      {props.team.admins.map((admin) => {
        return(
          <li key={admin._id}>
            <span
              onClick={event => props.onMemberClick(event, admin._id)}
              onKeyDown={event => props.onMemberClick(event, admin._id)}
            >
              {admin.username}
            </span>
          </li>
        );
      })}
    </ul>
    <h2>Members</h2>
    <ul>
      {props.team.members.map((member) => {
        return(
          <li key={member._id}>
            <span
              onClick={event => props.onMemberClick(event, member._id)}
              onKeyDown={event => props.onMemberClick(event, member._id)}
            >
              {member.username}
            </span>
          </li>
        );
      })}
    </ul>
    <h2>Boards</h2>
    <ul>
      {props.team.boards.map((board) => {
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
            </div>
          </li>
        )
      })}
    </ul>
  </div>
);
TeamView.propTypes = {
  team: PropTypes.object.isRequired,
  onBoardClick: PropTypes.func.isRequired,
};

export default TeamView;
