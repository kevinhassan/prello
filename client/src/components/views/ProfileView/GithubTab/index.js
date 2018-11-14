import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

// =====

const GithubTab = props => (
    <div className="bottomProfilePanel">
        {props.github
            ? (
                <div>
                    {props.github.repos.length > 0
                        ? (
                            <div>
                                <h4 className="news">
                                    Your
                                    {' '}
                                    <i className="fab fa-github" />
                                    {' '}
                                    repositories
                                </h4>
                                <ul className="reposList">
                                    {props.github.repos.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase()).map(repo => (
                                        <li key={repo.url} className="repo">
                                            {repo.private ? <i className="fas fa-eye-slash visibleIcon" /> : <i className="fas fa-eye visibleIcon" />}
                                            <a href={repo.url} rel="noreferrer noopener" target="_blank">
                                                {repo.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-center">
                                    <button type="button" className="btn btn-success" onClick={() => window.open('https://github.com/new')}>
                                        <i className="fas fa-plus" />
                                        {' '}
                                        Create repository
                                    </button>
                                </p>
                            </div>

                        ) : (
                            <div>
                                <p className="text-center" style={{ fontSize: '1.6rem' }}>
                                You do not have any repositories yet.
                                </p>
                                <p className="text-center">
                                    <button type="button" className="btn btn-success" onClick={() => window.open('https://github.com/new')}>
                                        <i className="fas fa-plus" />
                                        {' '}
                                        Create repository
                                    </button>
                                </p>
                            </div>
                        )}
                </div>

            ) : (
                <div>
                    <p className="text-center" style={{ fontSize: '1.6rem' }}>
                        {'You didn\'t sign in to Prello with your Github account yet...'}
                        {' '}
                        <i className="fas fa-frown-open" />
                    </p>
                    <p className="text-center" style={{ fontSize: '1.2rem' }}>
                        Click the button below to sign in with Github and enjoy our OAuth 2.0 features !
                    </p>
                    <p className="text-center">
                        <a type="button" className="btn loginWithGHLink btn-lg" href={`${process.env.REACT_APP_API_HOST}auth/github`}>
                            Sign with Github
                            {' '}
                            <i className="fab fa-github" />
                        </a>
                    </p>

                </div>
            )}

    </div>

);

GithubTab.propTypes = {
    github: PropTypes.object.isRequired,
};
GithubTab.defaultProps = {
};

export default GithubTab;
