import React from 'react';
import PropTypes from 'prop-types';

// ===== Components

// ===== Containers
import BoardItemComp from '../../../../containers/BoardItemComp';

// ===== Others
import './style.css';

// ==================================

const BoardsTab = props => (
    <div style={{
        backgroundColor: '#fff', height: '100%', padding: '20px 100px', width: '100%',
    }}
    >
        {props.boards.length > 0
            ? (
                <div className="boardsContent">
                    <p className="text-center text-dark"><b><i>Public boards and visible teams only.</i></b></p>
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
                                        lightCSS={false}
                                        readOnlyBoard
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                <p className="text-center text-dark"><b><i>No public boards yet.</i></b></p>
            )
        }
    </div>
);
BoardsTab.propTypes = {
    boards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BoardsTab;
