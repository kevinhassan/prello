import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../../models/Card';

import './style.css';

class CardItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteCard = this.handleDeleteCard.bind(this);
        this.handleDeleteCardWithDelay = this.handleDeleteCardWithDelay.bind(this);
    }

    handleDeleteCard(id) {
        this.props.deleteCard(id);
    }

    handleDeleteCardWithDelay(id) {
        this.props.deleteCardWithDelay(id);
    }

    render() {
        const { card } = this.props;
        return (
            <div className="card" key={card.id}>
                <div className="cardContent">
                    <div>
                        <b>{card.name}</b>
                        - id
                        {card.id}
                        &nbsp;-&nbsp;
                        {card.description}
                        <div>
                            <button type="button" className="btn btn-sm btn-danger" onClick={() => this.handleDeleteCard(card.id)}>
                                <i className="fas fa-trash-alt" />
                            </button>
                            <button type="button" style={{ marginLeft: '5px' }} className="btn btn-sm btn-danger" onClick={() => this.handleDeleteCardWithDelay(card.id)}>
                                <i className="fas fa-trash-alt" />
                                {' '}
                                with delay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
CardItem.propTypes = {
    card: PropTypes.instanceOf(Card).isRequired,
    deleteCard: PropTypes.func.isRequired,
    deleteCardWithDelay: PropTypes.func.isRequired,
};

// Put info from the store state in props (None)
const mapStateToProps = () => ({});

// Put actions in props (None)
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardItem);
