import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../../../models/Card';

import './style.css';

const CardView = props => (
    <div className="card" key={props.card._id}>
        <div className="cardContent">
            <button className="btn-noCss" type="button" onClick={props.onCardClick} onKeyDown={props.onCardClick}>
                <div>
                    <b className="cardName">{props.card.name}</b>
                </div>
            </button>
        </div>
    </div>
);

CardView.propTypes = {
    card: PropTypes.instanceOf(Card).isRequired,
    onCardClick: PropTypes.func.isRequired,
};

CardView.defaultProps = {
};

// Put info from the store state in props (None)
const mapStateToProps = () => ({});

// Put actions in props (None)
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardView);
