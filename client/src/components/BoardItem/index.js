import React from 'react';
import PropTypes from 'prop-types';

// ===== Components
import MemberPill from '../MemberPill';

// ===== Containers

// ===== Others
import './style.css';

// ==================================

const BoardItem = props => (

    <div
        className={props.lightCSS ? 'board-li-content-light' : 'board-li-content'}
        onClick={() => props.onBoardClick(props.board._id)}
        onKeyDown={() => props.onBoardClick(props.board._id)}
    >
        {props.readOnlyBoard
            ? (
                ''
            ) : (
                <i
                    className="archiveIcon fas fa-archive float-right"
                    onClick={event => props.updateIsArchived(event, props.board._id, true)}
                    onKeyDown={event => props.updateIsArchived(event, props.board._id, true)}
                />
            )
        }
        <p className="boardName">{props.board.name}</p>
        <p className="boardInfo">
            <b>{`${props.board.lists.length}`}</b>
            {` list${props.board.lists.length > 1 ? 's' : ''}`}
            {' '}
            <b style={{ marginLeft: '5px' }}>{props.board.lists.reduce((sum, list) => sum + list.cards.length, 0)}</b>
            {` card${props.board.lists.reduce((sum, list) => sum + list.cards.length, 0) > 1 ? 's' : ''}`}
            {' '}
            {props.board.visibility === 'public' ? <i style={{ marginLeft: '5px' }} className="fas fa-globe" /> : ''}
            {props.board.visibility === 'private' ? <i style={{ marginLeft: '5px' }} className="fas fa-lock" /> : ''}
            {props.board.visibility === 'team' ? <i style={{ marginLeft: '5px' }} className="fas fa-user-friends" /> : ''}
        </p>
        <div>
            { props.board.teams.length === 0
                ? (
                    <p className="boardInfo">
                        <i>No team assigned yet.</i>
                    </p>
                ) : (
                    <p className="boardInfo teamsList">
                        <i className="fas fa-users" />
                        {' '}
                        {props.board.teams.map(team => (
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
                <b>{` ${props.board.members.length}`}</b>
                {` member${props.board.members.length > 1 ? 's' : ''}: `}
            </p>
            <ul className="membersInitialsList">
                {props.board.members.map(member => (
                    <li key={member._id}>
                        <MemberPill member={member} />
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

BoardItem.propTypes = {
    board: PropTypes.object.isRequired,
    lightCSS: PropTypes.bool.isRequired,
    onBoardClick: PropTypes.func.isRequired,
    onTeamClick: PropTypes.func.isRequired,
    readOnlyBoard: PropTypes.bool.isRequired,
    updateIsArchived: PropTypes.func,
};
BoardItem.defaultProps = {
    updateIsArchived: () => {},
};

export default BoardItem;
