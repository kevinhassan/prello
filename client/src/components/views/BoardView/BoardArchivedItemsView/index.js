import React from 'react';
import PropTypes from 'prop-types';

// ===== Components

// ===== Others

// ==================================


const BoardArchivedItemsView = props => (
    <span className="boardSettingsItem" style={{ display: 'inline-block' }}>
        <i className="fas fa-save" />
        <select name="Archived lists">
            <option disabled selected>Archived lists</option>
            {props.board.lists.filter(list => list.isArchived).length > 0
                ? (
                    props.board.lists.filter(list => list.isArchived).map(list => (
                        <option name={list._id} onClick={() => props.unarchiveList(list)}>{list.name}</option>))
                ) : (
                    <span>0 archived list</span>
                )
            }
        </select>
    </span>
);

BoardArchivedItemsView.propTypes = {
    board: PropTypes.object.isRequired,
    unarchiveList: PropTypes.func.isRequired,
};
BoardArchivedItemsView.defaultProps = {
};

export default BoardArchivedItemsView;
