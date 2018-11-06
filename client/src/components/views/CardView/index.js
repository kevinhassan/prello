import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Components
import LabelPill from '../CardDetailView/Labels/LabelPill';

// ===== Models
import Card from '../../../models/Card';

// ===== Others
import './style.css';

const CardView = props => (
    <a
        className="card"
        href={`/cards/${props.card._id}`}
        key={props.card._id}
        onClick={event => props.onCardClick(event)}
    >
        <div className="cardContent">
            {props.card.labels.length > 0
                ? (
                    <div className="labelsBar">
                        {props.card.labels.map(label => <LabelPill key={label._id} label={label} />)}
                    </div>
                ) : ''
            }
            <div>
                <b className="cardName">{props.card.name}</b>
            </div>
        </div>
    </a>
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
