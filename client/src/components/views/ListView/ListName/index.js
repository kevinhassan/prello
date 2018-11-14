import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
// ==================================

const ListName = props => (

    <div style={{ width: '100%' }}>
        {props.isFormVisible ? (

            <div className="appened-form text-left">
                <form className="form-inline" onSubmit={props.editName}>
                    <div className="input-group input-group-prepend">
                        <button
                            className="btn btn-sm btn-secondary"
                            type="reset"
                            onClick={() => props.displayForm(false)}
                        >
                            <i className="fas fa-times" />
                        </button>
                        <input
                            className="form-control form-control-sm"
                            id="name"
                            name="name"
                            defaultValue={props.name}
                            pattern="\s*(\S\s*){1,}"
                            required
                            type="text"
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-sm btn-success"
                                type="submit"
                                onClick={() => props.displayForm(false)}
                            >
                                <i className="fas fa-check" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        ) : (
            <button
                className="btn btnReseted"
                type="submit"
                onClick={() => props.displayForm(true)}
                style={{ width: '100%' }}
            >
                <h3 className="listName">
                    {props.name}
                </h3>
            </button>
        )}
    </div>
);


ListName.propTypes = {
    name: PropTypes.string.isRequired,
    displayForm: PropTypes.func.isRequired,
    isFormVisible: PropTypes.bool.isRequired,
    editName: PropTypes.func.isRequired,
};

export default ListName;
