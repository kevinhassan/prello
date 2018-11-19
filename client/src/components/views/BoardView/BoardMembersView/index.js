import React from 'react';
import PropTypes from 'prop-types';

// ===== Components
import MemberPill from '../../../MemberPill';

// ===== Others
import './style.css';

// ==================================

const displayAddMemberButton = (isFormVisible, visible, hidden) => {
    if (isFormVisible) return visible;
    return hidden;
};

const BoardMembersView = props => (
    <span className="boardSettingsItem">
        <i className="fas fa-users" />
        {' '}
        {props.members.length > 0
            ? (
                <ul className="boardMemberLists">
                    {props.members.sort((a, b) => a.initials > b.initials).map(member => (
                        <li key={member._id} style={{ display: 'inline-block' }}>
                            <MemberPill key={member._id} member={member} isAdmin={props.boardAdmins.some(a => member._id === a._id)} />
                        </li>
                    ))}
                </ul>
            ) : (
                <span>0 member</span>
            )
        }
        {props.isFormVisible && props.canAddMember
            ? (
                <span style={{ marginLeft: '10px' }}>
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
                </span>
            ) : (
                displayAddMemberButton(props.canAddMember, (
                    <button
                        className="btn btn-success addCard-btn boardSettingsBtn addMember-btn"
                        type="button"
                        onClick={() => props.displayForm(true)}
                        onKeyDown={() => props.displayForm(true)}
                    >
                        <i className="fas fa-plus-circle addCardIcon" />
                    </button>
                ), (
                    ''
                ))
            )
        }
    </span>
);

BoardMembersView.propTypes = {
    members: PropTypes.arrayOf(PropTypes.object).isRequired,
    boardAdmins: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFormVisible: PropTypes.bool,
    addMember: PropTypes.func.isRequired,
    displayForm: PropTypes.func.isRequired,
    canAddMember: PropTypes.bool.isRequired,
};
BoardMembersView.defaultProps = {
    isFormVisible: false,
};

export default BoardMembersView;
