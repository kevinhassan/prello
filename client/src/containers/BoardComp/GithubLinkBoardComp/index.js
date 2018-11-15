import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { getProfile } from '../../../actions/user';
import { removeBoardGithub, updateBoardGithub } from '../../../actions/boards';

// ===== Components / Containers
import GithubLinkBoard from '../../../components/views/BoardView/GithubLinkBoard';

// ===== Others

class GithubLinkBoardComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReposListVisible: false,
        };
        this.linkBoardToGithubRepo = this.linkBoardToGithubRepo.bind(this);
        this.displayReposList = this.displayReposList.bind(this);
        this.removeBoardGithub = this.removeBoardGithub.bind(this);
    }

    componentWillMount() {
        if (this.props.canEdit) this.props.getProfile();
    }

    displayReposList(value) {
        this.setState({ isReposListVisible: value });
    }

    linkBoardToGithubRepo(event) {
        event.preventDefault();
        const newRepo = JSON.parse(event.target.value);
        this.props.updateBoardGithub(this.props.boardId, newRepo, this.props.boardGithubRepo);
        this.displayReposList(false);
    }

    removeGithubRepo(event) {
        event.preventDefault();
        this.props.removeBoardGithub(this.props.boardId);
        this.displayReposList(true);
    }

    render() {
        return (
            <GithubLinkBoard
                repos={this.props.repos}
                linkBoardToGithubRepo={this.linkBoardToGithubRepo}
                removeGithubRepo={this.removeGithubRepo}
                boardGithubRepo={this.props.boardGithubRepo}
                isReposListVisible={this.state.isReposListVisible}
                displayReposList={this.displayReposList}
                canEdit={this.props.canEdit}
            />
        );
    }
}

GithubLinkBoardComp.propTypes = {
    boardId: PropTypes.string.isRequired,
    boardGithubRepo: PropTypes.object,
    canEdit: PropTypes.bool,
    getProfile: PropTypes.func.isRequired,
    removeBoardGithub: PropTypes.func.isRequired,
    repos: PropTypes.arrayOf(PropTypes.object),
    updateBoardGithub: PropTypes.func.isRequired,
};
GithubLinkBoardComp.defaultProps = {
    canEdit: false,
    repos: [],
    boardGithubRepo: undefined,
};

// Put info from the store state in props
const mapStateToProps = ({ auth, currentBoard, users }) => {
    let ghRepos = [];
    if (users && users.profile && users.profile.github) {
        ghRepos = users.profile.github.repos;
    }

    let canEdit = false;
    if (auth.clientId && currentBoard.board && currentBoard.board.admins) {
        canEdit = currentBoard.board.admins.some(a => a._id === auth.clientId);
    }

    let ghRepo = {};
    if (currentBoard.board && currentBoard.board.githubRepo) {
        ghRepo = currentBoard.board.githubRepo;
    }

    return {
        boardGithubRepo: ghRepo,
        clientId: auth.clientId,
        repos: ghRepos,
        canEdit,
    };
};

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        getProfile,
        removeBoardGithub,
        updateBoardGithub,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GithubLinkBoardComp);
