import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { fetchBoard } from '../../actions/board';

// ===== Models
import Board from '../../models/Board';

// ===== Components / Containers
import BoardView from '../../components/views/BoardView';

// ===== Others

class BoardComp extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
    }

    componentWillMount() {
        // TODO: use boardId in URL
        this.props.fetchBoard('b00000000001');
    }

    handleOnDragEnd(result) {
        console.log(result);

        const source = result.source;
        const destination = result.destination;

        if (!destination) {

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
        fetchBoard,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardComp);
