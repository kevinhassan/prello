import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// ===== Containers
import ListComp from '../../../containers/ListComp';

// ===== Models
import Board from '../../../models/Board';

// ===== Others
import './style.css';

// ==================================

const BoardView = props => (
    <div className="boardPanel">
        <DragDropContext onDragEnd={props.onDragEnd}>
            <div className="col-sm-12 boardSettingsBar">
                <h1 className="boardSettingsBtn boardName">{props.board.name}</h1>
                <i className="far fa-star boardSettingsBtn starBtn" />
            </div>
            <Droppable droppableId="currentBoard" direction="horizontal" type="LIST">
                {dropProvided => (
                    <div
                        className="listsPanel"
                        ref={dropProvided.innerRef}
                        {...dropProvided.droppableProps}
                    >
                        {props.board.lists.map(l => (
                            <Draggable draggableId={l._id} index={l.index} key={l._id} type="LIST">
                                {dragProvided => (
                                    <div
                                        className="listCompWrapper"
                                        key={l._id}
                                        ref={dragProvided.innerRef}
                                        {...dragProvided.dragHandleProps}
                                        {...dragProvided.draggableProps}
                                    >
                                        <ListComp
                                            list={l}
                                            isBeingDragged={dragSnapshot.isDragging}
                                        />
                                        {dragProvided.placeholder}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {dropProvided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    </div>
);
BoardView.propTypes = {
    board: PropTypes.instanceOf(Board).isRequired,
    onDragEnd: PropTypes.func.isRequired,
};

export default BoardView;
