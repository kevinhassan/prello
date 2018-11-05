import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Models

// ===== Components / Containers
import ProfileView from '../../components/views/ProfileView';

// ===== Actions
import { getUserInformations } from '../../actions/user';
import { updateUserInformations } from '../../actions/user';

// ===== Others
import './style.css';

class ProfileComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdateVisible: false,
            errorMessage: null,
        };
        this.handleUpdateInformations = this.handleUpdateInformations.bind(this);
        this.handleUpdateDisplay = this.handleUpdateDisplay.bind(this);
    }

    componentWillMount() {
        this.props.getUserInformations();
    }

    handleUpdateDisplay(value) {
        this.setState({ isUpdateVisible: value });
    }

    handleUpdateInformations(event) {
        event.preventDefault();
        this.props.updateUserInformations(event.target.fullname.value, event.target.initials.value, event.target.bio.value);
        this.setState({ isUpdateVisible: false });
    }

    render() {
        const { user } = this.props;

        if (!this.state.errorMessage) {
            if (user) {
                const element = (
                    <div className="usersPanel">
                        <ProfileView
                            user={user}
                            handleUpdateInformations={this.handleUpdateInformations}
                            handleUpdateDisplay={this.handleUpdateDisplay}
                            isUpdateVisible={this.state.isUpdateVisible}
                        />
                    </div>
                );

                return element;
            }
        }

        return (
            <h4 className="errorMessage">
                { this.state.errorMessage }
            </h4>
        );
    }
}

ProfileComp.propTypes = {
    getUserInformations: PropTypes.func.isRequired,
    updateUserInformations: PropTypes.func.isRequired,
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
        updateUserInformations,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileComp);
