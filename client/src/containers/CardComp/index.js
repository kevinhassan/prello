import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import {
    editCardDescription, editCardName, deleteLabel, archiveCard, editDate,
} from '../../actions/cards';

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
            isEditingName: false,
            isEditingDueDate: false,
        };

        this.handleCardClick = this.handleCardClick.bind(this);
        this.handleCloseCardDetail = this.handleCloseCardDetail.bind(this);

        this.changeIsEditingDescription = this.changeIsEditingDescription.bind(this);
        this.handleEditDescription = this.handleEditDescription.bind(this);

        this.changeIsEditingName = this.changeIsEditingName.bind(this);
        this.handleEditName = this.handleEditName.bind(this);

        this.changeIsEditingLabels = this.changeIsEditingLabels.bind(this);
        this.handleDeleteLabel = this.handleDeleteLabel.bind(this);

        this.handleArchiveCard = this.handleArchiveCard.bind(this);

        this.changeIsEditingDueDate = this.changeIsEditingDueDate.bind(this);
        this.handleEditDate = this.handleEditDate.bind(this);

        this.handleChangeDueDateStatus = this.handleChangeDueDateStatus.bind(this);
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

    /* ===== NAME ===== */
    changeIsEditingName(value) {
        this.setState({ isEditingName: value });
    }

    handleEditName(event) {
        event.preventDefault();
        const name = event.target.name.value;
        this.props.editCardName(this.props.card, name, this.props.card.name);
        this.setState({ isEditingName: false });
    }

    /* ===== DESCRIPTION ===== */
    changeIsEditingDescription(value) {
        this.setState({ isEditingDescription: value });
    }

    handleEditDescription(event) {
        event.preventDefault();
        const description = event.target.description.value;
        this.props.editCardDescription(this.props.card, description, this.props.card.description);
        this.setState({ isEditingDescription: false });
    }

    /* ===== LABELS ===== */
    changeIsEditingLabels(value) {
        this.setState({ isEditingLabels: value });
    }

    handleDeleteLabel(label) {
        this.props.deleteLabel(this.props.card._id, label._id);
    }

    /* ===== ARCHIVE ===== */
    handleArchiveCard() {
        this.props.archiveCard(this.props.card, true);
    }

    /* ===== DUE DATE ===== */
    changeIsEditingDueDate(value) {
        this.setState({ isEditingDueDate: value });
    }

    handleEditDate(event) {
        event.preventDefault();
        const date = event.target.duedate.value.trim();
        const time = event.target.time.value;
        const dueDate = { date: null };
        if (date) {
            if (time) {
                dueDate.date = new Date(`${date} ${time}`);
            } else {
                dueDate.date = new Date(`${date}`);
                dueDate.date.setHours(12, 0);
            }
        } else if (time) {
            const hour = time.split(':')[0];
            const minute = time.split(':')[1];
            dueDate.date = new Date();
            dueDate.date.setHours(hour, minute);
        } else {
        // if the due date is different then update it
            if (dueDate.date !== this.props.card.dueDate.date) this.props.editDate(this.props.card, dueDate, this.props.card.dueDate);
            this.changeIsEditingDueDate(false);
        }
    }

    handleChangeDueDateStatus(event) {
        const { card } = this.props;
        const newCard = {
            ...card,
            dueDate: {
                ...card.dueDate,
                isDone: event.target.checked,
            },
        };
        this.props.editDate(this.props.card, newCard.dueDate, this.props.card.dueDate);
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

                            changeIsEditingName={this.changeIsEditingName}
                            editName={this.handleEditName}
                            isEditingName={this.state.isEditingName}

                            changeIsEditingLabels={this.changeIsEditingLabels}
                            deleteLabel={this.handleDeleteLabel}
                            isEditingLabels={this.state.isEditingLabels}

                            archiveCard={this.handleArchiveCard}

                            isEditingDueDate={this.state.isEditingDueDate}
                            changeIsEditingDueDate={this.changeIsEditingDueDate}
                            editDate={this.handleEditDate}

                            changeDueDateStatus={this.handleChangeDueDateStatus}
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
    card: PropTypes.object.isRequired,
    deleteLabel: PropTypes.func.isRequired,
    editCardDescription: PropTypes.func.isRequired,
    editCardName: PropTypes.func.isRequired,
    archiveCard: PropTypes.func.isRequired,
    editDate: PropTypes.func.isRequired,
};

// Put info from the store state in props (None)
const mapStateToProps = () => ({
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        deleteLabel,
        editCardDescription,
        editCardName,
        archiveCard,
        editDate,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardComp);
