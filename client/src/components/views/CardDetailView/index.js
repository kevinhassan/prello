import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Card Detail Components
import Description from './Description';
import Labels from './Labels';
import CardName from './CardName';
import DueDate from './DueDate';

import './style.css';

const CardDetailView = props => (
    <div className="cardDetailOverlay" onMouseDown={props.closeCardDetail}>
        <div className="cardDetailContent container-fluid" key={props.card._id}>

            <div className="row">
                <div className="col-sm-12">
                    <i className="fas fa-times closeCardDetailIcon" onClick={props.closeCardDetail} onKeyDown={props.closeCardDetail} />

                    <CardName
                        name={props.card.name}
                        editName={props.editName}
                        isEditingName={props.isEditingName}
                        changeIsEditingName={props.changeIsEditingName}
                    />

                </div>
            </div>
            <div className="row">
                <p className="col-sm-12" style={{ margin: 0 }}>
                    in
                    {' '}
                    <span className="cardDetailInList">{props.card.list.name}</span>
                </p>
            </div>

            <div className="row" style={{ marginTop: '5px' }}>
                <div className="col-sm-12 cardDetailActions">
                    <button type="button" className="archiveBtn btn btn-secondary" onClick={props.archiveCard}>
                        <i className="fas fa-archive" />
                        {' '}
                        Archive
                    </button>
                    <button type="button" className="watchBtn btn btn-secondary">
                        <i className="fas fa-eye" />
                        {' '}
                        Watch
                    </button>
                    <hr />

                </div>
            </div>

            <div className="row">

                {/* ===== DUE DATE ===== */}
                <div className="col-sm-4">
                    <h2 className="cardDetail-h2">
                        <i className="fas fa-calendar-alt" />
                        {' '}
                            Due date
                    </h2>

                    {props.card.dueDate && !(props.isEditingDueDate)
                        ? (
                            <div
                                className="cardDetailDate clickableDueDate"
                            >
                                <button
                                    className="btn btnDueDate"
                                    type="button"
                                    onClick={() => props.changeIsEditingDueDate(true)}
                                >
                                    {new Date(props.card.dueDate).toLocaleDateString('en-GB',
                                        {
                                            day: 'numeric',
                                            month: 'numeric',
                                            year: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        })}
                                </button>
                            </div>
                        )
                        : (
                            <DueDate
                                cardId={props.card._id}
                                changeIsEditingDueDate={props.changeIsEditingDueDate}
                                isEditingDueDate={props.isEditingDueDate}
                                dueDate={props.card.dueDate}
                                editDate={props.editDate}
                            />
                        )}

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

            <hr />

            {/* ===== DESCRIPTION ===== */}
            <Description
                changeIsEditingDescription={props.changeIsEditingDescription}
                description={props.card.description}
                editDescription={props.editDescription}
                isEditingDescription={props.isEditingDescription}
            />
            {/* ==================== */}


        </div>
    </div>
);

CardDetailView.propTypes = {
    boardLabels: PropTypes.arrayOf(PropTypes.object).isRequired,
    card: PropTypes.object.isRequired,
    closeCardDetail: PropTypes.func.isRequired,

    editName: PropTypes.func.isRequired,
    isEditingName: PropTypes.bool,
    changeIsEditingName: PropTypes.func.isRequired,

    changeIsEditingDescription: PropTypes.func.isRequired,
    editDescription: PropTypes.func.isRequired,
    isEditingDescription: PropTypes.bool,

    changeIsEditingLabels: PropTypes.func.isRequired,
    deleteLabel: PropTypes.func.isRequired,
    isEditingLabels: PropTypes.bool,
    archiveCard: PropTypes.func.isRequired,
    isEditingDueDate: PropTypes.bool,
    changeIsEditingDueDate: PropTypes.func.isRequired,
    editDate: PropTypes.func.isRequired,
};

CardDetailView.defaultProps = {
    isEditingDescription: false,
    isEditingLabels: false,
    isEditingName: false,
    isEditingDueDate: false,
};

// Put info from the store state in props (None)
const mapStateToProps = () => ({});

// Put actions in props (None)
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardDetailView);
