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
import ErrorPage from '../../components/ErrorPage';

// ===== Others

class BoardComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddListInputVisible: false,
        };
        this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
        this.handleAddList = this.handleAddList.bind(this);
        this.reorder = this.reorder.bind(this);
        this.handleListAdded = this.handleListAdded.bind(this);
    }

    componentWillMount() {
        this.props.fetchBoard(this.props.match.params.boardId);
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
        this.setState({ isAddListInputVisible: value });
    }

    handleListAdded(event) {
        event.preventDefault();
        const name = event.target.listName.value;
        const newList = new List({
            name, board: this.props.board,
        });
        this.props.createList(newList);
        this.setState({ isAddListInputVisible: false });
    }

    handleOnDragEnd(result) {
        const { destination, source, type } = result;

        // Drop elsewhere than Drag N Drop context
        if (!destination) {
            return;
        }

        // List dropped
        if (type === 'LIST') {
            const { _id } = this.props.board;

            // Copy by value
            const lists = JSON.parse(JSON.stringify(this.props.board.lists));
            const listsUpdated = this.reorder(lists, source.index, destination.index);

            // Dispatch action
            this.props.updateListsIndexes(_id, listsUpdated, this.props.board.lists);
            return;
        }

        // Card dropped
        if (type === 'CARD') {
            // Copy by value
            const lists = JSON.parse(JSON.stringify(this.props.board.lists));

            const cardId = result.draggableId;
            const destinationListId = destination.droppableId;
            const destinationIndex = destination.index;
            const sourceListId = source.droppableId;

            // Get card info
            const sourceList = lists.find(list => list._id === sourceListId);
            const cardMoved = sourceList.cards.filter(c => c._id === cardId)[0];

            // Update card
            const cardUpdated = {
                ...cardMoved,
                list: {
                    _id: destinationListId,
                },
            };

            // Update lists
            const listsUpdated = lists.map((list) => {
                if (list._id === sourceListId) {
                    list.cards.splice(list.cards.findIndex(card => card._id === cardId), 1);
                }
                if (list._id === destinationListId) {
                    list.cards.splice(destinationIndex, 0, cardUpdated);
                }
                return list;
            });

            // Dispatch action
            this.props.moveCard(sourceListId, destinationListId, cardId, destinationIndex, listsUpdated, this.props.board.lists);
        }
    }

    render() {
        const { board, errorMessage, status } = this.props;
        if (errorMessage || status) {
            return (
                <ErrorPage
                    status={status}
                    message={errorMessage}
                />
            );
        }
        if (board) {
            return (
                <BoardView
                    board={board}
                    isAddListInputVisible={this.state.isAddListInputVisible}
                    onDragEnd={this.handleOnDragEnd}
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

    errorMessage: PropTypes.string,
    status: PropTypes.number,
};
BoardComp.defaultProps = {
    board: undefined,
    errorMessage: undefined,
    status: undefined,
};

// Put info from the store state in props
const mapStateToProps = ({ currentBoard }) => ({
    board: currentBoard.board,
    status: currentBoard.status,
    errorMessage: currentBoard.errorMessage,
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
