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
                        <div className="form-check" style={{ margin: '0 10px' }}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="isPublic"
                                name="isPublic"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="isPublic"
                            >
                                Public
                            </label>
                        </div>
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
