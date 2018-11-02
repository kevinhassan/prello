import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { createCard } from '../../actions/card';

// ===== Models

// ===== View
import ListView from '../../components/views/ListView';

class ListComp extends React.Component {
    constructor(props) {
        super(props);
        this.handleCreateCard = this.handleCreateCard.bind(this);
    }

    handleCreateCard() {
        this.props.createCard();
    }

    render() {
        const { list, isBeingDragged } = this.props;
        return (
            <ListView
                list={list}
                createCard={this.handleCreateCard}
                isBeingDragged={isBeingDragged}
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
