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
        <h1 className="boards-h1">
            Boards
            {' '}
        </h1>

        <CreateBoard
            createBoard={props.createBoard}
            isCreateBoardFormVisible={props.isCreateBoardFormVisible}
            displayCreateBoardForm={props.displayCreateBoardForm}
        />

        {props.boards.length > 0
            ? (
                <div className="boardsContent">
                    <ul className="boards-ul">
                        {props.boards.map((board) => {
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
                                        isReadOnly={false}
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
                    <p className="text-center h3">
                        <button type="button" className="btn btn-success">
                            <i className="fas fa-plus" />
                            {' '}
                            Create one
                        </button>
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
