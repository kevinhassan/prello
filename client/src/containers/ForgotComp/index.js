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
import { forgottenPassword } from '../../actions/auth';

// ===== Models

// ===== Components / Containers
import ForgotView from '../../components/views/ForgotView';


class ForgotComp extends React.Component {
    constructor(props) {
        super(props);
        this.handleForgotFormSubmit = this.handleForgotFormSubmit.bind(this);
    }

    handleForgotFormSubmit(event) {
        event.preventDefault();
        const email = event.target.email.value;
        this.props.forgottenPassword(email);
    }

    render() {
        return (
            <ForgotView
                errorMessage={this.props.errorMessage}
                handleForgotFormSubmit={this.handleForgotFormSubmit}
            />
        );
    }
}

ForgotComp.propTypes = {
    forgottenPassword: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
};

// Put info from the store state in props
const mapStateToProps = ({ auth }) => ({
    errorMessage: auth.errorSignInMessage,
    isLoggedIn: auth.isLoggedIn,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        forgottenPassword,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ForgotComp);
