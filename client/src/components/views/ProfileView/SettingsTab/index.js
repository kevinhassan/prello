import React from 'react';
import PropTypes from 'prop-types';


import './style.css';

const SettingsTab = () => (
    <div className="settings">
        <div className="changePassword">
            <h5>Change your password</h5>
            <button className="btn btn-success" type="button">Change</button>
        </div>

        <br />
        <hr />
        <br />

        <div className="deleteAccount">
            <div>
                <h5>Delete your account</h5>
                <p>(Careful, this is definitive)</p>
            </div>
            
            <button className="btn btn-danger" type="button">Delete U</button>
        </div>
    </div>
);

SettingsTab.propTypes = {
};
SettingsTab.defaultProps = {
};

export default SettingsTab;
