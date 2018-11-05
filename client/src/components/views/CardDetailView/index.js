import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Elements Components
import Description from './Description';

// ===== Models
import Card from '../../../models/Card';

import './style.css';

const CardDetailView = props => (
    <div className="cardDetailOverlay" onMouseDown={props.closeCardDetail}>
        <div className="cardDetailContent" key={props.card._id}>
            <div className="">
                <i className="fas fa-times closeCardDetailIcon" onClick={props.closeCardDetail} onKeyDown={props.closeCardDetail} />

                <h2 className="cardDetail-h2 cardDetailTitle">
                    {props.card.name}
                </h2>
                <p>
                    in
                    {' '}
                    <span className="cardDetailInList">{props.card.list.name}</span>
                </p>

                <div className="row">

                    {/* ===== DUE DATE ===== */}
                    <div className="col-sm-6">
                        <h2 className="cardDetail-h2">
                            <i className="fas fa-calendar-alt" />
                            {' '}
                            Due date
                        </h2>

                        <div className="cardElementContent">
                            {props.card.dueDate
                                ? (
                                    <p className="cardDetailDate">{new Date(props.card.dueDate).toDateString()}</p>
                                )
                                : (
                                    <button
                                        className="btn btn-link btn-addElement"
                                        type="button"
                                    >
                                Add a due date...
                                    </button>
                                ) }
                        </div>

                    </div>


                    <div className="col-sm-6">
                        <h2 className="cardDetail-h2">
                            <i className="fas fa-tags" />
                            {' '}
                            Labels
                        </h2>
                    </div>
                </div>

                {/* ===== DESCRIPTION ===== */}
                <Description
                    changeIsEditingDescription={props.changeIsEditingDescription}
                    description={props.card.description}
                    editDescription={props.editDescription}
                    isEditingDescription={props.isEditingDescription}
                />
                {/* ==================== */}

                <div>
                    {(props.deleteCard)
                        ? (
                            <button type="button" className="btn btn-sm btn-danger" onClick={() => props.deleteCard(props.card._id)}>
                                <i className="fas fa-trash-alt" />
                            </button>
                        )
                        : ''
                    }
                </div>
            </div>
        </div>
    </div>
);

CardDetailView.propTypes = {
    card: PropTypes.instanceOf(Card).isRequired,
    closeCardDetail: PropTypes.func.isRequired,
    deleteCard: PropTypes.func,

    editDescription: PropTypes.func.isRequired,
    changeIsEditingDescription: PropTypes.func.isRequired,
    isEditingDescription: PropTypes.bool,
};

CardDetailView.defaultProps = {
    deleteCard: undefined,
    isEditingDescription: false,
};

// Put info from the store state in props (None)
const mapStateToProps = () => ({});

// Put actions in props (None)
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardDetailView);
