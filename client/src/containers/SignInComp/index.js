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
import { classicSignIn } from '../../actions/auth';

// ===== Models

// ===== Components / Containers
import SignInView from '../../components/views/SignInView';


class SignInComp extends React.Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidUpdate() {
        if (this.props.isLoggedIn) {
            this.props.goHome();
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        if (email && password) {
            this.props.classicSignIn(email, password);
        }
    }

    render() {
        return (
            <SignInView
                errorMessage={this.props.errorMessage}
                handleFormSubmit={this.handleFormSubmit}
            />
        );
    }
}

SignInComp.propTypes = {
    classicSignIn: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    goHome: PropTypes.func.isRequired,
};

// Put info from the store state in props
const mapStateToProps = ({ authReducer }) => ({
    errorMessage: authReducer.errorSignInMessage,
    isLoggedIn: authReducer.isLoggedIn,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        classicSignIn,
        goHome: () => push('/'),
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignInComp);
