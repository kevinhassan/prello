import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { addLabel, deleteLabel } from '../../actions/cards';
import { createLabel } from '../../actions/boards';

// ===== Components
import Label from '../../components/views/CardDetailView/Labels/Label';
import AddLabelForm from '../../components/views/CardDetailView/Labels/AddLabelForm';

// ===== Others
import './style.css';

// ==================================

class LabelsManager extends React.Component {
    constructor(props) {
        super(props);

        const labels = this.props.boardLabels.map((label) => {
            if (this.props.activeLabels) {
                const found = this.props.activeLabels.some(activeLab => activeLab._id === label._id);
                if (found) return { ...label, isActive: true };
                return { ...label, isActive: false };
            }
            return label;
        });
        labels.sort((a, b) => a.name > b.name);
        this.state = { labels };

        this.handleClickOnLabel = this.handleClickOnLabel.bind(this);
        this.handleAddLabel = this.handleAddLabel.bind(this);
    }

    // Update the labels if something changed
    componentDidUpdate(prevProps) {
        if (this.props.boardLabels !== prevProps.boardLabels || this.props.activeLabels !== prevProps.activeLabels) {
            this.onLabelsUpdate();
        }
    }

    onLabelsUpdate = () => {
        const labels = this.props.boardLabels.map((label) => {
            if (this.props.activeLabels) {
                const found = this.props.activeLabels.some(activeLab => activeLab._id === label._id);
                if (found) return { ...label, isActive: true };
                return { ...label, isActive: false };
            }
            return label;
        });
        labels.sort((a, b) => a.name > b.name);
        this.setState({ labels });
    }

    handleClickOnLabel(label) {
        if (label.isActive) {
            this.props.deleteLabel(this.props.cardId, label._id);
        } else {
            this.props.addLabel(this.props.cardId, label._id);
        }
    }

    handleAddLabel(event) {
        event.preventDefault();
        this.props.createLabel(event.target.labelName.value, event.target.labelColor.value, this.props.boardId);
    }

    render() {
        return (
            <div className="labelsManagerModal">
                <i
                    className="fas fa-times closeLabelManager-icon"
                    onClick={this.props.onClickClose}
                    onKeyDown={this.props.onClickClose}
                />

                <h4 style={{ color: '#004a75' }}>Labels</h4>
                <ul style={{ padding: 0 }}>
                    {this.state.labels.map(label => (
                        <Label
                            key={label._id}
                            label={label}
                            isActive={label.isActive}
                            onClick={this.handleClickOnLabel}
                        />
                    ))}
                </ul>
                <AddLabelForm
                    addLabel={this.handleAddLabel}
                />

            </div>
        );
    }
}

LabelsManager.propTypes = {
    activeLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
    addLabel: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
    createLabel: PropTypes.func.isRequired,
    deleteLabel: PropTypes.func.isRequired,
    boardLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
    cardId: PropTypes.string.isRequired,
    onClickClose: PropTypes.func.isRequired,
};

// Put info from the store state in props (None)
const mapStateToProps = ({ currentBoard }) => {
    if (currentBoard.board) {
        return {
            boardId: currentBoard.board._id,
        };
    }
    return {};
};

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        addLabel,
        deleteLabel,
        createLabel,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LabelsManager);
