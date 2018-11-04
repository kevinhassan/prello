import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';

// ===== Components / Containers
import CardComp from '../../../containers/CardComp';

// ===== Components
import AddCardForm from './AddCardForm';

// ===== Models

// ===== Others
import './style.css';

// ==================================

const ListView = props => (
    <div className={'cardsListPanel '.concat(props.isBeingDragged ? 'listDragged' : '')}>
        <div className="cardHeader">
            <h3 className="listName">
                {props.list.name}
            </h3>
            <i className="archiveCardIcon fas fa-archive float-right" />
        </div>

        <Droppable droppableId={String(props.list._id)} type="CARD">
            {dropProvided => (
                <div ref={dropProvided.innerRef} className="cardsList">
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
                                            boardLabels={props.boardLabels}
                                        />
                                        {dragProvided.placeholder}
                                    </li>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {dropProvided.placeholder}
                    <button className="btn btn-success addCardButton" type="submit" onClick={props.createCard}>Create new Card</button>
                </div>
            )}
        </Droppable>

        <AddCardForm
            displayAddCardForm={props.displayAddCardForm}
            isInputVisible={props.isInputVisible}
            onCardAdded={props.onCardAdded}
        />
    </div>


);

ListView.propTypes = {
    boardLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
    list: PropTypes.object.isRequired,
    isInputVisible: PropTypes.bool.isRequired,
    isBeingDragged: PropTypes.bool,
    displayAddCardForm: PropTypes.func.isRequired,
    onCardAdded: PropTypes.func.isRequired,
};
ListView.defaultProps = {
    isBeingDragged: false,
};

export default ListView;
