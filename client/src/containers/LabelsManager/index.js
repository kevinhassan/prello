import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { addLabel } from '../../actions/cards';

// ===== Components
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
        labels.sort((a, b) => a.name > b.name);
        this.state = { labels };

        this.handleClickOnLabel = this.handleClickOnLabel.bind(this);
    }

    // Update the labels if something changed
    componentDidUpdate(prevProps) {
        if (this.props.boardLabels !== prevProps.boardLabels || this.props.activeLabels !== prevProps.activeLabels) {
            this.onLabelsUpdate();
        }
    }

    onLabelsUpdate = () => {
        const labels = this.props.boardLabels.map((label) => {
            const found = this.props.activeLabels.some(activeLab => activeLab._id === label._id);
            if (found) return { ...label, isActive: true };
            return { ...label, isActive: false };
        });
        labels.sort((a, b) => a.name > b.name);
        this.setState({ labels });
    }

    handleClickOnLabel(label) {
        if (label.isActive) {
            // TODO : remove it from card
        } else {
            this.props.addLabel(this.props.cardId, label._id);
        }
    }

    render() {
        return (
            <div className="labelsManagerModal">
                <i
                    className="fas fa-times closeLabelManager-icon"
                    onClick={this.props.onClickClose}
                    onKeyDown={this.props.onClickClose}
                />

                <h4>Labels</h4>
                <ul>
                    {this.state.labels.map(label => (
                        <Label
                            key={label._id}
                            label={label}
                            isActive={label.isActive}
                            onClick={this.handleClickOnLabel}
                        />
                    ))}
                </ul>

            </div>
        );
    }
}

LabelsManager.propTypes = {
    activeLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
    addLabel: PropTypes.func.isRequired,
    boardLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
    cardId: PropTypes.string.isRequired,
    onClickClose: PropTypes.func.isRequired,
};

// Put info from the store state in props (None)
const mapStateToProps = () => ({});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        addLabel,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LabelsManager);
