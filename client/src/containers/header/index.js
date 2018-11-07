import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

// ===== Actions

// ===== Others
import logoPrello from '../../assets/logo_prello_white.png';
import './style.css';

class Header extends React.Component {
    render() {
        const {
            goAbout, goBoards, goHome, goProfile, goRegister, goSignIn, isLoggedIn,
        } = this.props;
        const element = (
            <div className="header-bar">
                <div className="leftHeader-div">
                    {isLoggedIn
                        ? (
                            <Fragment>
                                <button className="btn btn-header" type="button" onClick={goHome}><i className="fas fa-home" /></button>
                                <button className="btn btn-header" type="button" onClick={goBoards}><i className="fas fa-chalkboard" /></button>
                            </Fragment>
                        ) : (
                            ''
                        )
                    }
                </div>
                <div className="centerHeader-div">
                    <span onClick={goHome} onKeyPress={goHome} role="link" tabIndex={0}>
                        <img className="prello-logo" src={logoPrello} alt="Logo Prello" />
                    </span>
                </div>
                <div className="rightHeader-div">
                    {isLoggedIn
                        ? (
                            <Fragment>
                                <button className="btn btn-header" type="button" onClick={goProfile}><i className="fas fa-user" /></button>
                                <button className="btn btn-header" type="button"><i className="fas fa-bell" /></button>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <button className="btn btn-light" type="button" onClick={goRegister}>Register</button>
                                <button className="btn btn-dark" type="button" onClick={goSignIn}>Sign In</button>
                            </Fragment>
                        )}
                    <button className="btn btn-header" type="button" onClick={goAbout}><i className="fas fa-palette" /></button>
                </div>
            </div>
        );
        return element;
    }
}
Header.propTypes = {
    goAbout: PropTypes.func.isRequired,
    goBoards: PropTypes.func.isRequired,
    goHome: PropTypes.func.isRequired,
    goProfile: PropTypes.func.isRequired,
    goRegister: PropTypes.func.isRequired,
    goSignIn: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
};

// Put info from the store state in props
const mapStateToProps = ({ authReducer }) => ({
    isLoggedIn: authReducer.isLoggedIn,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        goAbout: () => push('/graphical-charter'),
        goBoards: () => push('/boards'),
        goHome: () => push('/'),
        goProfile: () => push('/profile'),
        goRegister: () => push('/register'),
        goSignIn: () => push('/signin'),
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);
