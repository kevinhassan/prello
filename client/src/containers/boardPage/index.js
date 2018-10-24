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
import './style.css';

const BoardPage = (props) => {
    const { board } = props;
    return <BoardView board={board} />;
};
BoardPage.propTypes = {
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
)(BoardPage);
