import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
// TODO
// import { editBoardName } from '../../../actions/boards';

// ===== Components / Containers
import BoardNameView from '../../../components/views/BoardView/BoardNameView';

// ===== Others

class BoardNameComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormVisible: false,
        };
        this.handleEditBoardName = this.handleEditBoardName.bind(this);
        this.displayForm = this.displayForm.bind(this);
    }

    displayForm(value) {
        this.setState({ isFormVisible: value });
    }

    handleEditBoardName(event) {
        event.preventDefault();
        const name = event.target.name.value;
        this.props.editBoardName(String.trim(name));
        this.setState({ isFormVisible: false });
    }

    render() {
        return (
            <BoardNameView
                name={this.props.name}
                isFormVisible={this.state.isFormVisible}
                editBoardName={this.handleEditBoardName}
                displayForm={this.displayForm}
            />
        );
    }
}
BoardNameComp.propTypes = {
    name: PropTypes.string.isRequired,
    editBoardName: PropTypes.func.isRequired,
};

// Put info from the store state in props
const mapStateToProps = ({ currentBoard }) => ({
    name: currentBoard.board.name,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {

    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardNameComp);
