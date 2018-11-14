import React from 'react';
import PropTypes from 'prop-types';

// ===== Components
import MemberPill from '../../../MemberPill';

// ===== Others
import './style.css';

// ==================================

const BoardMembersView = props => (
    <span style={{ display: 'inline-block' }}>
        <i className="fas fa-users" />
        {' '}
        {props.members.length > 0
            ? (
                props.members.map(member => (
                    <MemberPill key={member._id} member={member} />
                ))
            ) : (
                <span>0 member</span>
            )
        }
        {props.isFormVisible
            ? (
                <form className="form-inline" onSubmit={props.addMember} style={{ display: 'inline-block' }}>
                    <label className="sr-only" htmlFor="name">Username:</label>
                    <button
                        className="input-group-addon btn btn-sm btn-secondary"
                        type="reset"
                        onClick={() => props.displayForm(false)}
                    >
                        <i className="fas fa-times" />
                    </button>
                    <input
                        className="form-control form-control-sm"
                        id="username"
                        name="username"
                        placeholder="Username..."
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
                    className="btn btn-success addCard-btn boardSettingsBtn"
                    type="button"
                    onClick={() => props.displayForm(true)}
                    onKeyDown={() => props.displayForm(true)}
                    style={{
                        verticalAlign: 'sub', display: 'inline-block', height: '100%', padding: 0,
                    }}
                >
                    <i className="fas fa-plus-circle addCardIcon" />
                </button>
            )
        }
    </span>
);

BoardMembersView.propTypes = {
    members: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFormVisible: PropTypes.bool.isRequired,
    addMember: PropTypes.func.isRequired,
    displayForm: PropTypes.func.isRequired,
};

export default BoardMembersView;
