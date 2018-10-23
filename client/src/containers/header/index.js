import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// ===== Actions

// ===== Others
import './style.css';
import { push } from 'connected-react-router';

class Header extends React.Component {
    render() {
        const { goHome, goAbout } = this.props;
        const element = (
            <div className="header-bar">
                <div className="leftHeader-div">
                    <button className="btn btn-header" type="button" onClick={goHome}><i className="fas fa-home" /></button>
                </div>
                <div className="centerHeader-div">
                    <span className="prello-logo" onClick={goHome} onKeyPress={goHome} role="link" tabIndex={0}>Prello</span>
                </div>
                <div className="rightHeader-div">
                    <button className="btn btn-header" type="button"><i className="fas fa-bell" /></button>
                    <button className="btn btn-header" type="button" onClick={goAbout}><i className="fas fa-palette" /></button>
                </div>
            </div>
        );
        return element;
    }
}
Header.propTypes = {
    goHome: PropTypes.func.isRequired,
    goAbout: PropTypes.func.isRequired,
};

// Put info from the store state in props (None)
const mapStateToProps = () => ({});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        goHome: () => push('/'),
        goAbout: () => push('/about-us'),
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);
