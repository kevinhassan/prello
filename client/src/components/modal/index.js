import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import spinner from '../../assets/spinner.gif';

class Modal extends React.Component {
    render() {
        const { errorMessage, isLoadingModalOpen, successMessage } = this.props;
        const element = <div />;
        if (errorMessage !== '') {
            return (
                <div className="modalBlock">
                    <span className="errorMessageModalContent">
                        <i className="fas fa-times" />
                        {' '}
                        {errorMessage}
                    </span>
                </div>
            );
        }
        if (successMessage !== '') {
            return (
                <div className="modalBlock">
                    <span className="successMessageModalContent">
                        <i className="fas fa-check" />
                        {' '}
                        {successMessage}
                    </span>
                </div>
            );
        }
        if (isLoadingModalOpen) {
            return (
                <div className="modalBlock">
                    <span className="loadingModalContent">
                        <img src={spinner} alt="Loading spinner" width="50" />
                    </span>
                </div>
            );
        }
        return element;
    }
}

Modal.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    isLoadingModalOpen: PropTypes.bool.isRequired,
    successMessage: PropTypes.string.isRequired,
};

// Put info from the store state in props
const mapStateToProps = ({ modalReducer }) => ({
    errorMessage: modalReducer.errorMessage,
    isLoadingModalOpen: modalReducer.isLoadingModalOpen,
    successMessage: modalReducer.successMessage,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {},
    dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Modal);
