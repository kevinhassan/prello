import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ===== Actions
import { updateListName } from '../../../actions/lists';

// ===== Components / Containers
import ListName from '../../../components/views/ListView/ListName';

// ===== Others

class ListNameComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormVisible: false,
        };
        this.handleEditListName = this.handleEditListName.bind(this);
        this.displayForm = this.displayForm.bind(this);
    }

    displayForm(value) {
        this.setState({ isFormVisible: value });
    }

    handleEditListName(event) {
        event.preventDefault();
        const name = event.target.name.value;
        this.props.updateListName(this.props.listId, name.trim(), this.props.name);
        this.setState({ isFormVisible: false });
    }

    render() {
        return (
            <ListName
                name={this.props.name}
                isFormVisible={this.state.isFormVisible}
                editName={this.handleEditListName}
                displayForm={this.displayForm}
            />
        );
    }
}
ListNameComp.propTypes = {
    listId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    updateListName: PropTypes.func.isRequired,
};

// Put info from the store state in props
const mapStateToProps = () => ({});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        updateListName,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ListNameComp);
