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
import InputName from '../../components/forms/InputName';
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

    render() {
        console.log(this.state.newUser.name);
        const signupFormView = (
            <form onSubmit={this.handleFormSubmit}>
                <p>{this.state.newUser.name}</p>
                <InputName
                    name="name"
                    type="text"
                    value={this.state.newUser.name}
                    placeholder="Enter your name"
                    onChange={this.handleName}
                    title="Full Name"
                />
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
