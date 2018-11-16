import React from 'react';
import PropTypes from 'prop-types';

// ===== Components

// ===== Others
import './style.css';
// ==================================


const BoardArchivedCardsView = props => (
    <span className="boardSettingsItem" style={{ display: 'inline-block' }}>
        <select name="Archived lists" className="custom-select">
            <option disabled selected>Archived cards</option>
            {props.board.lists.map(list => list.cards.filter(card => card.isArchived)).length > 0
                ? (
                    props.board.lists.map(list => list.cards.filter(card => card.isArchived).map(card => (
                        <option name={card._id}>{card.name}</option>
                    )))
                ) : (
                    <span>No archived card</span>
                )
            }
            {}
        </select>
    </span>
);

BoardArchivedCardsView.propTypes = {
    board: PropTypes.object.isRequired,
    // unarchiveCard: PropTypes.func.isRequired,
};
BoardArchivedCardsView.defaultProps = {
};

export default BoardArchivedCardsView;
