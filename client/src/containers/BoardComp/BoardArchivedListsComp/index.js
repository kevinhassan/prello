import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { archiveList } from '../../../actions/lists';

// ===== Components / Containers
import BoardArchivedListsView from '../../../components/views/BoardView/BoardArchivedListsView';

// ===== Others

class BoardArchivedListsComp extends React.Component {
    constructor(props) {
        super(props);

        this.handleUnarchiveList = this.handleUnarchiveList.bind(this);
    }

    handleUnarchiveList(list) {
        this.props.archiveList(list, false);
    }

    render() {
        return (
            <BoardArchivedListsView
                board={this.props.board}
                unarchiveList={this.handleUnarchiveList}
            />
        );
    }
}
BoardArchivedListsComp.propTypes = {
    board: PropTypes.object.isRequired,
    archiveList: PropTypes.func.isRequired,
};
BoardArchivedListsComp.defaultProps = {
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
        archiveList,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardArchivedListsComp);
