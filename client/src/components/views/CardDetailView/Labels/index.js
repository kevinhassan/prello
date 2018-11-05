import React from 'react';
import PropTypes from 'prop-types';

// ===== Others
import './style.css';

// ==================================

const Labels = props => (
    <div>
        <h2 className="cardDetail-h2">
            <i className="fas fa-tags" />
            {' '}
        Labels
        </h2>
        <ul>
            {props.labels.map(label => (
                <li>
                    {label.color}
                    {' '}
                    -
                    {' '}
                    {label.name}
                </li>
            ))}
        </ul>
    </div>
);

Labels.propTypes = {
    labels: PropTypes.arrayOf(Object).isRequired,
};

export default Labels;
