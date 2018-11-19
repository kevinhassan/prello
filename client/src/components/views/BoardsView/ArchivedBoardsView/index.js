import React from 'react';
import PropTypes from 'prop-types';

// ===== Components

// ===== Others
import './style.css';
// ==================================


const ArchivedBoardsView = props => (
    <span style={{ display: 'inline-block', marginLeft: '10px' }}>
        {props.boards.length > 0
            ? (
                <select
                    name="Archived Boards"
                    value="default"
                    id="archivedBoards"
                    className="custom-select"
                    onChange={event => props.updateIsArchived(event, false)}
                >
                    <option value="default" disabled>
                        {props.boards.length > 1 ? `${props.boards.length} boards archived` : `${props.boards.length} board archived`}
                    </option>
                    {props.boards.map(board => (
                        <option
                            key={board._id}
                            name={board.name}
                            value={board._id}
                        >
                            {board.name}
                        </option>
                    ))}
                </select>
            ) : (
                <p><i>No boards archived</i></p>
            )}
    </span>
);

ArchivedBoardsView.propTypes = {
    boards: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateIsArchived: PropTypes.func.isRequired,
};
ArchivedBoardsView.defaultProps = {
};

export default ArchivedBoardsView;
