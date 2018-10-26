import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { fetchBoard } from '../../actions/board';
import { updateListsIndexes } from '../../actions/board';

// ===== Models
import Board from '../../models/Board';

// ===== Components / Containers
import BoardView from '../../components/views/BoardView';

// ===== Others

class BoardComp extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
        this.reorder = this.reorder.bind(this);
    }

    componentWillMount() {
        // TODO: use boardId in URL
        this.props.fetchBoard('b00000000001');
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
        console.log(result);
        const { destination, source, type } = result;

        // Drop elsewhere than Drag N Drop context
        if (!destination) {

        }

        // List dropped
        if (type === 'LIST') {
            const { lists } = this.props.board;
            const listsUpdated = this.reorder(lists, source.index, destination.index);
            console.log(listsUpdated)
            this.props.updateListsIndexes(listsUpdated);
        }
        if (type === 'CARD') {
            // TODO : reorder cards
        }
    }

    render() {
        const { board } = this.props;
        if (board) {
            return (
                <BoardView board={board} onDragEnd={this.handleOnDragEnd} />
            );
        }
        return '';
    }
}
BoardComp.propTypes = {
    board: PropTypes.instanceOf(Board),
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
