import React from 'react';
import PropTypes from 'prop-types';

// ===== Others
import './style.css';

// ==================================

const CardName = props => (
    <div>
        {props.isEditingName
            ? (
                <form onSubmit={props.editName}>
                    <p className="cardNameFormat text-danger">1 char. min (must not be a space or tab)</p>
                    <label className="sr-only" htmlFor="name">Name</label>
                    <div className="input-group mb-2 mr-sm-2">
                        <div className="input-group-prepend">
                            <button
                                className="btn btn-secondary"
                                type="reset"
                                onClick={() => props.changeIsEditingName(false)}
                            >
                                <i className="fas fa-times updateIcon" />
                            </button>
                        </div>
                        <input
                            className="form-control"
                            name="name"
                            defaultValue={props.name}
                            type="text"
                            id="name"
                            pattern="\s*(\S\s*){1,}"
                            required
                        />
                        <div className="input-group-prepend">
                            <button
                                className="btn btn-success"
                                type="submit"
                            >
                                <i className="fas fa-check" />
                            </button>
                        </div>

                    </div>
                </form>
            ) : (
                <button className="btnReseted editCardNameBtn" type="button" onClick={() => props.changeIsEditingName(true)}>
                    <h2 className="cardDetailName cardDetail-h2">
                        {props.name}
                    </h2>
                </button>
            )}
    </div>
);

CardName.propTypes = {
    name: PropTypes.string.isRequired,
    editName: PropTypes.func.isRequired,
    isEditingName: PropTypes.bool.isRequired,
    changeIsEditingName: PropTypes.func.isRequired,
};
export default CardName;
