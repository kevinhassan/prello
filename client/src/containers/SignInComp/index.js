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
import { classicSignIn, githubSignIn } from '../../actions/auth';

// ===== Models

// ===== Components / Containers
import SignInView from '../../components/views/SignInView';


class SignInComp extends React.Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.location.search) {
            const params = {};
            window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (_, key, value) => {
                params[key] = value;
            });
            this.props.githubSignIn(params);
        }
    }

    componentDidUpdate() {
        if (this.props.isLoggedIn) {
            this.props.goBoards();
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
    githubSignIn: PropTypes.func.isRequired,
    goBoards: PropTypes.func.isRequired,
    location: PropTypes.object,
};
SignInComp.defaultProps = {
    location: {
        search: {
            token: '',
            clientId: '',
        },
    },
};
// Put info from the store state in props
const mapStateToProps = ({ auth }) => ({
    errorMessage: auth.errorSignInMessage,
    isLoggedIn: auth.isLoggedIn,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        classicSignIn,
        githubSignIn,
        goBoards: () => push('/boards'),
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignInComp);
