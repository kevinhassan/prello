import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// ===== Components

// ===== Others
import './style.css';
// ==================================


const BoardArchivedListsView = props => (
    <Fragment>
        <span className="boardSettingsSeparator" />
        <span className="boardSettingsItem" style={{ display: 'inline-block', verticalAlign: 'unset' }}>
            <select
                name="Archived lists"
                value="default"
                id="archivedLists"
                className="custom-select custom-select-sm"
                style={{ maxWidth: '12vw' }}
            >
                <option value="default" disabled>
                    {props.lists.length > 1 ? `${props.lists.length} lists archived` : `${props.lists.length} list archived`}
                </option>
                {props.lists.map(list => (
                    <option
                        key={list._id}
                        name={list._id}
                        onClick={() => props.unarchiveList(list)}
                    >
                        {list.name}
                    </option>
                ))}
            </select>
        </span>
    </Fragment>
);

BoardArchivedListsView.propTypes = {
    lists: PropTypes.arrayOf(PropTypes.object).isRequired,
    unarchiveList: PropTypes.func.isRequired,
};
BoardArchivedListsView.defaultProps = {
};

export default BoardArchivedListsView;
