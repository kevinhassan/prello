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
            <div style={{ height: '100vh' }}>
                <div className="text-center" style={{ backgroundColor: '#eee', height: '100%' }}>

                    <h1 style={{ marginTop: '0', paddingTop: '20px' }}>Welcome!</h1>
                    <h3>Prello is a managing project tool create for and by Polytech Montpellier.</h3>
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
                        Trello is a collaboration tool that organizes your projects into boards.
                        In one glance, Trello tells you what's being worked on, who's working on what,
                        and where something is in a process.
                        Imagine a white board, filled with lists of sticky notes,
                        with each note as a task for you and your team.
                        `}
                    </p>
                    <footer className="text-center">
                        <hr />
                        <b>Created by Hugo FAZIO - Kévin HASSAN - Cyprien LEGRAND - Clément LOUBIERE - Clément ROIG</b>
                    </footer>
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
