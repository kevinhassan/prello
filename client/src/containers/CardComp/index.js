import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { deleteCard } from '../../actions/card';

// ===== Models
import Card from '../../models/Card';

// ===== View
import CardView from '../../components/views/CardView';
import CardDetailView from '../../components/views/CardDetailView';

class CardComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { displayCardDetail: false };
        this.handleDeleteCard = this.handleDeleteCard.bind(this);
        this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
        this.handleCardClick = this.handleCardClick.bind(this);
        this.handleCloseCardDetail = this.handleCloseCardDetail.bind(this);
    }

    handleDeleteCard() {
        this.props.deleteCard();
    }

    handleCardClick() {
        this.setState({ displayCardDetail: true });
    }

    handleCloseCardDetail(event) {
        event.stopPropagation();
        if (event.target.className === ('cardDetailOverlay' || 'closeCardDetailIcon') && event.type === 'click') {
            this.setState({ displayCardDetail: false });
        }
    }

    handleOnDragEnd(result) {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId
            && destination.index === source.index) return;

        console.log('TODO : change cards indexes via Redux');

        // Todo : change cards indexes via Redux
    }

    render() {
        const { card } = this.props;
        return (
            <div>
                <CardView
                    card={card}
                    deleteCard={this.handleDeleteCard}
                    onCardClick={this.handleCardClick}
                />
                {(this.state.displayCardDetail)
                    ? <CardDetailView closeCardDetail={this.handleCloseCardDetail} card={card} />
                    : ''
                }
            </div>
        );
    }
}
CardComp.propTypes = {
    card: PropTypes.instanceOf(Card).isRequired,
    deleteCard: PropTypes.func.isRequired,
};

// Put info from the store state in props (None)
const mapStateToProps = () => ({});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        deleteCard,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardComp);
