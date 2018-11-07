import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

// ===== Actions

// ===== Components / Containers
import BoardsView from '../../components/views/BoardsView';

// ===== Others

class BoardsComp extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnBoardClick = this.handleOnBoardClick.bind(this);
        this.handleOnMemberClick = this.handleOnMemberClick.bind(this);
    }

    componentWillMount() {
        // TODO fetch boards
    }

    handleOnBoardClick(boardId) {
        this.props.goToBoard(boardId);
    }

    handleOnMemberClick(event, memberId) {
        event.stopPropagation();
        this.props.goToMember(memberId);
    }

    render() {
        const { boards } = this.props;
        return (
            <BoardsView
                boards={boards}
                onBoardClick={this.handleOnBoardClick}
                onMemberClick={this.handleOnMemberClick}
            />
        );
    }
}
BoardsComp.propTypes = {
    boards: PropTypes.arrayOf(PropTypes.object).isRequired,
    goToBoard: PropTypes.func.isRequired,
    goToMember: PropTypes.func.isRequired,
};

// Put info from the store state in props
const mapStateToProps = ({ boardsReducer }) => ({
    boards: boardsReducer.userBoards,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        goToBoard: boardId => push(`/boards/${boardId}`),
        goToMember: memberId => push(`/members/${memberId}`),
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardsComp);
