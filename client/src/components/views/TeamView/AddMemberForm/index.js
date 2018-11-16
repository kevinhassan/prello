import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
// ==================================

const AddMemberForm = props => (
    <form className="addMemberForm" onSubmit={props.addMember}>
        <div className="container addMember_inputBlock">
            <div className="row">
                <div className="col-10">
                    <input
                        className="form-control searchBar"
                        id="username"
                        name="username"
                        onChange={props.onChangeMemberSearch}
                        value={props.search.selectedMember}
                        placeholder="Enter member username"
                        required
                        type="text"
                        style={{ width: '100%' }}
                    />
                </div>
                <div className="col-2">
                    <button className="btn btn-success float-right" type="submit">
                        Add
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-10">
                    {props.search.members.length > 0
                        ? (
                            <ul className="searchResults">
                                {props.search.members.map(member => (
                                    <li className="result" key={member._id} onClick={() => props.selectMemberSearch(member.username)}>{member.username}</li>
                                ))
                                }
                            </ul>
                        ) : ''
                    }
                </div>
                <div className="col-3" />
            </div>
        </div>
    </form>
);


AddMemberForm.propTypes = {
    addMember: PropTypes.func.isRequired,
    onChangeMemberSearch: PropTypes.func.isRequired,
    selectMemberSearch: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
};
export default AddMemberForm;
