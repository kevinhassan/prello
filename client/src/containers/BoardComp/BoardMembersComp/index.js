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
        let canAddMember = false;

        // Check if client is admin
        if (props.clientId) {
            canAddMember = props.boardAdmins.some(a => a._id === props.clientId);
        }
        this.state = {
            canAddMember,
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
                canAddMember={this.state.canAddMember}
            />
        );
    }
}
BoardMembersComp.propTypes = {
    boardId: PropTypes.string,
    clientId: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.object),
    addBoardMember: PropTypes.func.isRequired,
    boardAdmins: PropTypes.arrayOf(PropTypes.object),
};
BoardMembersComp.defaultProps = {
    boardId: undefined,
    clientId: undefined,
    members: [],
    boardAdmins: [],
};

// Put info from the store state in props
const mapStateToProps = ({ currentBoard, auth }) => {
    if (currentBoard.board) {
        return {
            clientId: auth.clientId,
            boardId: currentBoard.board._id,
            boardAdmins: currentBoard.board.admins,
            members: currentBoard.board.members,
        };
    }
    return {
        clientId: auth.clientId,
    };
};

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
