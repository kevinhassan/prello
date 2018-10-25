import React from 'react';
import {
    bindActionCreators,
} from 'redux';
import {
    connect,
} from 'react-redux';

// ===== Actions

// ===== Models

// ===== Components / Containers
import SignUpView from '../../components/views/SignUpView';

// ===== Others

class SignUpComp extends React.Component {
    constructor(props) {
        super(props);
        this.test = this.test.bind(this);
    }

    test() {
        return this.props;
    }

    render() {
        return <SignUpView />;
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
