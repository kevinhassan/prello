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
import Input from '../../components/forms/Input';
import SubmitForm from '../../components/forms/SubmitForm';

class SignInComp extends React.Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);

        this.state = {
            login: {
                email: '',
                password: '',
            },
            errorMessage: '',
        };
    }

    handleEmail = (e) => {
        const value = e.target.value;
        this.setState(
            prevState => ({
                login: {
                    ...prevState.login,
                    email: value,
                },
            }),
        );
    }

    handlePassword = (e) => {
        const value = e.target.value;
        this.setState(
            prevState => ({
                login: {
                    ...prevState.login,
                    password: value,
                },
            }),
        );
    }


    handleClearForm = () => {
        this.setState({
            login: {
                password: '',
            },
        });
    }

    handleFormSubmit(event) {
        if (this.state.login.email !== '' && this.state.login.password !== '' && this.state.login.email !== undefined && this.state.login.password !== undefined) {
            this.props.classicSignIn(this.state.login.email, this.state.login.password);
        } else {
            this.handleClearForm();
            this.setState(() => ({
                errorMessage: 'Missing email or password',
            }));
        }
        event.preventDefault();
    }

    render() {
        const signinFormView = (
            <form onSubmit={this.handleFormSubmit}>
                <p>{this.state.errorMessage}</p>
                <Input
                    name="email"
                    type="text"
                    value={this.state.login.email}
                    placeholder="Enter your email"
                    onChange={this.handleEmail}
                    title="Email"
                />
                <Input
                    name="Password"
                    type="password"
                    value={this.state.login.password}
                    placeholder="Enter your password please"
                    onChange={this.handlePassword}
                    title="Password"
                />
                <SubmitForm />
            </form>
        );
        return signinFormView;
    }
}

SignInComp.propTypes = {
    classicSignIn: PropTypes.func.isRequired,
};

// Put info from the store state in props
const mapStateToProps = () => ({});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        classicSignIn,
        changePage: () => push('/'),
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignInComp);
