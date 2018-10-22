import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { displayLoadingModal } from '../../actions/modal'
import './style.css'
import spinner from '../../assets/spinner.gif'

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isModalOpen)
            return (
                <div className="loadingModal">
                    <span className="modalContent">
                        <img src={spinner} alt="Loading spinner" width="50"/>
                    </span>
                </div>
            )
        else
            return ("")
    }
}

// Put info from the store state in props
const mapStateToProps = ({ modal }) => ({
    isModalOpen: modal.isModalOpen,
})

// Put actions in props
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            displayLoadingModal
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Modal)
