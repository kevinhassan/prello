import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// ===== Others
import './style.css';

// ==================================

const GithubLinkBoard = props => (
    <span style={{ display: 'inline-block' }}>
        {props.boardGithubRepo && !props.isReposListVisible
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
                            <button
                                className="btn btn-primary btn-sm"
                                type="submit"
                                onClick={() => props.displayReposList(true)}
                                style={{ transform: 'scale(0.9)' }}
                            >
                                <i className="fas fa-pen fa-xs" />
                            </button>
                        ) : (
                            ''
                        )
                    }
                </Fragment>
            ) : (
                <span style={{ display: 'flex' }}>
                    <select
                        onChange={event => props.linkBoardToGithubRepo(event)}
                        defaultValue=""
                        className="custom-select custom-select-sm"
                        id="repoUrl"
                        required
                    >
                        <option value="" disabled>
                        Link to Github
                        </option>
                        {props.repos.filter(repo => !repo.private).map(repo => (
                            <option key={repo.url} value={JSON.stringify(repo)}>{repo.name}</option>
                        ))}
                    </select>
                    <button
                        className="btn btn-secondary btn-sm"
                        type="submit"
                        onClick={() => props.displayReposList(false)}
                    >
                        <i className="fas fa-times" />
                    </button>
                </span>

            )}
    </span>
);

GithubLinkBoard.propTypes = {
    canEdit: PropTypes.bool.isRequired,
    boardGithubRepo: PropTypes.object,
    displayReposList: PropTypes.func.isRequired,
    isReposListVisible: PropTypes.bool.isRequired,
    linkBoardToGithubRepo: PropTypes.func.isRequired,
    repos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GithubLinkBoard;
