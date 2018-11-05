import React from 'react';
import PropTypes from 'prop-types';


// ===== Components
import Label from './Label';
import LabelsManager from '../../../../containers/LabelsManager';

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
        {props.labels.length > 0
            ? (
                <ul className="labels-ul">
                    {props.labels.map(label => (
                        <Label
                            key={label._id}
                            label={label}
                        />
                    ))}
                    <li className="addLabel-li">
                        <button
                            className="btn addLabel-btn"
                            type="button"
                            onClick={() => props.changeIsEditingLabels(true)}
                        >
                            <i className="fas fa-plus" />
                        </button>
                    </li>
                </ul>

            ) : (
                <button
                    className="btn btn-link btn-addElement"
                    type="button"
                    onClick={() => props.changeIsEditingLabels(true)}
                >
                    Add label...
                </button>
            )
        }

        {props.isEditingLabels
            ? (
                <LabelsManager
                    activeLabels={props.labels}
                    boardLabels={props.boardLabels}
                    cardId={props.cardId}
                    onClickClose={() => props.changeIsEditingLabels(false)}
                />
            ) : (
                ''
            )
        }

    </div>
);

Labels.propTypes = {
    boardLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
    cardId: PropTypes.string.isRequired,
    labels: PropTypes.arrayOf(PropTypes.object).isRequired,
    isEditingLabels: PropTypes.bool.isRequired,
    changeIsEditingLabels: PropTypes.func.isRequired,
};

export default Labels;
