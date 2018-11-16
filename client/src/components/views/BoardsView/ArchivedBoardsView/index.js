import React from 'react';
import PropTypes from 'prop-types';

// ===== Components

// ===== Others
import './style.css';
// ==================================


const ArchivedBoardsView = props => (
    <span className="boardSettingsItem" style={{ display: 'inline-block' }}>
        <select name="Archived Boards" defaultValue="Archived boards" id="archivedBoards" className="custom-select">
            <option disabled>Archived boards</option>
            {props.boards.filter(board => board.isArchived).map(board => (
                <option name={board._id} onClick={event => props.updateIsArchived(event, board._id, false)}>{board.name}</option>
            ))}
        </select>
    </span>
);

ArchivedBoardsView.propTypes = {
    boards: PropTypes.object.isRequired,
    updateIsArchived: PropTypes.func.isRequired,
};
ArchivedBoardsView.defaultProps = {
};

export default ArchivedBoardsView;
