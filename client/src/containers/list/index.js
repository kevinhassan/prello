import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../../models/Card';

import CardItem from '../../components/card';

// ===== Actions
import { deleteCard, deleteCardWithDelay, createCard } from '../../actions/cards';

// ===== Others
import './style.css';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.handleCreateCard = this.handleCreateCard.bind(this);
        this.handleDeleteCard = this.handleDeleteCard.bind(this);
        this.handleDeleteCardWithDelay = this.handleDeleteCardWithDelay.bind(this);
    }

    handleDeleteCard(cardId) {
        this.props.deleteCard(cardId);
    }

    handleDeleteCardWithDelay(cardId) {
        this.props.deleteCardWithDelay(cardId);
    }

    handleCreateCard() {
        this.props.createCard();
    }

    render() {
        const { cards } = this.props;
        return (
            <div className="cardsListPanel">
                <h2>My List</h2>
                <ul className="cardsList">
                    {cards.map(c => (
                        <li className="li-card" key={c.id}>
                            <CardItem
                                card={c}
                                deleteCard={() => this.handleDeleteCard(c.id)}
                                deleteCardWithDelay={() => this.handleDeleteCardWithDelay(c.id)}
                            />
                        </li>
                    ))}
                </ul>
                <button className="btn btn-success addCardButton" type="submit" onClick={this.handleCreateCard}>Create new Card</button>
            </div>
        );
    }
}
List.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.instanceOf(Card)).isRequired,
    createCard: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
    deleteCardWithDelay: PropTypes.func.isRequired,
};

// Put info from the store state in props (None)
const mapStateToProps = () => ({});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        createCard,
        deleteCard,
        deleteCardWithDelay,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(List);
