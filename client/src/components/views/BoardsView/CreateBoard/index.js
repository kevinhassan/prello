import React from 'react';
import PropTypes from 'prop-types';

// ===== Components

// ===== Containers

// ===== Others
import './style.css';

// ==================================

const CreateBoard = props => (
    <div>
        { props.isCreateBoardFormVisible
            ? (
                <div className="appened-form text-left" style={{ width: 'auto ' }}>
                    <form className="form-inline" onSubmit={props.createBoard}>
                        <label className="sr-only" htmlFor="name">Board name: </label>
                        <input
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Enter board name"
                            pattern="\s*(\S\s*){1,}"
                            required
                            type="text"
                        />
                        <select defaultValue="" className="custom-select my-1 mr-sm-2" id="visibility" required style={{ marginLeft: '5px' }}>
                            <option value="" disabled>Visibility</option>
                            <option value="public">
                                Public
                            </option>
                            <option value="team">
                                Team
                            </option>
                            <option value="private">
                                Private
                            </option>
                        </select>
                        <button className="btn btn-success" type="submit" style={{ margin: 0 }}>
                            Create
                        </button>
                        <button
                            className="btn btn-secondary"
                            type="reset"
                            onClick={() => props.displayCreateBoardForm(false)}
                            style={{ margin: 0 }}
                        >
                            <i className="fas fa-times" />
                        </button>
                    </form>
                </div>
            ) : (
                <button type="button" className="btn btn-success btn-createBoard" onClick={() => props.displayCreateBoardForm(true)}>
                    <i className="fas fa-plus" />
                    {' '}
                    Create board
                </button>
            )
        }
    </div>
);
CreateBoard.propTypes = {
    createBoard: PropTypes.func.isRequired,
    isCreateBoardFormVisible: PropTypes.bool.isRequired,
    displayCreateBoardForm: PropTypes.func.isRequired,
};

export default CreateBoard;
