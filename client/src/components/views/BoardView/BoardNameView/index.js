import React from 'react';
import PropTypes from 'prop-types';

// ===== Others
import './style.css';

// ==================================

const BoardNameView = props => (
    <span style={{ display: 'inline-block' }}>
        {props.isFormVisible
            ? (
                <form className="form-inline" onSubmit={props.editBoardName} style={{ display: 'inline-block' }}>
                    <label className="sr-only" htmlFor="name">Board name:</label>
                    <button
                        className="input-group-addon btn btn-sm btn-secondary"
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
                        placeholder="Enter board name"
                        required
                        pattern="\s*(\S\s*){1,}"
                        type="text"
                        style={{ borderRadius: 0 }}
                    />
                    <button
                        className="input-group-addon btn btn-sm btn-success"
                        type="submit"
                    >
                        <i className="fas fa-check" />
                    </button>
                </form>
            ) : (
                <button
                    className="btn btnReseted boardSettingsBtn"
                    type="button"
                    onClick={() => props.displayForm(true)}
                    onKeyDown={() => props.displayForm(true)}
                    style={{ verticalAlign: 'sub', display: 'inline-block', height: '100%' }}
                >
                    <h1 className="boardName">
                        {props.name}
                    </h1>
                </button>
            )}
    </span>
);

BoardNameView.propTypes = {
    name: PropTypes.string.isRequired,
    isFormVisible: PropTypes.bool.isRequired,
    editBoardName: PropTypes.func.isRequired,
    displayForm: PropTypes.func.isRequired,
};

export default BoardNameView;
