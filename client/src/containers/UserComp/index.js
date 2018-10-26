import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

// ===== Models
import User from '../../models/User';

// ===== Components / Containers
import UserView from '../../components/UserView';

// ===== Actions
import { classicSignIn } from '../../actions/auth';

// ===== Others
import './style.css';

class UserComp extends React.Component {
    constructor(props) {
        super(props);
        this.handleClassicSignIn = this.handleClassicSignIn.bind(this);
    }

    handleClassicSignIn() {
        this.props.classicSignIn('kevin.hassan@etu.umontpellier.fr', 'pass');
    }

    render() {
        const { user, authError } = this.props;
        const element = (
            <div className="usersPanel">
                <h1>My profile</h1>

                <div className="infosPanel">
                    <UserView
                        user={user}
                    />
                </div>

                <button type="button" className="btn btn-link" onClick={() => this.props.changePage()}>
                    Go to about page via redux
                </button>

                <hr />
                <button type="button" className="btn btn-info" onClick={this.handleClassicSignIn}>
                    Test classic sign in
                </button>
                {authError !== '' ? <p className="errorMsg">{authError}</p> : ''}

            </div>
        );
        return element;
    }
}

UserComp.propTypes = {
    authError: PropTypes.string.isRequired,
    classicSignIn: PropTypes.func.isRequired,
    user: PropTypes.instanceOf(User).isRequired,
    changePage: PropTypes.func.isRequired,
};

// Put info from the store state in props
const mapStateToProps = ({ authReducer, userReducer }) => ({
    authError: authReducer.error,
    token: authReducer.token,
    user: userReducer.user,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        classicSignIn,
        changePage: () => push('/about-us'),
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserComp);
