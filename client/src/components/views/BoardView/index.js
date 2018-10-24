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
    <DragDropContext onDragEnd={props.onDragEnd}>
        <h1>{props.board.name}</h1>

        <Droppable droppableId="currentBoard" direction="horizontal">
            {dropProvided => (
                <div
                    className="listsPanel"
                    ref={dropProvided.innerRef}
                    {...dropProvided.droppableProps}
                >
                    {props.board.lists.map(l => (
                        <Draggable draggableId={l.id} index={l.index} key={l.id}>
                            {dragProvided => (
                                <div
                                    className="listCompWrapper"
                                    key={l.id}
                                    ref={dragProvided.innerRef}
                                    {...dragProvided.dragHandleProps}
                                    {...dragProvided.draggableProps}
                                >
                                    <ListComp list={l} />
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
);
BoardView.propTypes = {
    board: PropTypes.instanceOf(Board).isRequired,
    onDragEnd: PropTypes.func.isRequired,
};

export default BoardView;
