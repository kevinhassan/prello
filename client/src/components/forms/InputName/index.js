import React from 'react';
import PropTypes from 'prop-types';

// ===== Components /

// ===== Models

// ===== Others
import './style.css';

// ==================================

const InputName = props => (
    <div className="form-group">
        <label htmlFor={props.name} className="form-label">{props.title}</label>
        <input
            className="form-input"
            id={props.name}
            name={props.name}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
        />
    </div>
);
InputName.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};
export default InputName;
