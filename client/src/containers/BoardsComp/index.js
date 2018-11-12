import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

// ===== Actions
import { fetchBoards, updateIsArchived, createBoard } from '../../actions/boards';

// ===== Components / Containers
import BoardsView from '../../components/views/BoardsView';

// ===== Others

class BoardsComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isCreateBoardFormVisible: false };
        this.displayCreateBoardForm = this.displayCreateBoardForm.bind(this);
        this.handleCreateBoard = this.handleCreateBoard.bind(this);
        this.handleOnBoardClick = this.handleOnBoardClick.bind(this);
        this.handleOnTeamClick = this.handleOnTeamClick.bind(this);
        this.handleUpdateIsArchived = this.handleUpdateIsArchived.bind(this);
    }

    componentWillMount() {
        this.props.fetchBoards();
    }

    displayCreateBoardForm(value) {
        this.setState({ isCreateBoardFormVisible: value });
    }

    handleCreateBoard(event) {
        event.preventDefault();
        this.props.createBoard(String.trim(event.target.name.value), event.target.visibility.value);
        this.setState({ isCreateBoardFormVisible: false });
    }

    handleUpdateIsArchived(event, boardId, isArchived) {
        event.stopPropagation();
        this.props.updateIsArchived(boardId, isArchived);
    }

    handleOnBoardClick(boardId) {
        this.props.goToBoard(boardId);
    }

    handleOnTeamClick(event, teamId) {
        event.stopPropagation();
        this.props.goToTeam(teamId);
    }

    render() {
        const { boards } = this.props;
        if (boards) {
            return (
                <BoardsView
                    boards={boards}
                    createBoard={this.handleCreateBoard}
                    displayCreateBoardForm={this.displayCreateBoardForm}
                    isCreateBoardFormVisible={this.state.isCreateBoardFormVisible}
                    onBoardClick={this.handleOnBoardClick}
                    onTeamClick={this.handleOnTeamClick}
                    updateIsArchived={this.handleUpdateIsArchived}
                />
            );
        }
        return '';
    }
}
BoardsComp.propTypes = {
    boards: PropTypes.arrayOf(PropTypes.object),
    createBoard: PropTypes.func.isRequired,
    fetchBoards: PropTypes.func.isRequired,
    goToBoard: PropTypes.func.isRequired,
    goToTeam: PropTypes.func.isRequired,
    updateIsArchived: PropTypes.func.isRequired,
};
BoardsComp.defaultProps = {
    boards: undefined,
};

// Put info from the store state in props
const mapStateToProps = ({ boards }) => ({
    boards: boards.userBoards,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        createBoard,
        fetchBoards,
        updateIsArchived,
        goToBoard: boardId => push(`/boards/${boardId}`),
        goToTeam: teamId => push(`/teams/${teamId}`),
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardsComp);
