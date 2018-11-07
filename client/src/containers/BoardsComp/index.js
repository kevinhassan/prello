import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

// ===== Actions
import { fetchBoards } from '../../actions/boards';

// ===== Components / Containers
import BoardsView from '../../components/views/BoardsView';

// ===== Others

class BoardsComp extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnBoardClick = this.handleOnBoardClick.bind(this);
        this.handleOnMemberClick = this.handleOnMemberClick.bind(this);
        this.handleOnTeamClick = this.handleOnTeamClick.bind(this);
    }

    componentWillMount() {
        this.props.fetchBoards();
    }

    handleOnBoardClick(boardId) {
        this.props.goToBoard(boardId);
    }

    handleOnMemberClick(event, memberId) {
        event.stopPropagation();
        this.props.goToMember(memberId);
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
                    onBoardClick={this.handleOnBoardClick}
                    onMemberClick={this.handleOnMemberClick}
                    onTeamClick={this.handleOnTeamClick}
                />
            );
        }
        return '';
    }
}
BoardsComp.propTypes = {
    boards: PropTypes.arrayOf(PropTypes.object),
    fetchBoards: PropTypes.func.isRequired,
    goToBoard: PropTypes.func.isRequired,
    goToMember: PropTypes.func.isRequired,
    goToTeam: PropTypes.func.isRequired,
};
BoardsComp.defaultProps = {
    boards: undefined,
};

// Put info from the store state in props
const mapStateToProps = ({ boardsReducer }) => ({
    boards: boardsReducer.userBoards,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        fetchBoards,
        goToBoard: boardId => push(`/boards/${boardId}`),
        goToMember: memberId => push(`/members/${memberId}`),
        goToTeam: teamId => push(`/teams/${teamId}`),
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardsComp);
