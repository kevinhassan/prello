import React from 'react';
import PropTypes from 'prop-types';

// ===== Components
import CreateBoard from './CreateBoard';
import BoardItemComp from '../../../containers/BoardItemComp';

// ===== Containers

// ===== Others
import './style.css';

// ==================================

const BoardsView = props => (
    <div className="boardsPanel">
        <h1 className="boards-h1" style={{ display: 'inline' }}>
            Boards
            {' '}
        </h1>
        <span style={{ fontSize: '1.5rem' }}>
            <b>{props.boards.length}</b>
            {' '}
            boards (
            {props.boards.reduce((sum, board) => {
                if (board.isArchived) return sum + 1;
                return sum;
            }, 0)}
            {' '}
            archived)
        </span>

        <CreateBoard
            createBoard={props.createBoard}
            isCreateBoardFormVisible={props.isCreateBoardFormVisible}
            displayCreateBoardForm={props.displayCreateBoardForm}
        />

        {props.boards.length > 0
            ? (
                <div className="boardsContent">
                    <ul className="boards-ul">
                        {props.boards.sort((b1, b2) => b1.name > b2.name).map((board) => {
                            if (board.isArchived) {
                                return ('');
                            }
                            return (
                                <li
                                    className="board-li"
                                    key={board._id}
                                >
                                    <BoardItemComp
                                        board={board}
                                        readOnlyBoard={false}
                                        lightCSS
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )
            : (
                <div>
                    <p className="text-center h3">
                        {'You don\'t have access to any boards currently '}
                        <i className="fas fa-frown-open" />
                    </p>
                </div>
            )
        }
    </div>
);
BoardsView.propTypes = {
    boards: PropTypes.arrayOf(PropTypes.object).isRequired,
    createBoard: PropTypes.func.isRequired,
    displayCreateBoardForm: PropTypes.func.isRequired,
    isCreateBoardFormVisible: PropTypes.bool.isRequired,
};

export default BoardsView;
