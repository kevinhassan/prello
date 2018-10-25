import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';

// ===== Components / Containers
import CardComp from '../../../containers/CardComp';

// ===== Models
import List from '../../../models/List';

// ===== Others
import './style.css';

// ==================================

const ListView = props => (
    <div className="cardsListPanel">
        <h3>{props.list.name}</h3>
        {props.list.isArchived ? 'Archived' : 'Not archived'}

        <Droppable droppableId={String(props.list.id)} type="CARD">
            {dropProvided => (
                <ul ref={dropProvided.innerRef} className="cardsList">
                    {props.list.cards.map(c => (
                        <Draggable key={c.id} draggableId={String(c.id)} index={c.index} type="CARD">
                            {dragProvided => (
                                <div>
                                    <li
                                        className="card-li"
                                        key={c.id}
                                        {...dragProvided.draggableProps}
                                        {...dragProvided.dragHandleProps}
                                        ref={dragProvided.innerRef}
                                    >
                                        <CardComp
                                            card={c}
                                        />
                                        {dragProvided.placeholder}
                                    </li>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {dropProvided.placeholder}
                </ul>
            )}
        </Droppable>

        <button className="btn btn-success addCardButton" type="submit" onClick={props.createCard}>Create new Card</button>
    </div>


);

ListView.propTypes = {
    list: PropTypes.instanceOf(List).isRequired,
    createCard: PropTypes.func.isRequired,
};

export default ListView;
