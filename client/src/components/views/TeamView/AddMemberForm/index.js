import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
// ==================================

const AddMemberForm = props => (
    <form className="addMemberForm" onSubmit={props.addMember}>
        <div className="container">
            <div className="row">
                <div className="col-10">

                    <input
                        className="form-control"
                        id="username"
                        name="username"
                        list="usernames"
                        onChange={props.onChangeMemberSearch}
                        placeholder="Search username..."
                        required
                        type="text"
                    />
                    <datalist id="usernames">
                        {props.search.members.map(member => (
                            <option key={member._id} value={member.username} />
                        ))
                        }
                    </datalist>
                </div>
                <div className="col-2">
                    <button className="btn btn-success float-right" type="submit">
                        Add
                    </button>
                </div>
            </div>
        </div>
    </form>
);


AddMemberForm.propTypes = {
    addMember: PropTypes.func.isRequired,
    onChangeMemberSearch: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
};
export default AddMemberForm;
