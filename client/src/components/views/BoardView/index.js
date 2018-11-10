import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// ===== Components
import AddListForm from './AddListForm';
import MemberPill from '../../MemberPill';

// ===== Containers
import ListComp from '../../../containers/ListComp';

// ===== Others
import './style.css';

// ==================================

const BoardView = props => (
    <div className="boardPanel container-fluid">
        <div className="row">
            <div className="col-sm-12 boardSettingsBar">
                <h1 className="boardSettingsBtn boardName">{props.board.name}</h1>
                {' | '}
                <i className="fas fa-users" />
                {' '}
                {props.board.members.map(member => (
                    <MemberPill key={member._id} member={member} />
                ))}
            </div>
        </div>
        <div className="listsAndAddPanel">
            <DragDropContext onDragEnd={props.onDragEnd}>
                <Droppable droppableId="currentBoard" direction="horizontal" type="LIST">
                    {dropProvided => (
                        <div
                            className="listsPanel"
                            ref={dropProvided.innerRef}
                            {...dropProvided.droppableProps}
                        >
                            {props.board.lists.map((l, index) => (
                                l.isArchived ? ''
                                    : (
                                        <Draggable draggableId={l._id} index={index} key={l._id} type="LIST">
                                            {(dragProvided, dragSnapshot) => (
                                                <div
                                                    className="listCompWrapper"
                                                    key={l._id}
                                                    ref={dragProvided.innerRef}
                                                    {...dragProvided.dragHandleProps}
                                                    {...dragProvided.draggableProps}
                                                >
                                                    <ListComp
                                                        listId={l._id}
                                                        isBeingDragged={dragSnapshot.isDragging}
                                                    />
                                                    {dragProvided.placeholder}
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                            ))}
                            {dropProvided.placeholder}
                        </div>
                    )}

                </Droppable>
            </DragDropContext>
            <AddListForm
                displayAddListForm={props.displayAddListForm}
                isInputVisible={props.isInputVisible}
                onListAdded={props.onListAdded}
            />
        </div>
    </div>
);
BoardView.propTypes = {
    board: PropTypes.object.isRequired,
    isInputVisible: PropTypes.bool.isRequired,
    onDragEnd: PropTypes.func.isRequired,
    displayAddListForm: PropTypes.func.isRequired,
};

export default BoardView;
