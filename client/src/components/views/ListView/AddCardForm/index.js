import React from 'react';
import PropTypes from 'prop-types';


// ==================================

const AddCardForm = props => (

    <span className="addListForm">
        {props.isInputVisible ? (

            <div className="appened-form">
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
                    Add list
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
                className="btn btn-success addCardButton"
                type="submit"
                onClick={() => props.displayAddCardForm(true)}
            >
            Create new Card
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
