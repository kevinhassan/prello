import React from 'react';
import PropTypes from 'prop-types';

// ===== Others
import './style.css';


const DueDate = props => (
    props.isEditingDueDate
        ? (
            <form onSubmit={props.editDate}>
                <input type="date" name="duedate" className="datepicker" />
                {' '}
                <button type="submit" className="btn">
                    <i className="fas fa-check" />
                </button>
            </form>
        )
        : (
            <button
                className="btn btn-link btn-addElement"
                type="button"
                onClick={() => props.changeIsEditingDueDate(true)}
            >
    Add a due date...
            </button>
        )
);

DueDate.propTypes = {
    isEditingDueDate: PropTypes.bool,
    changeIsEditingDueDate: PropTypes.func.isRequired,
    editDate: PropTypes.func.isRequired,
};

DueDate.defaultProps = {
    isEditingDueDate: false,
};

export default DueDate;
