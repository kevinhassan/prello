import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { createCard } from '../../actions/cards';
import { archiveList } from '../../actions/lists';

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
        this.handleArchiveList = this.handleArchiveList.bind(this);
    }

    handleAddCard(value) {
        this.setState({ isInputVisible: value });
    }

    handleCardAdded(event) {
        event.preventDefault();
        const name = event.target.cardName.value.trim();
        const newCard = new Card({
            name, list: { _id: this.props.listId },
        });
        this.props.createCard(newCard);
        this.setState({ isInputVisible: false });
    }

    /* ===== ARCHIVE ===== */
    handleArchiveList() {
        this.props.archiveList(this.props.list, true);
    }

    render() {
        const { boardLabels, list, isBeingDragged } = this.props;
        if (list) {
            return (
                <ListView
                    boardLabels={boardLabels}
                    isInputVisible={this.state.isInputVisible}
                    isBeingDragged={isBeingDragged}
                    displayAddCardForm={this.handleAddCard}
                    list={list}
                    onCardAdded={this.handleCardAdded}
                    archiveList={this.handleArchiveList}
                />
            );
        } return '';
    }
}
ListComp.propTypes = {
    boardLabels: PropTypes.arrayOf(PropTypes.object),
    createCard: PropTypes.func.isRequired,
    isBeingDragged: PropTypes.bool,
    listId: PropTypes.string.isRequired,
    list: PropTypes.object,
    archiveList: PropTypes.func.isRequired,
};
ListComp.defaultProps = {
    isBeingDragged: false,
    list: undefined,
    boardLabels: undefined,
};

// Put info from the store state in props
const mapStateToProps = ({ currentBoard }, props) => {
    if (currentBoard.board) {
        return {
            list: currentBoard.board.lists.find(l => l._id === props.listId),
            boardLabels: currentBoard.board.labels,
        };
    }
    return {};
};

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        createCard,
        archiveList,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListComp);
