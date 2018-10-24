import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

// ===== Models

// ===== Components / Containers
import User from '../../components/user';

// ===== Actions

// ===== Others
import './style.css';

const UserPage = (props) => {
    const { user, error } = props;
    const element = (
        <div className="usersPanel">
            <h1>My profile</h1>

            {error !== '' ? <p className="errorMsg">{error}</p> : ''}

            <div className="infosPanel">
                <User
                    user={user}
                />
            </div>

            <button type="button" className="btn btn-link" onClick={() => props.changePage()}>
                Go to about page via redux
            </button>
        </div>
    );
    return element;
};


UserPage.propTypes = {
    user: PropTypes.instanceOf(User).isRequired,
    error: PropTypes.string.isRequired,
    changePage: PropTypes.func.isRequired,
};

// Put info from the store state in props
const mapStateToProps = ({ userReducer }) => ({
    user: userReducer.user,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        changePage: () => push('/about-us'),
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserPage);
