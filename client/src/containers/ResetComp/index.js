import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import {
    bindActionCreators,
} from 'redux';
import {
    connect,
} from 'react-redux';

// ===== Actions
import { resetPassword } from '../../actions/auth';

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
        if (password && passwordConfirm) {
            // this.props.resetPassword(password);
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
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ResetComp);
