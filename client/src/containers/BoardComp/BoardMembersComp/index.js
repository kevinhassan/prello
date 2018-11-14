import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { addBoardMember } from '../../../actions/boards';

// ===== Components / Containers
import BoardMembersView from '../../../components/views/BoardView/BoardMembersView';

// ===== Others

class BoardMembersComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormVisible: false,
        };
        this.handleAddMember = this.handleAddMember.bind(this);
        this.displayForm = this.displayForm.bind(this);
    }

    displayForm(value) {
        this.setState({ isFormVisible: value });
    }

    handleAddMember(event) {
        event.preventDefault();
        const username = event.target.username.value;
        this.props.addBoardMember(this.props.boardId, String.trim(username));
        this.setState({ isFormVisible: false });
    }

    render() {
        return (
            <BoardMembersView
                members={this.props.members}
                isFormVisible={this.state.isFormVisible}
                addMember={this.handleAddMember}
                displayForm={this.displayForm}
            />
        );
    }
}
BoardMembersComp.propTypes = {
    boardId: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.object).isRequired,
    addBoardMember: PropTypes.func.isRequired,
};

// Put info from the store state in props
const mapStateToProps = ({ currentBoard }) => ({
    boardId: currentBoard.board._id,
    members: currentBoard.board.members,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        addBoardMember,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardMembersComp);
