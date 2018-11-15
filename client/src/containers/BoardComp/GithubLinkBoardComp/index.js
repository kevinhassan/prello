import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions

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
        // TODO : fetch repos
    }

    displayReposList(value) {
        this.setState({ isReposListVisible: value });
    }

    linkBoardToGithubRepo(event) {
        event.preventDefault();
        const newRepo = JSON.parse(event.target.value);
    }

    render() {
        return (
            <GithubLinkBoard
                repos={this.state.repos}
                linkBoardToGithubRepo={this.linkBoardToGithubRepo}
                boardGithubRepo={this.state.boardGithubRepo}
                isReposListVisible={this.state.isReposListVisible}
                displayReposList={this.displayReposList}
            />
        );
    }
}
GithubLinkBoardComp.propTypes = {
    boardId: PropTypes.string.isRequired,
    boardGithubRepo: PropTypes.object,
    linkBoardToRepoGithub: PropTypes.func.isRequired,
    repos: PropTypes.arrayOf(PropTypes.object),
};
GithubLinkBoardComp.defaultProps = {
    repos: undefined,
    boardGithubRepo: undefined,
};

// Put info from the store state in props
const mapStateToProps = ({ currentBoard }) => ({
    boardGithubRepo: currentBoard.githubRepo,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GithubLinkBoardComp);
