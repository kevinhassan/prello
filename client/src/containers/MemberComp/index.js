import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Models

// ===== Components / Containers
import MemberView from '../../components/views/MemberView';

// ===== Actions

// ===== Others

class MemberComp extends React.Component {
    componentWillMount() {
        this.props.getMember(this.props.match.params.memberId);
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
    getMember: PropTypes.func.isRequired,
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
const mapStateToProps = () => ({

});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MemberComp);
