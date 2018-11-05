import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
// ==================================

const AddCardForm = props => (

    <span className="addListForm">
        {props.isInputVisible ? (

            <div className="appened-form text-left">
                <form onSubmit={props.onCardAdded}>
                    <input
                        className="form-control"
                        id="cardName"
                        name="cardName"
                        placeholder="Enter card name"
                        required
                        type="text"
                    />
                    <button className="btn btn-success addCardForm-btn" type="submit">
                    Add card
                    </button>
                    <button
                        className="btn btn-secondary addCardForm-btn"
                        type="reset"
                        onClick={() => props.displayAddCardForm(false)}
                    >
                        <i className="fas fa-times" />
                    </button>
                </form>
            </div>

        ) : (
            <button
                className="btn btn-success addCard-btn"
                type="submit"
                onClick={() => props.displayAddCardForm(true)}
            >
                <i className="fas fa-plus-circle addCardIcon" />
            </button>
        )}
    </span>
);


AddCardForm.propTypes = {
    displayAddCardForm: PropTypes.func.isRequired,
    isInputVisible: PropTypes.bool.isRequired,
    onCardAdded: PropTypes.func.isRequired,
};

export default AddCardForm;
