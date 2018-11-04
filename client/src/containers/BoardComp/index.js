import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { fetchBoard, updateListsIndexes } from '../../actions/boards';
import { createList } from '../../actions/lists';

// ===== Components / Containers
import BoardView from '../../components/views/BoardView';
import List from '../../models/List';

// ===== Others

class BoardComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isInputVisible: false,
            isWaitingForAPIConfirmation: false,
            pendingLists: [],
        };
        this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
        this.handleAddList = this.handleAddList.bind(this);
        this.reorder = this.reorder.bind(this);
        this.handleListAdded = this.handleListAdded.bind(this);
    }

    componentWillMount() {
        this.props.fetchBoard(this.props.match.params.boardId);
    }

    componentWillReceiveProps() {
        this.setState({ isWaitingForAPIConfirmation: false });
    }

    /*
        Reorder an Array where the item at position startIndex
        was moved to endIndex.
    */
    reorder = (array, startIndex, endIndex) => {
        const result = Array.from(array);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    handleAddList(value) {
        this.setState({ isInputVisible: value });
    }

    handleListAdded(event) {
        event.preventDefault();
        const name = event.target.listName.value;
        const newList = new List({
            name, boardId: this.props.board._id,
        });
        this.props.createList(newList);
        this.setState({ isInputVisible: false });
    }


    handleOnDragEnd(result) {
        const { destination, source, type } = result;

        // Drop elsewhere than Drag N Drop context
        if (!destination) {
            return;
        }

        // List dropped
        if (type === 'LIST') {
            const { lists, _id } = this.props.board;
            const listsUpdated = this.reorder(lists, source.index, destination.index);

            this.setState({ pendingLists: listsUpdated });
            this.setState({ isWaitingForAPIConfirmation: true });

            this.props.updateListsIndexes(_id, listsUpdated);
            return;
        }
        if (type === 'CARD') {
            // TODO : reorder cards
        }
    }

    render() {
        const { board } = this.props;
        if (board) {
            // If changes were made on lists (moved for example), we give the board modified.
            // else, we give the board from the store which is the same as in server.
            if (this.state.isWaitingForAPIConfirmation) {
                // shallow copy of board
                const pendingBoard = JSON.parse(JSON.stringify(board));

                pendingBoard.lists = this.state.pendingLists;
                return (
                    <BoardView
                        board={pendingBoard}
                        isInputVisible={this.state.isInputVisible}
                        onDragEnd={this.handleOnDragEnd}
                        displayAddListForm={this.handleAddList}
                        onListAdded={this.handleListAdded}
                    />
                );
            }

            return (
                <BoardView
                    board={board}
                    onDragEnd={this.handleOnDragEnd}
                    isInputVisible={this.state.isInputVisible}
                    displayAddListForm={this.handleAddList}
                    onListAdded={this.handleListAdded}
                />
            );
        }
        return '';
    }
}
BoardComp.propTypes = {
    board: PropTypes.object,
    fetchBoard: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            boardId: PropTypes.string,
        }),
    }).isRequired,
    updateListsIndexes: PropTypes.func.isRequired,
    createList: PropTypes.func.isRequired,
};
BoardComp.defaultProps = {
    board: undefined,
};

// Put info from the store state in props
const mapStateToProps = ({ boardsReducer }) => ({
    board: boardsReducer.board,
    didAnErrorOccured: boardsReducer.didAnErrorOccured,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        updateListsIndexes,
        fetchBoard,
        createList,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardComp);
