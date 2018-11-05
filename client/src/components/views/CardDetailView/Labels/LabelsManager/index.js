import React from 'react';
import PropTypes from 'prop-types';

// ===== Others
import './style.css';

// ==================================

const LabelsManager = props => (
    <div className="labelsManagerModal">
        <p>
            Active labels:
            <ul>
                {props.activeLabels.map(activeLabel => <li>{activeLabel.color}</li>)}
            </ul>
        </p>

        <p>
            Possible labels:
            <ul>
                {props.boardLabels.map(label => <li>{label.color}</li>)}
            </ul>
        </p>
    </div>
);

LabelsManager.propTypes = {
    activeLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
    boardLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
    changeIsEditingLabels: PropTypes.func.isRequired,
};

export default LabelsManager;
