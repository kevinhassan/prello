import React from 'react';
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
            goAbout, goBoardExample, goHome, goProfile,
        } = this.props;
        const element = (
            <div className="header-bar">
                <div className="leftHeader-div">
                    <button className="btn btn-header" type="button" onClick={goHome}><i className="fas fa-home" /></button>
                    <button className="btn btn-header" type="button" onClick={goBoardExample}><i className="fas fa-chalkboard" /></button>
                </div>
                <div className="centerHeader-div">
                    <span onClick={goHome} onKeyPress={goHome} role="link" tabIndex={0}>
                        <img className="prello-logo" src={logoPrello} alt="Logo Prello" />
                    </span>
                </div>
                <div className="rightHeader-div">
                    <button className="btn btn-header" type="button" onClick={goProfile}><i className="fas fa-user" /></button>
                    <button className="btn btn-header" type="button"><i className="fas fa-bell" /></button>
                    <button className="btn btn-header" type="button" onClick={goAbout}><i className="fas fa-palette" /></button>
                </div>
            </div>
        );
        return element;
    }
}
Header.propTypes = {
    goAbout: PropTypes.func.isRequired,
    goBoardExample: PropTypes.func.isRequired,
    goHome: PropTypes.func.isRequired,
    goProfile: PropTypes.func.isRequired,
};

// Put info from the store state in props (None)
const mapStateToProps = () => ({});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        goAbout: () => push('/graphical-charter'),
        goBoardExample: () => push('/board/b00000000001'),
        goHome: () => push('/'),
        goProfile: () => push('/profile'),
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);
