import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { push, goBack } from 'connected-react-router';
import { fetchTeam, addMemberToTeam } from '../../actions/teams';

// ===== Components / Containers
import TeamView from '../../components/views/TeamView';

// ===== Others

class TeamComp extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnBoardClick = this.handleOnBoardClick.bind(this);
        this.handleOnMemberClick = this.handleOnMemberClick.bind(this);
        this.handleOnTeamClick = this.handleOnTeamClick.bind(this);
        this.addMember = this.addMember.bind(this);
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
        goToBoard: boardId => push(`/boards/${boardId}`),
        goToMember: memberId => push(`/members/${memberId}`),
        goToTeam: teamId => push(`/teams/${teamId}`),
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TeamComp);
