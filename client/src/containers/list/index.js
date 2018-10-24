import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
        this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
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

    handleOnDragEnd(result) {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId
            && destination.index === source.index) return;

        console.log('TODO : change cards indexes via Redux');
        console.log(draggableId);
        console.log(this.props.cards(0));

        // Todo : change cards indexes via Redux
    }

    render() {
        const { cards } = this.props;
        return (
            <div className="cardsListPanel">
                <h2>My List</h2>

                <DragDropContext onDragEnd={this.handleOnDragEnd}>
                    <Droppable droppableId={1}>
                        { dropProvided => (
                            <ul
                                ref={dropProvided.innerRef}
                                {...dropProvided.droppableProps}
                                className="cardsList"
                            >
                                {cards.map(c => (
                                    <Draggable draggableId={c.id} index={c.index}>
                                        { dragProvided => (
                                            <li
                                                className="li-card"
                                                key={c.id}
                                                {...dragProvided.draggableProps}
                                                {...dragProvided.dragHandleProps}
                                                ref={dragProvided.innerRef}
                                            >
                                                <CardItem
                                                    card={c}
                                                    deleteCard={() => this.handleDeleteCard(c.id)}
                                                    deleteCardWithDelay={() => this.handleDeleteCardWithDelay(c.id)}
                                                />
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {dropProvided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>

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
