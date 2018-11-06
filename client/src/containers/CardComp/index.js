import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { editCardDescription, deleteLabel } from '../../actions/cards';

// ===== Models
import Card from '../../models/Card';

// ===== View
import CardView from '../../components/views/CardView';
import CardDetailView from '../../components/views/CardDetailView';

class CardComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayCardDetail: false,
            isEditingDescription: false,
            isEditingLabels: false,
        };

        this.handleCardClick = this.handleCardClick.bind(this);
        this.handleCloseCardDetail = this.handleCloseCardDetail.bind(this);

        this.changeIsEditingDescription = this.changeIsEditingDescription.bind(this);
        this.handleEditDescription = this.handleEditDescription.bind(this);

        this.changeIsEditingLabels = this.changeIsEditingLabels.bind(this);
        this.handleDeleteLabel = this.handleDeleteLabel.bind(this);
    }

    handleCardClick(event) {
        event.preventDefault();
        this.setState({ displayCardDetail: true });
    }

    handleCloseCardDetail(event) {
        event.stopPropagation();
        const { className } = event.target;
        if ((className.includes('cardDetailOverlay') && event.type === 'mousedown')
            || (className.includes('closeCardDetailIcon') && event.type === 'click')
        ) {
            this.setState({ displayCardDetail: false });
        }
    }

    /* ===== DESCRIPTION ===== */
    changeIsEditingDescription(value) {
        this.setState({ isEditingDescription: value });
    }

    handleEditDescription(event) {
        event.preventDefault();
        const description = event.target.description.value;
        this.props.editCardDescription(this.props.card._id, description);
        this.setState({ isEditingDescription: false });
    }

    /* ===== LABELS ===== */
    changeIsEditingLabels(value) {
        this.setState({ isEditingLabels: value });
    }

    handleDeleteLabel(label) {
        this.props.deleteLabel(this.props.card._id, label._id);
    }

    render() {
        const { boardLabels, card } = this.props;
        return (
            <div>
                <CardView
                    card={card}
                    onCardClick={this.handleCardClick}
                />
                {(this.state.displayCardDetail)
                    ? (
                        <CardDetailView
                            boardLabels={boardLabels}
                            card={card}
                            closeCardDetail={this.handleCloseCardDetail}

                            changeIsEditingDescription={this.changeIsEditingDescription}
                            editDescription={this.handleEditDescription}
                            isEditingDescription={this.state.isEditingDescription}

                            changeIsEditingLabels={this.changeIsEditingLabels}
                            deleteLabel={this.handleDeleteLabel}
                            isEditingLabels={this.state.isEditingLabels}
                        />
                    )
                    : ''
                }
            </div>
        );
    }
}
CardComp.propTypes = {
    boardLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
    card: PropTypes.instanceOf(Card).isRequired,
    deleteLabel: PropTypes.func.isRequired,
    editCardDescription: PropTypes.func.isRequired,
};

// Put info from the store state in props (None)
const mapStateToProps = cardsReducer => ({
    errorMessage: cardsReducer.errorMessage,
    successMessage: cardsReducer.successMessage,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        deleteLabel,
        editCardDescription
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardComp);
