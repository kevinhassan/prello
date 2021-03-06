import React from 'react';
import PropTypes from 'prop-types';
import {
    Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// ===== Components
import BoardsTab from './BoardsTab';
import ProfileTab from './ProfileTab';
import UserProfile from './UserProfile';

// ===== Others
import './style.css';

// ==================================

const MemberView = props => (

    <div className="userPage">
        <div className="headerProfile">
            <div className="nickname">
                <h2 className="initials">
                    {props.member.initials}
                </h2>
                <div>
                    <h1 className="userFullname">{props.member.fullName}</h1>
                    <p>
                        <b>Username:</b>
                        {' @'}
                        {props.member.username}
                    </p>
                </div>
            </div>
            <div className="userData">
                <UserProfile
                    user={props.member}
                />
            </div>
        </div>

        <Tabs className="memberTabPanel">
            <TabList className="profileTabList react-tabs__tab-list">
                <Tab className="profileTab react-tabs__tab">
                    <h4>
                        <i className="fas fa-user teamIcon" />
                        {' '}
                        Profile
                    </h4>
                </Tab>
                <Tab className="profileTab react-tabs__tab">
                    <h4>
                        <i className="fas fa-chalkboard" />
                        {' '}
                        Boards
                    </h4>
                </Tab>
            </TabList>

            <TabPanel>
                <ProfileTab
                    teams={props.member.teams}
                />
            </TabPanel>
            <TabPanel>
                <BoardsTab
                    boards={props.member.boards}
                />
            </TabPanel>
        </Tabs>
    </div>

);

MemberView.propTypes = {
    member: PropTypes.object.isRequired,
};


export default MemberView;
