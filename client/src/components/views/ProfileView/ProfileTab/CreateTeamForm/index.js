import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// ===== Components

// ===== Containers

// ===== Others
import './style.css';

// ==================================

const CreateTeamForm = props => (
    <Fragment>
        { props.isCreateTeamFormVisible
            ? (
                <div className="text-left" style={{ width: 'auto ' }}>
                    <form className="form-inline" onSubmit={props.createTeam}>
                        <label className="sr-only" htmlFor="name">Team name: </label>
                        <input
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Enter team name"
                            required
                            type="text"
                        />
                        <select defaultValue="" className="custom-select my-1 mr-sm-2" id="visibility" required style={{ marginLeft: '5px' }}>
                            <option value="" disabled>Visibility</option>
                            <option value="public">
                                Public
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
                            onClick={() => props.displayCreateTeamForm(false)}
                            style={{ margin: 0 }}
                        >
                            <i className="fas fa-times" />
                        </button>
                    </form>
                </div>
            ) : (
                <button type="button" className="btn btn-success" onClick={() => props.displayCreateTeamForm(true)}>
                    <i className="fas fa-plus" />
                    {' '}
                    Create team
                </button>
            )
        }
    </Fragment>
);
CreateTeamForm.propTypes = {
    createTeam: PropTypes.func.isRequired,
    isCreateTeamFormVisible: PropTypes.bool.isRequired,
    displayCreateTeamForm: PropTypes.func.isRequired,
};

export default CreateTeamForm;
