import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

// ===== Others
import IGLogo from '../../assets/ig_logo.png';
import PolytechLogo from '../../assets/polytech_montpellier_logo.png';

class HomeComp extends React.Component {
    render() {
        const {
            goSignIn, isLoggedIn, goRegister,
        } = this.props;

        const element = (
            <div className="container-fluid" style={{ height: '100%' }}>
                <div className="row" style={{ height: '100%' }}>
                    <div className="text-center col-sm-12" style={{ backgroundColor: 'rgba(0, 140, 220, 0.1)', height: '100%' }}>

                        <h1 style={{ marginTop: '0', paddingTop: '20px' }}>Welcome!</h1>
                        <h3>Prello is a managing project tool created for and by Polytech Montpellier.</h3>
                        <br />
                        {isLoggedIn
                            ? (
                                ''
                            ) : (
                                <div style={{ backgroundColor: '#004a75', margin: '0 30%' }}>
                                    <button type="button" className="btn btn-light" onClick={goRegister}>Register</button>
                                    <button type="button" className="btn btn-dark" onClick={goSignIn}>Sign in</button>
                                </div>
                            )}
                        <br />
                        <p style={{ fontSize: '1.2rem', marginLeft: '20vw', marginRight: '20vw' }}>
                            {`
                        Prello is a collaboration tool that organizes your projects into boards.
                        In one glance, it tells you what's being worked on, who's working on what,
                        and where something is in a process.
                        Imagine a white board, filled with lists of sticky notes,
                        with each note as a task for you and your team.
                        `}
                        </p>
                        <div className="row text-center">
                            <div className="col-sm-6">
                                <img
                                    src={PolytechLogo}
                                    width="200"
                                    alt="Logo Polytech Montpellier"
                                />
                            </div>
                            <div className="col-sm-6">
                                <img
                                    src={IGLogo}
                                    width="100"
                                    alt="Informatique et Gestion logo"
                                />
                            </div>
                        </div>
                        <footer className="text-center">
                            <hr />
                            <b>Created by Hugo FAZIO - Kévin HASSAN - Cyprien LEGRAND - Clément LOUBIERE - Clément ROIG</b>
                        </footer>
                    </div>
                </div>
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
const mapStateToProps = ({ auth }) => ({
    isLoggedIn: auth.isLoggedIn,
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
