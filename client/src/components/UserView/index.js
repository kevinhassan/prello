import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style.css';

class UserView extends React.Component {
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
                            <b>{user.nickname}</b>
                        </div>
                        <br />
                        Initials:
                        {' '}
                        <input className="readOnly" readOnly type="text" placeholder={user.initials} />
                        <br />
                        Email:
                        {' '}
                        <input className="readOnly" readOnly type="text" placeholder={user.email} />
                        <br />
                        Biography :
                        {' '}
                        <input className="readOnly" readOnly type="text" placeholder={user.biography} />

                    </div>
                </div>
            </div>
        );
    }
}
UserView.propTypes = {
    user: PropTypes.object.isRequired,
    deleteUser: PropTypes.func,
};
UserView.defaultProps = {
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
)(UserView);
