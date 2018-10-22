import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import Dragula from 'react-dragula';

import { deleteCard, deleteCardWithDelay, createCard } from '../../actions/cards';
import './style.css';

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteCard = this.handleDeleteCard.bind(this);
        this.handleDeleteCardWithDelay = this.handleDeleteCardWithDelay.bind(this);
    }

    dragulaDecorator = (componentBackingInstance) => {
        if (componentBackingInstance) {
            const options = { direction: 'horizontal' };
            Dragula([componentBackingInstance], options);
        }
    };

    handleDeleteCard(id) {
        this.props.deleteCard(id);
    }


    handleDeleteCardWithDelay(id) {
        this.props.deleteCardWithDelay(id);
    }

    handleCreateCard() {
        this.props.createCard();
    }

    render() {
        return (
            <div className="cardsPanel">
                <h1>My cards</h1>
                <p>
                    Number of cards:
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        {this.props.cards.length}
                    </span>
                </p>

                {this.props.error !== '' ? <p className="errorMsg">{this.props.error}</p> : ''}
                <p>
                    <button type="button" className="btn btn-danger" onClick={() => this.handleDeleteCard(42)}>
                        Try to delete card with id = 42.
                    </button>
                    <button type="button" className="btn btn-success" onClick={() => this.handleCreateCard()}>
                        Create new card
                    </button>
                </p>
                <ul className="cardsList" ref={this.dragulaDecorator}>
                    {this.props.cards.map(x => (
                        <li className="card" key={x.id}>
                            <div className="cardContent">
                                <h3>{x.id}</h3>
                                <p>{x.description}</p>
                                <p>
                                    <button type="button" className="btn btn-danger" onClick={() => this.handleDeleteCard(x.id)}>
                                        <i className="fas fa-trash-alt" />
                                    </button>
                                    <button type="button" style={{ marginLeft: '5px' }} className="btn btn-danger" onClick={() => this.handleDeleteCardWithDelay(x.id)}>
                                        <i className="fas fa-trash-alt" />
                                        {' '}
                                        with delay
                                    </button>
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>

                <button type="button" className="btn btn-link" onClick={() => this.props.changePage()}>
                    Go to about page via redux
                </button>
            </div>
        );
    }
}
Cards.propTypes = {
    cards: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired,
    createCard: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
    deleteCardWithDelay: PropTypes.func.isRequired,
    changePage: PropTypes.func.isRequired,
};

// Put info from the store state in props
const mapStateToProps = ({ cards }) => ({
    cards: cards.cards,
    isLoading: cards.isLoading,
    error: cards.error,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        createCard,
        deleteCard,
        deleteCardWithDelay,
        changePage: () => push('/about-us'),
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Cards);
