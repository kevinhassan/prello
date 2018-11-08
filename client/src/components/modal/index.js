import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import spinner from '../../assets/spinner.gif';

// ===== Actions
import { hideErrorMessage, hideSuccessMessage } from '../../actions/modal';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hideMessageModal: false };
        this.handleOnClickError = this.handleOnClickError.bind(this);
        this.handleOnClickSuccess = this.handleOnClickSuccess.bind(this);
    }

    handleOnClickError() {
        this.props.hideErrorMessage();
    }

    handleOnClickSuccess() {
        this.props.hideSuccessMessage();
    }

    render() {
        const { errorMessage, isLoadingModalOpen, successMessage } = this.props;

        const error = (
            <span className={errorMessage !== '' ? 'modalContent' : 'hideModal'}>
                <button className="btnReseted errorMessageModalContent" type="button" onClick={this.handleOnClickError}>
                    <p className="modalText errorModalText">
                        <i className="fas fa-times" style={{ marginRight: '10px' }} />
                        {' '}
                        {errorMessage}
                    </p>
                </button>
            </span>
        );
        const success = (
            <span
                className={successMessage !== '' && !this.state.hideMessageModal ? 'modalContent' : 'hideModal'}
            >
                <button className="btnReseted successMessageModalContent" type="button" onClick={this.handleOnClickSuccess}>
                    <p className="modalText successModalText">
                        <i className="fas fa-check" style={{ marginRight: '10px' }} />
                        {' '}
                        {successMessage}
                    </p>
                </button>
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
    }
}

Modal.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    hideErrorMessage: PropTypes.func.isRequired,
    hideSuccessMessage: PropTypes.func.isRequired,
    isLoadingModalOpen: PropTypes.bool.isRequired,
    successMessage: PropTypes.string.isRequired,
};

// Put info from the store state in props
const mapStateToProps = ({ modal }) => ({
    errorMessage: modal.errorMessage,
    isLoadingModalOpen: modal.isLoadingModalOpen,
    successMessage: modal.successMessage,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        hideErrorMessage,
        hideSuccessMessage,
    },
    dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Modal);
