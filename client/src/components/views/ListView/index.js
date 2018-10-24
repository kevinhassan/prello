import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// ===== Components / Containers
import CardItem from '../../card';

// ===== Models
import List from '../../../models/List';

// ===== Others
import './style.css';

// ==================================

const ListView = props => (
    <div className="cardsListPanel">
        <h3>{props.list.name}</h3>
        {props.list.isArchived ? 'Archived' : 'Not archived'}

        <DragDropContext onDragEnd={props.handleOnDragEnd}>
            <Droppable droppableId={String(props.list.id)}>
                { dropProvided => (
                    <ul
                        ref={dropProvided.innerRef}
                        {...dropProvided.droppableProps}
                        className="cardsList"
                    >
                        {props.list.cards.map(c => (
                            <Draggable key={c.id} draggableId={String(c.id)} index={c.index}>
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

        <button className="btn btn-success addCardButton" type="submit" onClick={props.handleCreateCard}>Create new Card</button>
    </div>
);

ListView.propTypes = {
    list: PropTypes.instanceOf(List).isRequired,
    createCard: PropTypes.func.isRequired,
    handleOnDragEnd: PropTypes.func.isRequired,
};

export default ListView;
