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
    }

    handleDeleteCard(id) {
        console.log('delete the card with id='.concat(id))
    }

    render() {
        const { card } = this.props;
        return (
            <div className="card" key={card.id}>
                <div className="cardContent">
                    <div>
                        <b>#{card.id} - {card.name}</b>
                        <p className="cardDescription">{card.description}</p>
                        <div>
                            <button type="button" className="btn btn-sm btn-danger" onClick={() => this.handleDeleteCard(card.id)}>
                                <i className="fas fa-trash-alt" />
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
};

// Put info from the store state in props (None)
const mapStateToProps = () => ({});

// Put actions in props (None)
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardItem);
