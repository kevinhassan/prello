import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// ===== Others
import './style.css';

// ==================================

const GithubLinkBoard = props => (
    <span style={{ display: 'inline-block' }}>
        {props.boardGithubRepo.name && !props.isReposListVisible
            ? (
                <Fragment>
                    <a href={props.boardGithubRepo.url} style={{ color: '#222' }} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github" />
                        {' '}
                        {props.boardGithubRepo.name}
                    </a>
                    {' '}
                    {props.canEdit
                        ? (
                            <span>
                                <button
                                    className="btn btn-primary btn-sm"
                                    type="submit"
                                    onClick={() => props.displayReposList(true)}
                                >
                                    <i className="fas fa-pen fa-xs" />
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    type="submit"
                                    onClick={event => props.removeBoardGithub(event)}
                                >
                                    <i className="fas fa-trash-alt fa-xs" />
                                </button>
                            </span>
                        ) : (
                            ''
                        )
                    }
                </Fragment>
            ) : (
                <span style={{ display: 'flex' }}>
                    <select
                        onChange={event => props.linkBoardToGithubRepo(event)}
                        value={
                            props.boardGithubRepo.name
                                ? JSON.stringify(props.boardGithubRepo, Object.keys(props.boardGithubRepo).sort())
                                : 'no-repo'
                        }
                        className="custom-select custom-select-sm"
                        id="repoUrl"
                        required
                    >
                        <option
                            value="no-repo"
                            disabled
                        >
                            Link to Github
                        </option>
                        {props.repos.filter(repo => !repo.private).sort((a, b) => a.name > b.name).map(repo => (
                            <option
                                key={repo.url}
                                value={JSON.stringify(repo, Object.keys(repo).sort())}
                            >
                                {repo.name}
                            </option>
                        ))}
                    </select>
                    {props.boardGithubRepo.name
                        ? (
                            <button
                                className="btn btn-secondary btn-sm"
                                type="reset"
                                onClick={() => props.displayReposList(false)}
                            >
                                <i className="fas fa-times" />
                            </button>
                        ) : (
                            ''
                        )}
                </span>

            )}
    </span>
);

GithubLinkBoard.propTypes = {
    canEdit: PropTypes.bool.isRequired,
    boardGithubRepo: PropTypes.object,
    removeBoardGithub: PropTypes.func.isRequired,
    displayReposList: PropTypes.func.isRequired,
    isReposListVisible: PropTypes.bool.isRequired,
    linkBoardToGithubRepo: PropTypes.func.isRequired,
    repos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
GithubLinkBoard.defaultProps = {
    boardGithubRepo: undefined,
};

export default GithubLinkBoard;
