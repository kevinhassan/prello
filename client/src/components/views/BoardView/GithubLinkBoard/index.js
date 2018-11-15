import React from 'react';
import PropTypes from 'prop-types';

// ===== Others
import './style.css';

// ==================================

const GithubLinkBoard = props => (
    <span style={{ display: 'inline-block' }}>
        <select defaultValue="" className="custom-select" id="repoUrl" required>
            <option value="" disabled>
                Link to
                {' '}
                <i className="fab fa-github" />
            </option>
            <option value="public">
                                Public
            </option>
            <option value="team">
                                Team
            </option>
            <option value="private">
                                Private
            </option>
        </select>
    </span>
);

GithubLinkBoard.propTypes = {
    repos: PropTypes.arrayOf(PropTypes.object).isRequired,
    linkBoardToGithubRepo: PropTypes.func.isRequired,
};

export default GithubLinkBoard;
