import React from 'react';
import PropTypes from 'prop-types';
import {
    Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// ===== Components
import InformationForm from './InformationForm';
import SettingsTab from './SettingsTab';
import ProfileTab from './ProfileTab';


// ===== Others
import './style.css';

// ==================================


const ProfileView = props => (

    <div className="user" key={props.user.id}>
        <div className="headerProfile">
            <div className="nickname">
                <h2 className="initials">
                    {props.user.initials}
                </h2>
                <div>
                    <h1 className="userFullname">{props.user.fullName}</h1>
                    <p>
                        @
                        {props.user.username}
                    </p>
                </div>
            </div>
            <div className="userData">
                <InformationForm
                    displayUpdateForm={props.handleUpdateDisplay}
                    handleUpdateInformation={props.handleUpdateInformation}
                    isVisible={props.isUpdateVisible}
                    user={props.user}
                />
            </div>
        </div>

        <br />
        <Tabs>
            <TabList className="profileTabList">
                <Tab className="labels">
                    <h4>
                        <i className="fas fa-user teamIcon" />
                        {' '}
                        Profile
                    </h4>
                </Tab>
                <Tab className="labels">
                    <h4>
                        <i className="fas fa-cog teamIcon" />
                        {' '}
                        Settings
                    </h4>
                </Tab>
            </TabList>

            <TabPanel>
                <ProfileTab />
            </TabPanel>
            <TabPanel>
                <SettingsTab />
            </TabPanel>
        </Tabs>
    </div>

);

ProfileView.propTypes = {
    user: PropTypes.object.isRequired,
    isUpdateVisible: PropTypes.bool.isRequired,
    handleUpdateInformation: PropTypes.func.isRequired,
    handleUpdateDisplay: PropTypes.func.isRequired,
};
ProfileView.defaultProps = {
};

export default ProfileView;
