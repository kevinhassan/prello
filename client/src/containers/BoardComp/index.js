import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { fetchBoard, updateListsIndexes } from '../../actions/board';

// ===== Components / Containers
import BoardView from '../../components/views/BoardView';

// ===== Others

class BoardComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isWaitingForAPIConfirmation: false,
            pendingLists: [],
        };
        this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
        this.reorder = this.reorder.bind(this);
    }

    componentWillMount() {
        // TODO: use boardId in URL
        this.props.fetchBoard('b00000000001');
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
                const pendingBoard = board;
                pendingBoard.lists = this.state.pendingLists;
                return (
                    <BoardView board={pendingBoard} onDragEnd={this.handleOnDragEnd} />
                );
            }

            return (
                <BoardView board={board} onDragEnd={this.handleOnDragEnd} />
            );
        }
        return '';
    }
}
BoardComp.propTypes = {
    board: PropTypes.object,
    fetchBoard: PropTypes.func.isRequired,
    updateListsIndexes: PropTypes.func.isRequired,
};
BoardComp.defaultProps = {
    board: undefined,
};

// Put info from the store state in props
const mapStateToProps = ({ boardReducer }) => ({
    board: boardReducer.board,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        updateListsIndexes,
        fetchBoard,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardComp);
