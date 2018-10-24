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
        <Droppable droppableId={String(props.board.id)} direction="horizontal">
            {dropProvided => (
                <div
                    ref={dropProvided.innerRef}
                    {...dropProvided.droppableProps}
                >
                    <h1>{props.board.name}</h1>
                    <div className="listsPanel">
                        {props.board.lists.map(l => (
                            <Draggable key={l.id} draggableId={String(l.id)} index={l.index}>
                                {dragProvided => (
                                    <div
                                        className="listCompWrapper"
                                        key={l.id}
                                        ref={dragProvided.innerRef}
                                        {...dragProvided.draggableProps}
                                        {...dragProvided.dragHandleProps}
                                    >
                                        <ListComp
                                            list={l}

                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                </div>
            )}
        </Droppable>
    </DragDropContext>
);
BoardView.propTypes = {
    board: PropTypes.instanceOf(Board).isRequired,
};

export default BoardView;
