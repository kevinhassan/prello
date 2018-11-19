import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { addBoardTeam } from '../../../actions/boards';
import { getProfile } from '../../../actions/user';

// ===== Components / Containers
import BoardTeamsView from '../../../components/views/BoardView/BoardTeamsView';

// ===== Others

class BoardTeamsComp extends React.Component {
    constructor(props) {
        super(props);
        let canAddTeam = false;

        // Check if client is admin
        if (props.clientId) {
            canAddTeam = props.boardAdmins.some(a => a._id === props.clientId);
        }
        this.state = {
            canAddTeam,
        };

        this.handleAddBoardTeam = this.handleAddBoardTeam.bind(this);
    }

    componentWillMount() {
        this.props.getProfile();
    }

    handleAddBoardTeam(event) {
        this.props.addBoardTeam(this.props.boardId, event.target.value);
    }

    render() {
        return (
            <BoardTeamsView
                boardAdmins={this.props.boardAdmins}
                teams={this.props.teams}
                isFormVisible={this.state.isFormVisible}
                addBoardTeam={this.handleAddBoardTeam}
                canAddTeam={this.state.canAddTeam}
                currentBoardTeams={this.props.currentBoardTeams}
            />
        );
    }
}
BoardTeamsComp.propTypes = {
    boardId: PropTypes.string,
    clientId: PropTypes.string,
    currentBoardTeams: PropTypes.arrayOf(PropTypes.object),
    getProfile: PropTypes.func.isRequired,
    teams: PropTypes.arrayOf(PropTypes.object),
    addBoardTeam: PropTypes.func.isRequired,
    boardAdmins: PropTypes.arrayOf(PropTypes.object),
};
BoardTeamsComp.defaultProps = {
    boardId: undefined,
    clientId: undefined,
    boardAdmins: [],
    teams: [],
    currentBoardTeams: [],
};

// Put info from the store state in props
const mapStateToProps = ({ currentBoard, auth, users }) => {
    if (currentBoard.board && auth.clientId && users.profile) {
        return {
            clientId: auth.clientId,
            boardId: currentBoard.board._id,
            boardAdmins: currentBoard.board.admins,
            teams: users.profile.teams,
            currentBoardTeams: currentBoard.board.teams,
        };
    }
    return {
        clientId: auth.clientId,
    };
};

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        addBoardTeam,
        getProfile,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardTeamsComp);
