import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import spinner from '../../assets/spinner.gif';

const Modal = (props) => {
    const { errorMessage, isLoadingModalOpen, successMessage } = props;

    const error = (
        <span className={errorMessage !== '' ? 'modalContent' : 'hideModal'}>
            <span className="errorMessageModalContent">
                <p className="modalText errorModalText">
                    <i className="fas fa-times" style={{ marginRight: '10px' }} />
                    {' '}
                    {errorMessage}
                </p>
            </span>
        </span>
    );
    const success = (
        <span className={successMessage !== '' ? 'modalContent' : 'hideModal'}>
            <span className="successMessageModalContent">
                <p className="modalText successModalText">
                    <i className="fas fa-check" style={{ marginRight: '10px' }} />
                    {' '}
                    {successMessage}
                </p>
            </span>
        </span>
    );
    const loading = (
        <span className={isLoadingModalOpen ? 'modalContent' : 'hideModal'}>
            <span className="loadingModalContent">
                <img src={spinner} alt="Loading spinner" className="spinnerImg" />
            </span>
        </span>
    );

    return (
        <div>
            {error}
            {loading}
            {success}
        </div>
    );
};

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
