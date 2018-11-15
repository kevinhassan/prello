import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { getProfile } from '../../../actions/user';

// ===== Components / Containers
import GithubLinkBoard from '../../../components/views/BoardView/GithubLinkBoard';

// ===== Others

class GithubLinkBoardComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReposListVisible: false,
            repos: [{
                name: 'repo1',
                private: true,
                url: 'http://facebook.fr',
            }, {
                name: 'Prello',
                private: false,
                url: 'http://amazon.fr',
            }, {
                name: 'Data Science',
                private: false,
                url: 'http://ebay.fr',
            }],
            boardGithubRepo: {
                name: 'Awesome Repo',
                private: false,
                url: 'http://google.fr',
            },
        };
        this.linkBoardToGithubRepo = this.linkBoardToGithubRepo.bind(this);
        this.displayReposList = this.displayReposList.bind(this);
    }

    componentWillMount() {
        this.props.getProfile();
    }

    displayReposList(value) {
        this.setState({ isReposListVisible: value });
    }

    linkBoardToGithubRepo(event) {
        event.preventDefault();
        const newRepo = JSON.parse(event.target.value);
        // TODO: dispatch action
        this.displayReposList(false);
    }

    render() {
        console.log(this.props);
        return (
            <GithubLinkBoard
                repos={this.state.repos}
                linkBoardToGithubRepo={this.linkBoardToGithubRepo}
                boardGithubRepo={this.state.boardGithubRepo}
                isReposListVisible={this.state.isReposListVisible}
                displayReposList={this.displayReposList}
                canEdit={this.props.admins.some(a => a._id.toString() === this.props.clientId.toString())}
            />
        );
    }
}

GithubLinkBoardComp.propTypes = {
    admins: PropTypes.arrayOf(PropTypes.object),
    boardId: PropTypes.string.isRequired,
    boardGithubRepo: PropTypes.object,
    clientId: PropTypes.string.isRequired,
    getProfile: PropTypes.func.isRequired,
    linkBoardToRepoGithub: PropTypes.func.isRequired,
    repos: PropTypes.arrayOf(PropTypes.object),
};
GithubLinkBoardComp.defaultProps = {
    admins: [],
    clientId: undefined,
    repos: [],
    boardGithubRepo: undefined,
};

// Put info from the store state in props
const mapStateToProps = ({ auth, currentBoard, users }) => {
    let ghRepos = [];
    if (users && users.profile && users.profile.repos) {
        ghRepos = users.profile.repos;
    }
    return {
        boardGithubRepo: currentBoard.board.githubRepo,
        clientId: auth.clientId,
        admins: currentBoard.board.admins,
        repos: ghRepos,
    };
};

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        getProfile,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GithubLinkBoardComp);
