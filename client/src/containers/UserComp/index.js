import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Components / Containers
import UserView from '../../components/UserView';

// ===== Actions
import { getUserInformations } from '../../actions/user';

// ===== Others
import './style.css';

class UserComp extends React.Component {
    componentWillMount() {
        this.props.getUserInformations();
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
        if (user) {
            return element;
        }
        return <p>Ok</p>;
        
    }
}

UserComp.propTypes = {
    classicSignIn: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

// Put info from the store state in props
const mapStateToProps = ({ users }) => ({
    user: users.user,
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
