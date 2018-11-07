import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { fetchBoard, updateListsIndexes, removeBoardFetch } from '../../actions/boards';
import { createList, moveCard } from '../../actions/lists';

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

    componentWillUnmount() {
        this.props.removeBoardFetch();
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
            name, board: this.props.board,
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

            // Set pending State
            this.setState({ pendingLists: listsUpdated, isWaitingForAPIConfirmation: true }, () => {
                // Dispatch action
                this.props.updateListsIndexes(_id, listsUpdated);
            });
            return;
        }
        // Card dropped
        if (type === 'CARD') {
            const { lists } = this.props.board;
            const cardId = result.draggableId;
            const destinationListId = destination.droppableId;
            const destinationIndex = destination.index;
            const sourceListId = source.droppableId;

            // Get card info
            const sourceList = lists.find(list => list._id === sourceListId);
            const cardMoved = sourceList.cards.filter(c => c._id === cardId)[0];

            // Update lists
            const listsUpdated = lists.map((list) => {
                if (list._id === sourceListId) {
                    list.cards.splice(list.cards.findIndex(card => card._id === cardId), 1);
                }
                if (list._id === destinationListId) {
                    list.cards.splice(destinationIndex, 0, cardMoved);
                }
                return list;
            });

            // Set pending State
            this.setState({ pendingLists: listsUpdated, isWaitingForAPIConfirmation: true }, () => {
                // Dispatch action
                this.props.moveCard(sourceListId, destinationListId, cardId, destinationIndex, listsUpdated);
            });
        }
    }

    render() {
        const { board } = this.props;
        if (board) {
            // If changes were made on lists (moved for example), we give the board modified.
            // else, we give the board from the store which is the same as in server.
            if (this.state.isWaitingForAPIConfirmation) {
                const pendingBoard = {
                    ...board,
                    lists: this.state.pendingLists,
                };

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
    createList: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
    removeBoardFetch: PropTypes.func.isRequired,
    updateListsIndexes: PropTypes.func.isRequired,
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
        createList,
        fetchBoard,
        moveCard,
        removeBoardFetch,
        updateListsIndexes,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardComp);
