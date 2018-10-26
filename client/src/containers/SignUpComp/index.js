import React from 'react';
import {
    bindActionCreators,
} from 'redux';
import {
    connect,
} from 'react-redux';

// ===== Actions
// import { classicSignUp } from '../../actions/auth';

// ===== Models

// ===== Components / Containers
import Input from '../../components/forms/Input';
import SubmitForm from '../../components/forms/SubmitForm';

// ===== Others

class SignUpComp extends React.Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleName = this.handleName.bind(this);

        this.state = {
            newUser: {
                name: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
        };
    }

    handleFormSubmit() {
    }
    handleClearForm() {// Logic for resetting the form
    }


    handleName = (e) => {
        let value = e.target.value;
        this.setState(
            prevState => ({
                newUser: {
                    ...prevState.newUser,
                    name: value,
                },
            }),
        );
    }

    handleUsername = (e) => {
        let value = e.target.value;
        this.setState(
            prevState => ({
                newUser: {
                    ...prevState.newUser,
                    username: value,
                },
            }),
        );
    }

    handlePassword = (e) => {
        let value = e.target.value;
        this.setState(
            prevState => ({
                newUser: {
                    ...prevState.newUser,
                    email: value,
                },
            }),
        );
    }

    handleEmail = (e) => {
        let value = e.target.value;
        this.setState(
            prevState => ({
                newUser: {
                    ...prevState.newUser,
                    email: value,
                },
            }),
        );
    }

    handlePassword = (e) => {
        let value = e.target.value;
        console.log(e.source);
        this.setState(
            prevState => ({
                newUser: {
                    ...prevState.newUser,
                    password: value,
                },
            }),
        );
    }

    handleConfirmPassword = (e) => {
        let value = e.target.value;
        console.log(e.source);
        this.setState(
            prevState => ({
                newUser: {
                    ...prevState.newUser,
                    password: value,
                },
            }),
        );
    }

    render() {
        console.log(this.state.newUser.name);
        const signupFormView = (
            <form onSubmit={this.handleFormSubmit}>
                <Input
                    name="name"
                    type="text"
                    value={this.state.newUser.name}
                    placeholder="Enter your full name"
                    onChange={this.handleName}
                    title="Full Name"
                />
                <Input
                    name="username"
                    type="text"
                    value={this.state.newUser.username}
                    placeholder="Enter your user name"
                    onChange={this.handleUsername}
                    title="User name"
                />
                <Input
                    name="email"
                    type="text"
                    value={this.state.newUser.email}
                    placeholder="Enter your email"
                    onChange={this.handleEmail}
                    title="Email"
                />
                <Input
                    name="password"
                    type="password"
                    value={this.state.newUser.confirmPassword}
                    placeholder="Enter your password please"
                    onChange={this.handlePassword}
                    title="Password"
                />
                <Input
                    name="confirmPassword"
                    type="password"
                    value={this.state.newUser.confirmPassword}
                    placeholder="Confirm your password please"
                    onChange={this.handleConfirmPassword}
                    title="Confirm password"
                />
                <p>{this.state.newUser.username}</p>
                <SubmitForm />
            </form>
        );
        return signupFormView;
    }
}

SignUpComp.propTypes = {};

// Put info from the store state in props
const mapStateToProps = () => ({});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignUpComp);
