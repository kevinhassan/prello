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
        document.getElementById('archivedLists').value = 'Archived lists';
    }

    render() {
        if (this.props.lists.length > 0) {
            return (
                <BoardArchivedListsView
                    lists={this.props.lists}
                    unarchiveList={this.handleUnarchiveList}
                />
            );
        }
        return '';
    }
}
BoardArchivedListsComp.propTypes = {
    lists: PropTypes.arrayOf(PropTypes.object),
    archiveList: PropTypes.func.isRequired,
};
BoardArchivedListsComp.defaultProps = {
    lists: [],
};

// Put info from the store state in props
const mapStateToProps = ({ currentBoard, auth }) => {
    if (currentBoard.board && currentBoard.board.lists) {
        return {
            clientId: auth.clientId,
            lists: currentBoard.board.lists.filter(l => l.isArchived),
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
