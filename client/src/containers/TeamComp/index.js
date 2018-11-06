import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { fetchTeam } from '../../actions/teams';

// ===== Components / Containers
import TeamView from '../../components/views/TeamView';
import { push } from "connected-react-router";
import BoardsView from '../../components/views/BoardsView';

// ===== Others

class TeamComp extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnBoardClick = this.handleOnBoardClick.bind(this);
    this.handleOnMemberClick = this.handleOnMemberClick.bind(this);
  }
  componentWillMount() {
    this.props.fetchTeam(this.props.match.params.teamId);
  }

  handleOnBoardClick(boardId) {
    this.props.goToBoard(boardId);
  }

  handleOnMemberClick(event, memberId) {
    event.stopPropagation();
    this.props.goToMember(memberId);
  }

  render() {
    const { team } = this.props;
    if (team) {
      return (
        <TeamView
          team={team}
          onBoardClick={this.handleOnBoardClick}
          onMemberClick={this.handleOnMemberClick}
        />
      );
    }

    return '';
  }
}
TeamComp.propTypes = {
  team: PropTypes.object,
  fetchTeam: PropTypes.func.isRequired,
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
const mapStateToProps = ({ currentTeam }) => ({
  team: currentTeam.team,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchTeam,
    goToBoard: boardId => push(`/boards/${boardId}`),
    goToMember: memberId => push(`/members/${memberId}`),
  }, dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamComp);
