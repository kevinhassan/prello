import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions

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

    handleOnDragEnd(result) {
        console.log(result);

        const source = result.source;
        const destination = result.destination;

        if (!destination) {
            return;
        }
    }

    render() {
        const { board } = this.props;
        return <BoardView board={board} onDragEnd={this.handleOnDragEnd} />;
    }
}
BoardComp.propTypes = {
    board: PropTypes.instanceOf(Board).isRequired,
};

// Put info from the store state in props
const mapStateToProps = ({ boardReducer }) => ({
    board: boardReducer.board,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardComp);
