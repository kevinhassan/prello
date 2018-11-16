import React from 'react';
import PropTypes from 'prop-types';

// ===== Components

// ===== Others
import './style.css';
// ==================================


const BoardArchivedCardsView = props => (
    <span className="boardSettingsItem" style={{ display: 'inline-block', verticalAlign: 'unset' }}>
        <select
            name="Archived Cards"
            defaultValue="Archived cards"
            id="archivedCards"
            className="custom-select custom-select-sm"
        >
            <option disabled>Archived cards</option>
            {props.board.lists.map(list => list.cards.filter(card => card.isArchived).map(card => (
                <option name={card._id} onClick={() => props.unarchiveCard(card)}>{card.name}</option>
            )))}

        </select>
    </span>
);

BoardArchivedCardsView.propTypes = {
    board: PropTypes.object.isRequired,
    unarchiveCard: PropTypes.func.isRequired,
};
BoardArchivedCardsView.defaultProps = {
};

export default BoardArchivedCardsView;
