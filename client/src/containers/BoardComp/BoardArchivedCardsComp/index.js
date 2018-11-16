import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { archiveCard } from '../../../actions/cards';

// ===== Components / Containers
import BoardArchivedCardsView from '../../../components/views/BoardView/BoardArchivedCardsView';

// ===== Others

class BoardArchivedCardsComp extends React.Component {
    constructor(props) {
        super(props);

        this.handleUnarchiveCard = this.handleUnarchiveCard.bind(this);
    }

    handleUnarchiveCard(card) {
        this.props.archiveCard(card, false);
        document.getElementById('archivedCards').value = 'Archived cards';
    }

    render() {
        if (this.props.cards.length > 0) {
            return (
                <BoardArchivedCardsView
                    cards={this.props.cards}
                    unarchiveCard={this.handleUnarchiveCard}
                />
            );
        }
        return '';
    }
}
BoardArchivedCardsComp.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
    archiveCard: PropTypes.func.isRequired,
};
BoardArchivedCardsComp.defaultProps = {
};

// Put info from the store state in props
const mapStateToProps = ({ currentBoard, auth }) => {
    if (currentBoard.board && currentBoard.board.lists) {
        return {
            clientId: auth.clientId,
            cards: currentBoard.board.lists.flatMap(l => l.cards.filter(c => c.isArchived)),
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
        archiveCard,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardArchivedCardsComp);
