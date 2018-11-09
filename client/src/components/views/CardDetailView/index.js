import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Card Detail Components
import Description from './Description';
import Labels from './Labels';

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
                    <div className="col-sm-4">
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
                    {/* ==================== */}

                    {/* ===== LABELS ===== */}
                    <div className="col-sm-8">
                        <Labels
                            boardLabels={props.boardLabels}
                            cardId={props.card._id}
                            changeIsEditingLabels={props.changeIsEditingLabels}
                            isEditingLabels={props.isEditingLabels}
                            labels={props.card.labels}
                            deleteLabel={props.deleteLabel}
                        />
                    </div>
                    {/* ==================== */}

                </div>

                {/* ===== DESCRIPTION ===== */}
                <Description
                    changeIsEditingDescription={props.changeIsEditingDescription}
                    description={props.card.description}
                    editDescription={props.editDescription}
                    isEditingDescription={props.isEditingDescription}
                />
                {/* ==================== */}


                <button type="button" className="archiveBtn btn-primary" onClick={props.archiveCard}>
                    <i className="fas fa-archive"> Archive card</i>
                </button>

            </div>
        </div>
    </div>
);

CardDetailView.propTypes = {
    boardLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
    card: PropTypes.object.isRequired,
    closeCardDetail: PropTypes.func.isRequired,

    changeIsEditingDescription: PropTypes.func.isRequired,
    editDescription: PropTypes.func.isRequired,
    isEditingDescription: PropTypes.bool,

    changeIsEditingLabels: PropTypes.func.isRequired,
    deleteLabel: PropTypes.func.isRequired,
    isEditingLabels: PropTypes.bool,
    archiveCard: PropTypes.func.isRequired,
};

CardDetailView.defaultProps = {
    isEditingDescription: false,
    isEditingLabels: false,
};

// Put info from the store state in props (None)
const mapStateToProps = () => ({});

// Put actions in props (None)
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardDetailView);
