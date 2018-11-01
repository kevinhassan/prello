import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';

// ===== Markdown Components
import MdHeader from '../markdown/MdHeader';
import MdLink from '../markdown/MdLink';

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
                    <div className="col-sm-6">
                        <h2 className="cardDetail-h2">
                            <i className="fas fa-calendar-alt" />
                            {' '}
                            Due date
                        </h2>
                        <p className="cardDetailDate">{new Date(props.card.dueDate).toDateString()}</p>
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
                <h2 className="cardDetail-h2">
                    <i className="fas fa-align-left" />
                    {' '}
                    Description
                </h2>

                <div>
                    {props.isEditingDescription
                        ? (
                            <form onSubmit={props.editDescription} className="descriptionForm">
                                <div className="form-group descriptionFormGroup">
                                    <Textarea
                                        className="form-control descriptionTextArea"
                                        id="description"
                                        name="description"
                                        placeholder=""
                                        type="text"
                                        defaultValue={props.card.description}
                                    />
                                </div>
                                <button className="btn btn-success" type="submit">Save</button>
                                <button
                                    className="btn btn-secondary"
                                    type="reset"
                                    onClick={() => props.changeIsEditingDescription(false)}
                                >
                                    <i className="fas fa-times" />
                                </button>
                            </form>
                        )
                        : (
                            <div className="descriptionContent">
                                {props.card.description
                                    ? (
                                        <a
                                            className="btn clickableDescription"
                                            onClick={() => props.changeIsEditingDescription(true)}
                                            onKeyDown={() => props.changeIsEditingDescription(true)}
                                        >
                                            <ReactMarkdown
                                                source={props.card.description}
                                                className="text-left btnDescription"
                                                renderers={{
                                                    heading: mdProps => (
                                                        <MdHeader {...mdProps} />
                                                    ),
                                                    link: mdProps => (
                                                        <MdLink {...mdProps} />
                                                    ),
                                                }}
                                            />
                                        </a>
                                    )
                                    : (
                                        <a
                                            className="btn btn-link"
                                            onClick={() => props.changeIsEditingDescription(true)}
                                            onKeyDown={() => props.changeIsEditingDescription(true)}
                                        >
                                    Add a description
                                        </a>
                                    )
                                }
                            </div>
                        )
                    }
                </div>

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
