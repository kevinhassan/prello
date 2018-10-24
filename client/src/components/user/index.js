import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './style.css';

class User extends React.Component {
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
                        <input className="readOnly" readOnly="true" type="text" placeholder={user.initials} />
                        <br />
                        Email:
                        {' '}
                        <input className="readOnly" readOnly="true" type="text" placeholder={user.email} />
                        <br />
                        Biography :
                        {' '}
                        <input className="readOnly" readOnly="true" type="text" placeholder={user.biography} />

                    </div>
                </div>
            </div>
        );
    }
}
User.propTypes = {
    user: PropTypes.instanceOf(User).isRequired,
    deleteUser: PropTypes.func.isRequired,
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
)(User);
