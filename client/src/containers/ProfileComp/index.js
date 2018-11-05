import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Models

// ===== Components / Containers
import ProfileView from '../../components/views/ProfileView';

// ===== Actions
import { getUserInformations } from '../../actions/user';

// ===== Others
import './style.css';

class ProfileComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdateVisible: false,
        };
        this.handleUpdateInformations = this.handleUpdateInformations.bind(this);
    }

    componentWillMount() {
        this.props.getUserInformations();
    }

    handleUpdateInformations(value) {
        this.setState({ isUpdateVisible: value });
    }

    render() {
        const { user } = this.props;
        const element = (
            <div className="usersPanel">
                <ProfileView
                    user={user}
                    handleUpdateInformations={this.handleUpdateInformations}
                    isUpdateVisible={this.state.isUpdateVisible}
                />
            </div>
        );
        if (user) {
            return element;
        }
        return <p>User not authorized  TODO : Redirect to login </p>;
    }
}

ProfileComp.propTypes = {
    getUserInformations: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

// Put info from the store state in props
const mapStateToProps = ({ usersReducer }) => ({
    user: usersReducer.user,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        getUserInformations,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileComp);
