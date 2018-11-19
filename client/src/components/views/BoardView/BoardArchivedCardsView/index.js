import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// ===== Components

// ===== Others
import './style.css';
// ==================================


const BoardArchivedCardsView = props => (
    <Fragment>
        <span className="boardSettingsSeparator" />
        <span className="boardSettingsItem" style={{ display: 'inline-block', verticalAlign: 'unset' }}>
            <select
                name="Archived Cards"
                value="default"
                onChange={() => {}}
                id="archivedCards"
                className="custom-select custom-select-sm"
                style={{ maxWidth: '12vw' }}
            >
                <option value="default" disabled>
                    {props.cards.length > 1 ? `${props.cards.length} cards archived` : `${props.cards.length} card archived`}
                </option>
                {props.cards.map(card => (
                    <option
                        key={card._id}
                        name={card._id}
                        onClick={() => props.unarchiveCard(card)}
                    >
                        {card.name}
                    </option>
                ))}
            </select>
        </span>
    </Fragment>
);

BoardArchivedCardsView.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
    unarchiveCard: PropTypes.func.isRequired,
};
BoardArchivedCardsView.defaultProps = {
};

export default BoardArchivedCardsView;
