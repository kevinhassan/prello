import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Models

// ===== Components / Containers
import ProfileView from '../../components/views/ProfileView';

// ===== Actions
import {
    getProfile, updateUserInformation, updatePassword, deleteUser,
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
            isCreateTeamFormVisible: false,
            errorMessage: '',
        };
        this.handleUpdateInformation = this.handleUpdateInformation.bind(this);
        this.handleUpdateDisplay = this.handleUpdateDisplay.bind(this);
        
        this.handlePasswordModifyDisplay = this.handlePasswordModifyDisplay.bind(this);
        this.handleModifyingPassword = this.handleModifyingPassword.bind(this);
        
        this.handleDeleteAccountDisplay = this.handleDeleteAccountDisplay.bind(this);
        this.handleDeletingAccount = this.handleDeletingAccount.bind(this);

        this.handleDisplayCreateTeamForm = this.handleDisplayCreateTeamForm.bind(this);
        this.handleCreateTeam = this.handleCreateTeam.bind(this);
    }

    componentWillMount() {
        this.props.getProfile();
    }

    handleCreateTeam(event) {
        event.preventDefault();
        // TODO: action
        // this.props.updateUserInformation(event.target.fullname.value, event.target.initials.value, event.target.biography.value, this.props.profile);
        this.setState({ isCreateTeamFormVisible: false });
    }

    handleDisplayCreateTeamForm(value) {
        this.setState({ isCreateTeamFormVisible: value });
    }

    handleUpdateDisplay(value) {
        this.setState({ isUpdateVisible: value });
    }

    handleUpdateInformation(event) {
        event.preventDefault();
        this.props.updateUserInformation(event.target.fullname.value, event.target.initials.value, event.target.biography.value, this.props.profile);
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
        const { profile } = this.props;

        if (!this.state.errorMessage) {
            if (profile) {
                const element = (
                    <div className="usersPanel">
                        <ProfileView
                            user={profile}

                            handleUpdateInformation={this.handleUpdateInformation}
                            handleUpdateDisplay={this.handleUpdateDisplay}
                            isUpdateVisible={this.state.isUpdateVisible}

                            handlePasswordModifyDisplay={this.handlePasswordModifyDisplay}
                            handleModifyingPassword={this.handleModifyingPassword}
                            isPasswordVisible={this.state.isPasswordVisible}

                            handleDeleteAccountDisplay={this.handleDeleteAccountDisplay}
                            handleDeletingAccount={this.handleDeletingAccount}
                            isDeleteVisible={this.state.isDeleteVisible}

                            displayCreateTeamForm={this.handleDisplayCreateTeamForm}
                            createTeam={this.handleCreateTeam}
                            isCreateTeamFormVisible={this.state.isCreateTeamFormVisible}
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
    getProfile: PropTypes.func.isRequired,
    updateUserInformation: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired,
    profile: PropTypes.object,
};

ProfileComp.defaultProps = {
    profile: undefined,
    errorMessage: undefined,
};

// Put info from the store state in props
const mapStateToProps = ({ users }) => ({
    profile: users.profile,
    errorMessage: users.errorMessage,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        getProfile,
        updateUserInformation,
        updatePassword,
        deleteUser,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileComp);
