import React from 'react';
import PropTypes from 'prop-types';
import { Droppable, Draggable } from 'react-beautiful-dnd';

// ===== Components / Containers
import CardComp from '../../../containers/CardComp';

// ===== Components
import AddCardForm from './AddCardForm';
import ListNameComp from '../../../containers/ListComp/ListNameComp';

// ===== Models

// ===== Others
import './style.css';

// ==================================

const ListView = props => (
    <div className={'cardsListPanel '.concat(props.isBeingDragged ? 'listDragged' : '')}>
        <div className="cardHeader" style={{ position: 'relative' }}>
            <ListNameComp
                listId={props.list._id}
                name={props.list.name}
            />
            <i
                className="archiveIcon fas fa-archive float-right"
                onClick={props.archiveList}
                onKeyDown={props.archiveList}
            />
        </div>

        <Droppable droppableId={String(props.list._id)} type="CARD">
            {dropProvided => (
                <div ref={dropProvided.innerRef} className="cardsList">
                    {props.list.cards.map((c, index) => (
                        c.isArchived ? ''
                            : (
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
                            )
                    ))}
                    {dropProvided.placeholder}
                    <AddCardForm
                        displayAddCardForm={props.displayAddCardForm}
                        isInputVisible={props.isInputVisible}
                        onCardAdded={props.onCardAdded}
                    />
                </div>
            )}
        </Droppable>

    </div>
);

ListView.propTypes = {
    boardLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
    list: PropTypes.object.isRequired,
    isInputVisible: PropTypes.bool.isRequired,
    isBeingDragged: PropTypes.bool,
    displayAddCardForm: PropTypes.func.isRequired,
    onCardAdded: PropTypes.func.isRequired,
    archiveList: PropTypes.func.isRequired,
};
ListView.defaultProps = {
    isBeingDragged: false,
};

export default ListView;
