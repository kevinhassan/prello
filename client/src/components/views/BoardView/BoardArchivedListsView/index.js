import React from 'react';
import PropTypes from 'prop-types';

// ===== Components

// ===== Others
import './style.css';
// ==================================


const BoardArchivedListsView = props => (
    <span className="boardSettingsItem" style={{ display: 'inline-block' }}>
        <select name="Archived lists" defaultValue="Archived lists" id="archivedLists" className="custom-select">
            <option disabled>Archived lists</option>
            {props.board.lists.filter(list => list.isArchived).map(list => (
                <option name={list._id} onClick={() => props.unarchiveList(list)}>{list.name}</option>))
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
