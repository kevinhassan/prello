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
import GithubTab from './GithubTab';


// ===== Others
import './style.css';

// ==================================

const ProfileView = props => (
    <div className="userPanel">

        <div className="userPage" key={props.user.id}>
            <div className="headerProfile">
                <div className="nickname">
                    <h2 className="initials">
                        {props.user.initials}
                    </h2>
                    <div>
                        <h1 className="userFullname">{props.user.fullName}</h1>
                        <p>
                            <b>Username:</b>
                            {' @'}
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

            <Tabs className="profileTabPanel">
                <TabList className="profileTabList react-tabs__tab-list">
                    <Tab className="profileTab react-tabs__tab">
                        <h4>
                            <i className="fas fa-user" />
                            {' '}
                        Profile
                        </h4>
                    </Tab>
                    <Tab className="profileTab react-tabs__tab">
                        <h4>
                            <i className="fas fa-cog" />
                            {' '}
                        Settings
                        </h4>
                    </Tab>
                    <Tab className="profileTab react-tabs__tab">
                        <h4>
                            <i className="fab fa-github" />
                            {' '}
                            Github
                        </h4>
                    </Tab>
                </TabList>

                <TabPanel>
                    <ProfileTab
                        teams={props.user.teams}
                        github={props.user.github}
                        createTeam={props.createTeam}
                        isCreateTeamFormVisible={props.isCreateTeamFormVisible}
                        displayCreateTeamForm={props.displayCreateTeamForm}
                        deleteTeam={props.deleteTeam}
                    />
                </TabPanel>
                <TabPanel>
                    <div style={{ flex: 1 }}>
                        <SettingsTab
                            isPasswordVisible={props.isPasswordVisible}
                            displayPasswordForm={props.handlePasswordModifyDisplay}
                            handleModifyingPassword={props.handleModifyingPassword}

                            isDeleteVisible={props.isDeleteVisible}
                            displayDeleteForm={props.handleDeleteAccountDisplay}
                            handleDeletingAccount={props.handleDeletingAccount}
                        />
                    </div>
                </TabPanel>
                <TabPanel>
                    <div style={{ flex: 1 }}>
                        <GithubTab
                            github={props.user.github ? props.user.github : undefined}
                        />
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    </div>

);

ProfileView.propTypes = {
    user: PropTypes.object.isRequired,

    isUpdateVisible: PropTypes.bool.isRequired,
    handleUpdateDisplay: PropTypes.func.isRequired,
    handleUpdateInformation: PropTypes.func.isRequired,

    isPasswordVisible: PropTypes.bool.isRequired,
    handlePasswordModifyDisplay: PropTypes.func.isRequired,
    handleModifyingPassword: PropTypes.func.isRequired,

    isDeleteVisible: PropTypes.bool.isRequired,
    handleDeleteAccountDisplay: PropTypes.func.isRequired,
    handleDeletingAccount: PropTypes.func.isRequired,

    isCreateTeamFormVisible: PropTypes.bool.isRequired,
    createTeam: PropTypes.func.isRequired,
    displayCreateTeamForm: PropTypes.func.isRequired,

    deleteTeam: PropTypes.func.isRequired,
};

ProfileView.defaultProps = {
};

export default ProfileView;
