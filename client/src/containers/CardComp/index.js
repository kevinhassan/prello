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

class CardComp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteCard = this.handleDeleteCard.bind(this);
        this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
    }

    handleDeleteCard() {
        this.props.deleteCard();
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
            <CardView
                card={card}
                deleteCard={this.handleDeleteCard}
            />
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
