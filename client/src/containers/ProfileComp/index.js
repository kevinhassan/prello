import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Models

// ===== Components / Containers
import ProfileView from '../../components/views/ProfileView';

// ===== Actions
import { getUserInformation, updateUserInformation, updatePassword } from '../../actions/user';

// ===== Others
import './style.css';

class ProfileComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdateVisible: false,
            isPasswordVisible: false,
            errorMessage: '',
        };
        this.handleUpdateInformation = this.handleUpdateInformation.bind(this);
        this.handleUpdateDisplay = this.handleUpdateDisplay.bind(this);
        this.handlePasswordModifyDisplay = this.handlePasswordModifyDisplay.bind(this);
        this.handleModifyingPassword = this.handleModifyingPassword.bind(this);
    }

    componentWillMount() {
        this.props.getUserInformation();
    }

    handleUpdateDisplay(value) {
        this.setState({ isUpdateVisible: value });
    }

    handleUpdateInformation(event) {
        event.preventDefault();
        this.props.updateUserInformation(event.target.fullname.value, event.target.initials.value, event.target.bio.value);
        this.setState({ isUpdateVisible: false });
    }

    handlePasswordModifyDisplay(value) {
        this.setState({ isPasswordVisible: value });
    }

    handleModifyingPassword(event) {
        event.preventDefault();
        this.props.updatePassword(event.target.passwordOld.value, event.target.passwordNew.value);
        this.setState({ isUpdateVisible: false });
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
                            isPasswordVisible={this.state.isPasswordVisible}
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
    user: PropTypes.object,
};

ProfileComp.defaultProps = {
    user: undefined,
    errorMessage: undefined,
};

// Put info from the store state in props
const mapStateToProps = ({ usersReducer }) => ({
    user: usersReducer.user,
    errorMessage: usersReducer.errorMessage,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        getUserInformation,
        updateUserInformation,
        updatePassword,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileComp);
