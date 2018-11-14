import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { push, goBack } from 'connected-react-router';
import {
    fetchTeam, addMemberToTeam, changeVisibility, changeName, changeDescription,
} from '../../actions/teams';

// ===== Components / Containers
import TeamView from '../../components/views/TeamView';

// ===== Others

class TeamComp extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnBoardClick = this.handleOnBoardClick.bind(this);
        this.handleOnMemberClick = this.handleOnMemberClick.bind(this);
        this.handleOnTeamClick = this.handleOnTeamClick.bind(this);
        this.handleChangeVisibility = this.handleChangeVisibility.bind(this);
        this.addMember = this.addMember.bind(this);
        this.changeIsEditingName = this.changeIsEditingName.bind(this);
        this.handleEditName = this.handleEditName.bind(this);
        this.changeIsEditingDescription = this.changeIsEditingDescription.bind(this);
        this.handleEditDescription = this.handleEditDescription.bind(this);
        this.isMember = this.isMember.bind(this);
        this.isAdmin = this.isAdmin.bind(this);
        this.state = {
            isEditingName: false,
            isEditingDescription: false,
        };
    }

    componentWillMount() {
        this.props.fetchTeam(this.props.match.params.teamId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.teamId !== this.props.match.params.teamId) {
            this.props.fetchTeam(this.props.match.params.teamId);
        }
    }

    addMember(event) {
        event.preventDefault();
        const username = event.target.username.value;
        this.props.addMemberToTeam(this.props.team._id, username);
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

    handleChangeVisibility() {
        this.props.changeVisibility(this.props.team._id, this.props.team.isVisible);
    }

    /* ===== NAME ===== */
    changeIsEditingName(value) {
        this.setState({ isEditingName: value });
    }

    handleEditName(event) {
        event.preventDefault();
        const name = event.target.name.value;
        this.props.changeName(this.props.team._id, name);
        this.setState({ isEditingName: false });
    }

    /* ===== Description ===== */
    changeIsEditingDescription(value) {
        this.setState({ isEditingDescription: value });
    }

    handleEditDescription(event) {
        event.preventDefault();
        const description = event.target.description.value;
        this.props.changeDescription(this.props.team._id, description);
        this.setState({ isEditingDescription: false });
    }

    isMember() {
        const memberFound = this.props.team.members.find(member => member._id === this.props.clientId);
        return memberFound !== undefined;
    }

    isAdmin() {
        const adminFound = this.props.team.admins.find(admin => admin._id === this.props.clientId);
        return adminFound !== undefined;
    }

    render() {
        const { clientId, team } = this.props;
        if (team) {
            return (
                <TeamView
                    team={team}
                    clientId={clientId}
                    addMemberToTeam={this.addMember}
                    onBoardClick={this.handleOnBoardClick}
                    onMemberClick={this.handleOnMemberClick}
                    onTeamClick={this.handleOnTeamClick}
                    changeVisibility={this.handleChangeVisibility}

                    changeIsEditingName={this.changeIsEditingName}
                    editName={this.handleEditName}
                    isEditingName={this.state.isEditingName}

                    changeIsEditingDescription={this.changeIsEditingDescription}
                    editDescription={this.handleEditDescription}
                    isEditingDescription={this.state.isEditingDescription}

                    isAdmin={this.isAdmin}
                />
            );
        }

        if (team === null) {
            return (
                <div style={{ backgroundColor: 'rgba(0, 140, 220, 0.1)', height: '100%', padding: '100px' }}>
                    <h1 className="text-danger">Team private or not found</h1>
                    <p style={{ fontSize: '1.2rem' }}>{'You can\'t see this team because is private or maybe because it doesn\'t exist...'}</p>
                    <button className="btn btn-primary" type="button" onClick={this.props.goBack}>
                        <i className="fas fa-chevron-left" />
                        {' '}
                        Go back
                    </button>
                </div>
            );
        }

        return '';
    }
}
TeamComp.propTypes = {
    addMemberToTeam: PropTypes.func.isRequired,
    clientId: PropTypes.string.isRequired,
    team: PropTypes.object,
    fetchTeam: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    goToBoard: PropTypes.func.isRequired,
    goToMember: PropTypes.func.isRequired,
    goToTeam: PropTypes.func.isRequired,
    changeVisibility: PropTypes.func.isRequired,
    changeName: PropTypes.func.isRequired,
    changeDescription: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            teamId: PropTypes.string,
        }),
    }).isRequired,
};
TeamComp.defaultProps = {
    team: undefined,
};

// Put info from the store state in props
const mapStateToProps = ({ currentTeam, auth }) => ({
    clientId: auth.clientId,
    team: currentTeam.team,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        addMemberToTeam,
        fetchTeam,
        goBack,
        changeVisibility,
        changeName,
        changeDescription,
        goToBoard: boardId => push(`/boards/${boardId}`),
        goToMember: memberId => push(`/members/${memberId}`),
        goToTeam: teamId => push(`/teams/${teamId}`),
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TeamComp);
