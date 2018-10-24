import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { createCard } from '../../actions/card';

// ===== Models
import List from '../../models/List';

// ===== View
import ListView from '../../components/views/ListView';

class ListComp extends React.Component {
    constructor(props) {
        super(props);
        this.handleCreateCard = this.handleCreateCard.bind(this);
        this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
    }

    handleCreateCard() {
        this.props.createCard();
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
        const { list } = this.props;
        return (
            <ListView
                list={list}
                createCard={this.handleCreateCard}
                onDragEnd={this.handleOnDragEnd}
            />
        );
    }
}
ListComp.propTypes = {
    createCard: PropTypes.func.isRequired,
    list: PropTypes.instanceOf(List).isRequired,
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
