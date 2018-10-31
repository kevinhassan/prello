import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
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
        const { user } = this.props;
        const element = (
            <div className="usersPanel">
                <h1>My profile</h1>

                <div className="infosPanel">
                    <UserView
                        user={user}
                    />
                </div>
            </div>
        );
        return element;
    }
}

UserComp.propTypes = {
    classicSignIn: PropTypes.func.isRequired,
    user: PropTypes.instanceOf(User).isRequired,
};

// Put info from the store state in props
const mapStateToProps = ({ usersReducer }) => ({
    user: usersReducer.user,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        classicSignIn,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserComp);
