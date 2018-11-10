import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Models

// ===== Components / Containers
import ProfileView from '../../components/views/ProfileView';

// ===== Actions
import {
    getUserInformation, updateUserInformation, updatePassword, deleteUser,
} from '../../actions/user';

// ===== Others
import './style.css';

class ProfileComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdateVisible: false,
            isPasswordVisible: false,
            isDeleteVisible: false,
            errorMessage: '',
        };
        this.handleUpdateInformation = this.handleUpdateInformation.bind(this);
        this.handleUpdateDisplay = this.handleUpdateDisplay.bind(this);
        this.handlePasswordModifyDisplay = this.handlePasswordModifyDisplay.bind(this);
        this.handleModifyingPassword = this.handleModifyingPassword.bind(this);
        this.handleDeleteAccountDisplay = this.handleDeleteAccountDisplay.bind(this);
        this.handleDeletingAccount = this.handleDeletingAccount.bind(this);
    }

    componentWillMount() {
        this.props.getUserInformation();
    }

    handleUpdateDisplay(value) {
        this.setState({ isUpdateVisible: value });
    }

    handleUpdateInformation(event) {
        event.preventDefault();
        this.props.updateUserInformation(event.target.fullname.value, event.target.initials.value, event.target.biography.value, this.props.user);
        this.setState({ isUpdateVisible: false });
    }

    handlePasswordModifyDisplay(value) {
        this.setState({ isPasswordVisible: value });
    }

    handleModifyingPassword(event) {
        event.preventDefault();
        this.setState({ isPasswordVisible: false });
        this.props.updatePassword(event.target.passwordOld.value, event.target.passwordNew.value);
    }

    handleDeleteAccountDisplay(value) {
        this.setState({ isDeleteVisible: value });
    }

    handleDeletingAccount(event) {
        event.preventDefault();
        this.setState({ isDeleteVisible: false });
        this.props.deleteUser(event.target.username.value);
    }

    render() {
        const { user } = this.props;

        if (!this.state.errorMessage) {
            if (user) {
                const element = (
                    <div className="usersPanel">
                        <ProfileView
                            user={user}
                            handleUpdateInformation={this.handleUpdateInformation}
                            handleUpdateDisplay={this.handleUpdateDisplay}
                            isUpdateVisible={this.state.isUpdateVisible}
                            handlePasswordModifyDisplay={this.handlePasswordModifyDisplay}
                            handleModifyingPassword={this.handleModifyingPassword}
                            handleDeleteAccountDisplay={this.handleDeleteAccountDisplay}
                            handleDeletingAccount={this.handleDeletingAccount}
                            isPasswordVisible={this.state.isPasswordVisible}
                            isDeleteVisible={this.state.isDeleteVisible}
                        />
                    </div>
                );
                return element;
            }
        }

        return (
            <div>
                {this.props.errorMessage}
            </div>
        );
    }
}

ProfileComp.propTypes = {
    errorMessage: PropTypes.object,
    getUserInformation: PropTypes.func.isRequired,
    updateUserInformation: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired,
    user: PropTypes.object,
};

ProfileComp.defaultProps = {
    user: undefined,
    errorMessage: undefined,
};

// Put info from the store state in props
const mapStateToProps = ({ users }) => ({
    user: users.user,
    errorMessage: users.errorMessage,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        getUserInformation,
        updateUserInformation,
        updatePassword,
        deleteUser,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileComp);
