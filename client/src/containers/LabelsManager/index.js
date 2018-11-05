import React from 'react';
import PropTypes from 'prop-types';

// ===== Component
import Label from '../../components/views/CardDetailView/Labels/Label';

// ===== Others
import './style.css';

// ==================================

class LabelsManager extends React.Component {
    constructor(props) {
        super(props);

        const labels = this.props.boardLabels.map((label) => {
            const found = this.props.activeLabels.some(activeLab => activeLab._id === label._id);
            if (found) return { ...label, isActive: true };
            return { ...label, isActive: false };
        });

        this.state = { labels };
    }

    render() {
        return (
            <div className="labelsManagerModal">
                <h4>Labels</h4>
                <ul>
                    {this.state.labels.map(label => (
                        <Label key={label._id} label={label} isActive={label.isActive} />
                    ))}
                </ul>

            </div>
        );
    }
}

LabelsManager.propTypes = {
    activeLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
    boardLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
    cardId: PropTypes.string.isRequired,
    changeIsEditingLabels: PropTypes.func.isRequired,
};

export default LabelsManager;
