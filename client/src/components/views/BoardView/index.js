import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// ===== Components
import AddListForm from './AddListForm';
import MemberPill from '../../MemberPill';

// ===== Containers
import ListComp from '../../../containers/ListComp';
import BoardNameComp from '../../../containers/BoardComp/BoardNameComp';

// ===== Others
import './style.css';

// ==================================

const BoardView = props => (
    <div className="boardPanel container-fluid">
        <div className="row">
            <div className="col-sm-12 boardSettingsBar">
                <BoardNameComp
                    boardId={props.board._id}
                    name={props.board.name}
                />

                {' | '}
                {props.board.visibility === 'public' ? <i className="fas fa-globe" /> : ''}
                {props.board.visibility === 'private' ? <i className="fas fa-lock" /> : ''}
                {props.board.visibility === 'team' ? <i className="fas fa-user-friends" /> : ''}
                {' '}
                <span style={{ verticalAlign: 'sub' }}>{props.board.visibility[0].toUpperCase() + props.board.visibility.slice(1)}</span>
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
                isInputVisible={props.isAddListInputVisible}
                onListAdded={props.onListAdded}
            />
        </div>
    </div>
);
BoardView.propTypes = {
    board: PropTypes.object.isRequired,
    isAddListInputVisible: PropTypes.bool.isRequired,
    onDragEnd: PropTypes.func.isRequired,
    displayAddListForm: PropTypes.func.isRequired,
};

export default BoardView;
