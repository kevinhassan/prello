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
import { classicRegister } from '../../actions/auth';
import { displayErrorMessage, displaySuccessMessage } from '../../actions/modal';

// ===== Models

// ===== Components / Containers
import RegisterView from '../../components/views/RegisterView';

// ===== Others

class RegisterComp extends React.Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const { target } = event;
        const fullName = target.fullName.value;
        const email = target.email.value;
        const password = target.password.value;
        const confirmPassword = target.confirmPassword.value;
        if (email && password && fullName && confirmPassword && confirmPassword === password) {
            this.props.classicRegister(fullName, email, password);
        } else {
            this.props.displayErrorMessage('Both passwords have to be equal.');
        }
    }

    render() {
        const { errorMessage } = this.props;
        return (
            <RegisterView
                errorMessage={errorMessage}
                handleFormSubmit={this.handleFormSubmit}
            />
        );
    }
}

RegisterComp.propTypes = {
    classicRegister: PropTypes.func.isRequired,
    displayErrorMessage: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
};
// Put info from the store state in props
const mapStateToProps = ({ authReducer }) => ({
    errorMessage: authReducer.errorMessage,
});


// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        changePage: () => push('/'),
        classicRegister,
        displaySuccessMessage,
        displayErrorMessage,
    }, dispatch,
);
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RegisterComp);
