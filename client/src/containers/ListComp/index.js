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
        this.handleAddCard = this.handleAddCard.bind(this);
        this.handleCardAdded = this.handleCardAdded.bind(this);
        this.state = {
            isInputVisible: false,
        };
    }

    handleAddCard(value) {
        this.setState({ isInputVisible: value });
    }

    handleCardAdded(event) {
        event.preventDefault();
        const name = event.target.cardName.value;
        const newCard = new Card({
            name, list: this.props.list,
        });
        this.props.createCard(newCard);
        this.setState({ isInputVisible: false });
    }

    render() {
        const { list, isBeingDragged } = this.props;
        return (
            <ListView
                list={list}
                isInputVisible={this.state.isInputVisible}
                isBeingDragged={isBeingDragged}
                displayAddCardForm={this.handleAddCard}
                onCardAdded={this.handleCardAdded}
            />
        );
    }
}
ListComp.propTypes = {
    createCard: PropTypes.func.isRequired,
    isBeingDragged: PropTypes.bool,
    list: PropTypes.object.isRequired,
};
ListComp.defaultProps = {
    isBeingDragged: false,
};

// Put info from the store state in props (None)
const mapStateToProps = () => ({});

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
