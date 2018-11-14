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
import SignInView from '../../components/views/SignInView';


class ResetComp extends React.Component {
    constructor(props) {
        super(props);
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

ResetComp.propTypes = {

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
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ResetComp);
