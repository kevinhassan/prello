import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';

// ===== Components / Containers
import CardComp from '../../../containers/CardComp';

// ===== Models

// ===== Others
import './style.css';

// ==================================

const ListView = props => (
    <div className={'cardsListPanel '.concat(props.isBeingDragged ? 'listDragged' : '')}>
        <h3 className="listName">{props.list.name}</h3>

        <Droppable droppableId={String(props.list._id)} type="CARD">
            {dropProvided => (
                <ul ref={dropProvided.innerRef} className="cardsList">
                    {props.list.cards.map((c, index) => (
                        <Draggable key={c._id} draggableId={String(c._id)} index={index} type="CARD">
                            {dragProvided => (
                                <div>
                                    <li
                                        className="card-li"
                                        key={c._id}
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
    list: PropTypes.object.isRequired,
    createCard: PropTypes.func.isRequired,
    isBeingDragged: PropTypes.bool,
};
ListView.defaultProps = {
    isBeingDragged: false,
};

export default ListView;
