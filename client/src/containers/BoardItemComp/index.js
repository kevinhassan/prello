import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';


// ===== Actions
import { updateIsArchived } from '../../actions/boards';

// ===== Components
import BoardItem from '../../components/BoardItem';

// ===== Others

class BoardItemComp extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnBoardClick = this.handleOnBoardClick.bind(this);
        this.handleOnTeamClick = this.handleOnTeamClick.bind(this);
        this.handleUpdateIsArchived = this.handleUpdateIsArchived.bind(this);
    }

    handleUpdateIsArchived = (event, boardId, isArchived) => {
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
        const { board, lightCSS, readOnlyBoard } = this.props;
        return (
            <BoardItem
                board={board}
                lightCSS={lightCSS}
                onBoardClick={this.handleOnBoardClick}
                onTeamClick={this.handleOnTeamClick}
                readOnlyBoard={readOnlyBoard}
                updateIsArchived={this.handleUpdateIsArchived}
            />
        );
    }
}
BoardItemComp.propTypes = {
    board: PropTypes.object.isRequired,
    goToTeam: PropTypes.func.isRequired,
    goToBoard: PropTypes.func.isRequired,
    lightCSS: PropTypes.bool,
    readOnlyBoard: PropTypes.bool.isRequired,
    updateIsArchived: PropTypes.func,
};
BoardItemComp.defaultProps = {
    lightCSS: false,
    updateIsArchived: undefined,
};

// Put info from the store state in props
const mapStateToProps = ({ auth }) => ({
    isLoggedIn: auth.isLoggedIn,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        updateIsArchived,
        goToBoard: boardId => push(`/boards/${boardId}`),
        goToTeam: teamId => push(`/teams/${teamId}`),
    }, dispatch,
);
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardItemComp);
