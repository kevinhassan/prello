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
import SignUpFormView from '../../components/forms/SignUpFormView';

// ===== Others

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleClassicSignUp = this.handleClassicSignUp.bind(this);
    }

    handleClassicSignUp() {
    }
    
    render() {
        const signupFormView = (
            <form onSubmit={this.handleClassicSignUp}>
                <SignUpFormView />
            </form>
        );
        return signupFormView;
    }
}

SignUpForm.propTypes = {};

// Put info from the store state in props
const mapStateToProps = () => ({});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignUpForm);
