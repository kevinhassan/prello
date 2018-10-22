import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

// ===== Models
import Card from '../../models/Card';

// ===== Components / Containers
import List from '../list';

// ===== Actions

// ===== Others
import './style.css';

const Board = (props) => {
    const { cards, error } = props;
    const element = (
        <div className="cardsPanel">
            <h1>My cards</h1>
            <p>
                Number of cards:
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    {cards.length}
                </span>
            </p>

            {error !== '' ? <p className="errorMsg">{error}</p> : ''}

            <div className="listsPanel">
                <List
                    cards={cards}
                />
            </div>

            <button type="button" className="btn btn-link" onClick={() => props.changePage()}>
                Go to about page via redux
            </button>
        </div>
    );
    return element;
};
Board.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.instanceOf(Card)).isRequired,
    error: PropTypes.string.isRequired,
    changePage: PropTypes.func.isRequired,
};

// Put info from the store state in props
const mapStateToProps = ({ cardsReducer }) => ({
    cards: cardsReducer.cards,
    isLoading: cardsReducer.isLoading,
    error: cardsReducer.error,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        changePage: () => push('/about-us'),
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Board);
