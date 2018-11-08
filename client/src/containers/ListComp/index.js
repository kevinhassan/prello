import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { createCard } from '../../actions/cards';

// ===== Models
import Card from '../../models/Card';

// ===== View
import ListView from '../../components/views/ListView';

class ListComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isInputVisible: false,
        };
        this.handleAddCard = this.handleAddCard.bind(this);
        this.handleCardAdded = this.handleCardAdded.bind(this);
    }

    handleAddCard(value) {
        this.setState({ isInputVisible: value });
    }

    handleCardAdded(event) {
        event.preventDefault();
        const name = event.target.cardName.value;
        const newCard = new Card({
            name, list: this.props.listId,
        });
        this.props.createCard(newCard);
        this.setState({ isInputVisible: false });
    }

    render() {
        const { boardLabels, list, isBeingDragged } = this.props;
        return (
            <ListView
                boardLabels={boardLabels}
                isInputVisible={this.state.isInputVisible}
                isBeingDragged={isBeingDragged}
                displayAddCardForm={this.handleAddCard}
                list={list}
                onCardAdded={this.handleCardAdded}
            />
        );
    }
}
ListComp.propTypes = {
    boardLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
    createCard: PropTypes.func.isRequired,
    isBeingDragged: PropTypes.bool,
    listId: PropTypes.string.isRequired,
    list: PropTypes.object.isRequired,
};
ListComp.defaultProps = {
    isBeingDragged: false,
};

// Put info from the store state in props
const mapStateToProps = ({ currentBoard }, props) => ({
    list: currentBoard.board.lists.find(l => l._id === props.listId),
    boardLabels: currentBoard.board.labels,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        createCard,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListComp);
