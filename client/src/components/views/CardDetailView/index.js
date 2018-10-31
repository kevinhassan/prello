import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../../../models/Card';

import './style.css';

const CardDetailView = props => (
    <div className="cardDetailOverlay" onMouseDown={props.closeCardDetail}>
        <div className="cardDetailContent" key={props.card._id}>
            <div className="">
                <i className="fas fa-times closeCardDetailIcon" onClick={props.closeCardDetail} onKeyDown={props.closeCardDetail} />

                <h2 className="cardDetail-h2 cardDetailTitle">
                    #
                    {props.card._id}
                    {' '}
                    -
                    {' '}
                    {props.card.name}
                </h2>
                <p>
                    in
                    {' '}
                    <span className="CardDetailInList">{props.card.list.name}</span>
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

                <h2 className="cardDetail-h2">
                    <i className="fas fa-align-left" />
                    {' '}
                    Description
                </h2>
                <p className="cardDetailDescription">{props.card.description}</p>

                <form onSubmit={props.editDescription}>
                    <div className="form-group row">
                        <label htmlFor="description" className="col-form-label col-sm-3">New description</label>
                        <div className="col-sm-9">
                            <input
                                className="form-control"
                                id="description"
                                name="description"
                                placeholder=""
                                type="text"
                            />
                        </div>
                    </div>
                    <button className="btn btn-secondary" type="submit">EDIT Description</button>
                </form>

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
};

CardDetailView.defaultProps = {
    deleteCard: undefined,
};

// Put info from the store state in props (None)
const mapStateToProps = () => ({});

// Put actions in props (None)
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardDetailView);
