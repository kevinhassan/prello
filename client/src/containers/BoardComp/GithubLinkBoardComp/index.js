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
        this.linkBoardToGithubRepo = this.linkBoardToGithubRepo.bind(this);
    }

    componentWillMount() {
        // TODO : fetch repos and put them in the state
    }

    linkBoardToGithubRepo(event) {
        event.preventDefault();
        const repoUrl = event.target.repoUrl.value;
    }

    render() {
        if (this.props.repos) {
            if (this.props.repos.length > 0) {
                return (
                    <GithubLinkBoard
                        repos={this.props.repos}
                        linkBoardToGithubRepo={this.linkBoardToGithubRepo}
                    />
                );
            }
        }
        return '';
    }
}
GithubLinkBoardComp.propTypes = {
    boardId: PropTypes.string.isRequired,
    linkBoardToRepoGithub: PropTypes.func.isRequired,
    repos: PropTypes.arrayOf(PropTypes.object),
};
GithubLinkBoardComp.defaultProps = {
    repos: undefined,
};

// Put info from the store state in props
const mapStateToProps = () => {};

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GithubLinkBoardComp);
