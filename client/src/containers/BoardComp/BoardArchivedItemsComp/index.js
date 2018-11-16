import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions

// ===== Components / Containers
import BoardArchivedItemsView from '../../../components/views/BoardView/BoardArchivedItemsView';

// ===== Others

class BoardArchivedItemsComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            archivedLists: [],
        };
    }

    render() {
        return (
            <BoardArchivedItemsView
                archivedLists={this.state.archivedLists}
                board={this.props.board}
            />
        );
    }
}
BoardArchivedItemsComp.propTypes = {
    board: PropTypes.object.isRequired,
};
BoardArchivedItemsComp.defaultProps = {
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
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardArchivedItemsComp);
