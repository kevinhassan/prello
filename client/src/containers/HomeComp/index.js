import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

// ===== Others

class HomeComp extends React.Component {
    render() {
        const {
            goSignIn, isLoggedIn, goRegister,
        } = this.props;

        const element = (
            <div className="text-center" style={{ backgroundColor: '#eee' }}>

                <h1 style={{ marginTop: '0', paddingTop: '20px' }}>Welcome!</h1>
                <h3>Prello is a managing project tool create for and by Polytech Montpellier.</h3>
                <br />
                <br />
                {isLoggedIn
                    ? (
                        ''
                    ) : (
                        <div style={{ backgroundColor: '#004a75' }}>
                            <button type="button" className="btn btn-light" onClick={goRegister}>Register</button>
                            <button type="button" className="btn btn-dark" onClick={goSignIn}>Sign in</button>
                        </div>
                    )}
            </div>
        );
        return element;
    }
}
HomeComp.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    goRegister: PropTypes.func.isRequired,
    goSignIn: PropTypes.func.isRequired,
};

// Put info from the store state in props
const mapStateToProps = ({ authReducer }) => ({
    isLoggedIn: authReducer.isLoggedIn,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        goRegister: () => push('/register'),
        goSignIn: () => push('/signin'),
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeComp);
