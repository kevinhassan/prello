import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { editCardDescription } from '../../actions/cards';

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
        this.handleEditLabels = this.handleEditLabels.bind(this);
    }

    handleCardClick() {
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

    handleEditLabels(event) {
        event.preventDefault();

        // TODO : dispatch action
        // const labels = event.target.labels.value;
        // this.props.editCardDescription(this.props.card._id, description);
        this.setState({ isEditingLabels: false });
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
                            editLabels={this.handleEditLabels}
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
        editCardDescription,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardComp);
