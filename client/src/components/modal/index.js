import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { displayLoadingModal } from '../../actions/modal';
import './style.css';
import spinner from '../../assets/spinner.gif';

class Modal extends React.Component {
    render() {
        const { isModalOpen } = this.props;
        if (isModalOpen) {
            return (
                <div className="loadingModal">
                    <span className="modalContent">
                        <img src={spinner} alt="Loading spinner" width="50" />
                    </span>
                </div>
            );
        }
        return ('');
    }
}

Modal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
};

// Put info from the store state in props
const mapStateToProps = ({ modalReducer }) => ({
    isModalOpen: modalReducer.isModalOpen,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        displayLoadingModal,
    },
    dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Modal);
