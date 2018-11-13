import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';

// ===== Actions
import { getUserInformation } from '../../actions/user';

// ===== Components / Containers
import MemberView from '../../components/views/MemberView';


// ===== Others

class MemberComp extends React.Component {
    componentWillMount() {
        // Redirect user to his profile if he is looking for him.
        if (this.props.clientId === this.props.match.params.memberId) {
            this.props.goToProfile();
        } else {
            this.props.getUserInformation(this.props.match.params.memberId);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.clientId === this.props.match.params.memberId) {
            this.props.goToProfile();
        }
        if (prevProps.match.params.memberId !== this.props.match.params.memberId) {
            this.props.getUserInformation(this.props.match.params.memberId);
        }
    }

    render() {
        const { member } = this.props;

        if (member) {
            const element = (
                <MemberView
                    member={member}
                />
            );
            return element;
        }

        return '';
    }
}

MemberComp.propTypes = {
    clientId: PropTypes.string.isRequired,
    getUserInformation: PropTypes.func.isRequired,
    goToProfile: PropTypes.func.isRequired,
    member: PropTypes.object,
    match: PropTypes.shape({
        params: PropTypes.shape({
            memberId: PropTypes.string,
        }),
    }).isRequired,
};

MemberComp.defaultProps = {
    member: undefined,
};

// Put info from the store state in props
const mapStateToProps = ({ users, auth }) => ({
    clientId: auth.clientId,
    member: users.user,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        getUserInformation,
        goToProfile: () => replace('/profile'),
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MemberComp);
