import React from 'react';
import PropTypes from 'prop-types';

// ===== Components

// ===== Others
import './style.css';
// ==================================


const BoardArchivedListsView = props => (
    <span className="boardSettingsItem" style={{ display: 'inline-block' }}>
        <select name="Archived lists" className="custom-select">
            <option disabled selected>Archived lists</option>
            {props.board.lists.filter(list => list.isArchived).length > 0
                ? (
                    props.board.lists.filter(list => list.isArchived).map(list => (
                        <option name={list._id} onClick={() => props.unarchiveList(list)}>{list.name}</option>))
                ) : (
                    <span>No archived list</span>
                )
            }
            {}
        </select>
    </span>
);

BoardArchivedListsView.propTypes = {
    board: PropTypes.object.isRequired,
    unarchiveList: PropTypes.func.isRequired,
};
BoardArchivedListsView.defaultProps = {
};

export default BoardArchivedListsView;
