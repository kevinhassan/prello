import React from 'react';
import PropTypes from 'prop-types';

// ===== Containers
import List from '../../../containers/list';

// ===== Models
import Board from '../../../models/Board';

// ===== Others
import './style.css';

// ==================================

const BoardView = props => (
    <div className="cardsPanel">
        <h1>{props.board.name}</h1>
        <div className="listsPanel">
            {props.board.lists.map(l => (
                <List
                    cards={l.cards}
                />
            ))}
        </div>
    </div>
);
BoardView.propTypes = {
    board: PropTypes.instanceOf(Board).isRequired,
};

export default BoardView;
