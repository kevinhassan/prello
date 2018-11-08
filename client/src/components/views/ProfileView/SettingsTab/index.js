import React from 'react';
import PropTypes from 'prop-types';


// Component
import NewPasswordForm from './NewPasswordForm';

// ===================
import './style.css';

const SettingsTab = props => (
    <div>
        {props.isVisible ? (

            <div className="settings">
                <div className="changePassword">
                    <div>
                        <button className="btn btn-primary closeForm" type="button" onClick={() => props.displayPasswordForm(false)}>X</button>
                        <NewPasswordForm />
                    </div>
                </div>
            </div>


        ) : (
            <div className="settings">
                <div className="changePassword">
                    <h5>Change your password</h5>
                    <button className="btn btn-primary" type="button" onClick={() => props.displayPasswordForm(true)}>Change</button>
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
        )}
    </div>
);

SettingsTab.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    displayPasswordForm: PropTypes.func.isRequired,
};
SettingsTab.defaultProps = {
};

export default SettingsTab;
