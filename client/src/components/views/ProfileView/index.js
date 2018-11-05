import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style.css';

class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }

    handleDeleteUser(id) {
        this.props.deleteUser(id);
    }

    render() {
        const { user } = this.props;
        return (
            <div className="user" key={user.id}>
                <div className="userContent">
                    <div>
                        <div className="nickname">
                            <b>{user.fullName}</b>
                            <p>
                                @
                                {user.username}
                            </p>
                        </div>
                        Full name:
                        {' '}
                        <input className="readOnly" readOnly type="text" placeholder={user.fullName} />
                        <br />
                        <br />
                        Initials:
                        {' '}
                        <input className="readOnly" readOnly type="text" placeholder={user.initials} />
                        <br />
                        Biography :
                        {' '}
                        <input className="readOnly" readOnly type="text" placeholder={user.bio} />

                    </div>
                </div>
                <div className="teamsContent">
                    <h>My teams</h>
                </div>
            </div>
        );
    }
}
ProfileView.propTypes = {
    user: PropTypes.object.isRequired,
    deleteUser: PropTypes.func,
};
ProfileView.defaultProps = {
    deleteUser: undefined,
};

// Put info from the store state in props (None)
const mapStateToProps = () => ({});

// Put actions in props (None)
const mapDispatchToProps = dispatch => bindActionCreators(
    {
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileView);
