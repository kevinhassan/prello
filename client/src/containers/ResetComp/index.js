import React from 'react';
import PropTypes from 'prop-types';
import {
    bindActionCreators,
} from 'redux';
import {
    connect,
} from 'react-redux';

// ===== Actions
import { resetPassword } from '../../actions/auth';
import { displayErrorMessage } from '../../actions/modal';


// ===== Models

// ===== Components / Containers
import ResetView from '../../components/views/ResetView';

class ResetComp extends React.Component {
    constructor(props) {
        super(props);
        this.handleResetFormSubmit = this.handleResetFormSubmit.bind(this);
    }

    handleResetFormSubmit(event) {
        event.preventDefault();
        const password = event.target.password.value;
        const passwordConfirm = event.target.confirmPassword.value;
        const resetToken = this.props.match.params.token;
        if (password && passwordConfirm) {
            if (password === passwordConfirm) {
                this.props.resetPassword(password, resetToken);
            } else {
                this.props.displayErrorMessage('Both passwords must be equal');
            }
        } else {
            this.props.displayErrorMessage('Fill both inputs');
        }
    }

    render() {
        return (
            <ResetView
                errorMessage={this.props.errorMessage}
                handleResetFormSubmit={this.handleResetFormSubmit}
            />
        );
    }
}

ResetComp.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    resetPassword: PropTypes.func.isRequired,
    displayErrorMessage: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string,
        }),
    }).isRequired,
};
ResetComp.defaultProps = {

};
// Put info from the store state in props
const mapStateToProps = ({ auth }) => ({
    errorMessage: auth.errorSignInMessage,
    isLoggedIn: auth.isLoggedIn,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        resetPassword,
        displayErrorMessage,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ResetComp);
